"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Plus, Users, Vote, MapPin, Eye, CheckCircle, XCircle, Edit, Trash2, Upload, LogOut, Loader2, AlertCircle, Target, RefreshCw, Copy } from "lucide-react"
import { useRouter } from "next/navigation"
import { adminService, type Observer, type AdminDashboardStats } from "@/lib/services/adminService"
import { RealGeoDataService, type LocationStats } from "@/lib/services/realGeoDataService"
import { useAdminTokenExpiration } from "@/hooks/useAdminTokenExpiration"
import { TokenExpirationWarning } from "@/components/TokenExpirationWarning"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { autoRetryService } from "@/lib/services/autoRetryService"

export default function AdminPanel() {
  const router = useRouter()
  const { user, token, logout: adminLogout, isAuthenticated, isLoading: authLoading } = useAdminAuth()
  
  // Token expiration handling
  const {
    showExpirationWarning,
    timeUntilExpiration,
    dismissWarning,
    extendSession,
    handleApiError
  } = useAdminTokenExpiration()
  
  // Default contestants from voting progress
  const defaultContestants = [
    { name: "Adebayo Ogundimu", runningMate: "Dr. Fatima Abdullahi", party: "All Progressives Congress (APC)" },
    { name: "Chinedu Okwu", runningMate: "Prof. Amina Hassan", party: "Peoples Democratic Party (PDP)" },
    { name: "Ibrahim Musa", runningMate: "Mrs. Grace Okafor", party: "Labour Party (LP)" },
    { name: "Funmilayo Adeyemi", runningMate: "Alhaji Suleiman Bello", party: "New Nigeria Peoples Party (NNPP)" }
  ]
  
  const [newElection, setNewElection] = useState({
    title: "",
    type: "",
    electionDate: "",
    startTime: "",
    endTime: "",
    states: [] as string[],
    selectedState: "",
    selectedLGAs: [] as string[],
    contestants: defaultContestants
  })

  const [electionFormStep, setElectionFormStep] = useState(1)
  const [editingElection, setEditingElection] = useState<any>(null)
  const [showEditContestantsModal, setShowEditContestantsModal] = useState(false)
  const [editingContestantIndex, setEditingContestantIndex] = useState<number | null>(null)
  const [selectedElection, setSelectedElection] = useState<any>(null)
  const [showElectionDetailsModal, setShowElectionDetailsModal] = useState(false)
  const [selectedStateForDetails, setSelectedStateForDetails] = useState<string | null>(null)
  const [stateDetailsData, setStateDetailsData] = useState<any>(null)
  const [currentView, setCurrentView] = useState<'states' | 'lgas' | 'wards'>('states')
  const [selectedLGA, setSelectedLGA] = useState<string | null>(null)

  // State management
  const [loading, setLoading] = useState(true)
  const [systemStats, setSystemStats] = useState<AdminDashboardStats>({
    totalVoters: 0,
    totalPollingUnits: 0,
    totalLGAs: 0,
    totalStates: 0,
    totalWards: 0,
    activeElections: 0,
    pendingObservers: 0,
    approvedObservers: 0,
    rejectedObservers: 0,
  })
  const [observers, setObservers] = useState<Observer[]>([])
  const [selectedObserver, setSelectedObserver] = useState<Observer | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [processingObserver, setProcessingObserver] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [locationStats, setLocationStats] = useState<LocationStats | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [topStatesByPollingUnits, setTopStatesByPollingUnits] = useState<any[]>([])
  const [topStatesByLGAs, setTopStatesByLGAs] = useState<any[]>([])
  const [elections, setElections] = useState<any[]>([])
  const [editableStats, setEditableStats] = useState({
    totalVoters: 0
  })
  const [isEditingVoters, setIsEditingVoters] = useState(false)
  const [tempVotersValue, setTempVotersValue] = useState(0)

  // Blockchain sync state
  const [blockchainStats, setBlockchainStats] = useState({
    totalVotes: 0,
    successfulVotes: 0,
    pendingVotes: 0,
    successRate: 0,
    lastSyncResults: null
  })
  const [pendingVotes, setPendingVotes] = useState<any[]>([])
  const [isRetrying, setIsRetrying] = useState(false)
  const [syncStatus, setSyncStatus] = useState({
    isRunning: false,
    lastResults: null
  })

  // Auto-retry state
  const [autoRetryEnabled, setAutoRetryEnabled] = useState(false)
  const [autoRetryStatus, setAutoRetryStatus] = useState({
    isRunning: false,
    retryCount: 0,
    lastRetry: null as Date | null
  })

  // Blockchain audit state
  const [auditResults, setAuditResults] = useState<any[]>([])
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditStatus, setAuditStatus] = useState({
    isRunning: false,
    lastAudit: null
  })
  const [selectedElectionForAudit, setSelectedElectionForAudit] = useState<string | null>(null)

  // Function to auto-generate election title
  const generateElectionTitle = (type: string, date: string) => {
    if (!type || !date) return ""
    
    const year = new Date(date).getFullYear()
    const typeMap: { [key: string]: string } = {
      "Presidential": "Presidential Election",
      "Governorship": "Governorship Election", 
      "Senatorial": "Senatorial Election",
      "House of Assembly": "House of Assembly Election",
      "House of Representatives": "House of Representatives Election",
      "Local Government": "Local Government Election"
    }
    
    const baseTitle = typeMap[type] || `${type} Election`
    return `${baseTitle} ${year}`
  }

  // Handle election type change
  const handleElectionTypeChange = (type: string) => {
    const title = generateElectionTitle(type, newElection.electionDate)
    setNewElection(prev => ({ ...prev, type, title }))
  }

  // Handle election date change
  const handleElectionDateChange = (date: string) => {
    const title = generateElectionTitle(newElection.type, date)
    setNewElection(prev => ({ ...prev, electionDate: date, title }))
  }

  // Handle state selection
  const handleStateChange = (state: string) => {
    setNewElection(prev => ({ ...prev, selectedState: state, selectedLGAs: [] })) // Reset LGAs when state changes
  }

  // Handle LGA selection for senatorial elections
  const handleLGAChange = (lga: string) => {
    setNewElection(prev => {
      const currentLGAs = prev.selectedLGAs
      
      if (currentLGAs.includes(lga)) {
        // Remove LGA if already selected
        const newLGAs = currentLGAs.filter(l => l !== lga)
        return { ...prev, selectedLGAs: newLGAs }
      } else if (currentLGAs.length < 3) {
        // Add LGA if less than 3 selected
        const newLGAs = [...currentLGAs, lga]
        return { ...prev, selectedLGAs: newLGAs }
      }
      // Don't add if already 3 LGAs selected
      return prev
    })
  }

  // Get LGAs for a selected state (complete list of all Nigerian states and LGAs)
  const getLGAsForState = (state: string): string[] => {
    const lgaMap: { [key: string]: string[] } = {
      "Abia": ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"],
      "Adamawa": ["Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Grie", "Hong", "Jada", "Lamurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
      "Akwa Ibom": ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"],
      "Anambra": ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
      "Bauchi": ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
      "Bayelsa": ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
      "Benue": ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Otukpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"],
      "Borno": ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"],
      "Cross River": ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"],
      "Delta": ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"],
      "Ebonyi": ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"],
      "Edo": ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba Okha", "Oredo", "Orhionmwon", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"],
      "Ekiti": ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"],
      "Enugu": ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo Uwani"],
      "FCT": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
      "Gombe": ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"],
      "Imo": ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West", "Unuimo"],
      "Jigawa": ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kazaure", "Kiri Kasama", "Kiyawa", "Kaugama", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"],
      "Kaduna": ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"],
      "Kano": ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
      "Katsina": ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dandume", "Danja", "Dan Musa", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
      "Kebbi": ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"],
      "Kogi": ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"],
      "Kwara": ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"],
      "Lagos": ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
      "Nasarawa": ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"],
      "Niger": ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Moya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"],
      "Ogun": ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Shagamu"],
      "Ondo": ["Akoko North-East", "Akoko North-West", "Akoko South-West", "Akoko South-East", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"],
      "Osun": ["Atakunmosa East", "Atakunmosa West", "Aiyedaade", "Aiyedire", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Ife Central", "Ife East", "Ife North", "Ife South", "Egbedore", "Ejigbo", "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"],
      "Oyo": ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomoso North", "Ogbomoso South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo", "Oyo East", "Saki East", "Saki West", "Surulere"],
      "Plateau": ["Bokkos", "Barkin Ladi", "Bassa", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"],
      "Rivers": ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"],
      "Sokoto": ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"],
      "Taraba": ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kurmi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"],
      "Yobe": ["Bade", "Bursari", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"],
      "Zamfara": ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kankara", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Chafe", "Zurmi"]
    }
    const lgas = lgaMap[state] || []
    return lgas
  }

  // Elections will be loaded from API

  // Load data on component mount
  useEffect(() => {
    // Wait for auth loading to complete
    if (authLoading) {
      return;
    }
    
    // Add a small delay to ensure auth state is fully synchronized
    const checkAuth = () => {
      // Check authentication after loading is complete
      if (!isAuthenticated || !token) {
        router.push('/admin/login');
        return;
      }
      
      // Check if user is admin
      if (user && user.role !== 'ADMIN') {
        setError('Access denied. Admin privileges required.');
        router.push('/admin/login');
        return;
      }
    };
    
    // Small delay to ensure auth state is synchronized
    const timeoutId = setTimeout(checkAuth, 100);
    
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, token, user, router, authLoading]);

  // Load dashboard data
  useEffect(() => {
    if (token && user) {
      loadDashboardData();
      // Load blockchain data
      loadBlockchainStats();
      loadPendingVotes();
      loadSyncStatus();
      // Load audit data
      loadAuditStatus();
    }
  }, [token, user]);

  // Debug: Monitor systemStats changes

  // Keep editableStats in sync with systemStats
  useEffect(() => {
    if (systemStats?.totalVoters !== undefined) {
      setEditableStats(prev => ({
        ...prev,
        totalVoters: systemStats.totalVoters
      }))
    }
  }, [systemStats?.totalVoters])

  // Auto-retry initialization and status updates
  useEffect(() => {
    if (isAuthenticated && token) {
      // Initialize auto-retry status
      updateAutoRetryStatus()
      
      // Set up status update interval
      const statusInterval = setInterval(updateAutoRetryStatus, 30000) // Update every 30 seconds
      
      return () => {
        clearInterval(statusInterval)
      }
    }
  }, [isAuthenticated, token])

  // Cleanup auto-retry on unmount
  useEffect(() => {
    return () => {
      autoRetryService.stop()
    }
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Check if admin is authenticated
      if (!token) {
        setError('You are not authenticated. Please log in as an admin.')
        router.push('/admin/login')
        return
      }
      
      // Load dashboard stats, observers, and elections in parallel
      const [statsData, observersData, electionsResponse] = await Promise.all([
        fetch('/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('/api/admin/observers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('/api/admin/elections', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ])
      
      // Handle dashboard stats response
      let stats = null
      if (statsData.ok) {
        const statsResult = await statsData.json()
        
        // Extract the actual stats object from the nested structure
        // Backend returns: { success: true, data: { stats: {...} } }
        // Next.js API wraps it: { success: true, data: { data: { stats: {...} } } }
        stats = statsResult.data?.data?.stats || statsResult.data?.stats || statsResult.stats || null
      } else {
        }

      // Handle observers response
      let observers = []
      if (observersData.ok) {
        const observersResult = await observersData.json()
        observers = observersResult.data || observersResult || []
      } else {
        }

      // Handle elections response
      let electionsData = []
      if (electionsResponse.ok) {
        const electionsResult = await electionsResponse.json()
        electionsData = electionsResult.elections || electionsResult.data || electionsResult || []
      } else {
        }
      
      // Calculate location statistics from real geo data
      let locationData;
      try {
        locationData = await RealGeoDataService.calculateLocationStats()
      } catch (error) {
        // Fallback to basic stats if geo data fails to load
        locationData = {
          totalStates: 37,
          totalLGAs: 368,
          totalWards: 1840, // 368 LGAs × 5 wards per LGA
          totalPollingUnits: 9200, // 368 LGAs × 25 polling units per LGA
          states: []
        }
      }
      
      // Use backend stats for elections and observers (they're already calculated correctly)
      // Only calculate additional stats if not provided by backend
      const pendingObservers = stats?.pendingObservers || (Array.isArray(observers) ? observers.filter(observer => 
        observer.status === 'pending'
      ).length : 0)
      
      const approvedObservers = stats?.approvedObservers || (Array.isArray(observers) ? observers.filter(observer => 
        observer.status === 'approved'
      ).length : 0)
      
      const rejectedObservers = stats?.rejectedObservers || (Array.isArray(observers) ? observers.filter(observer => 
        observer.status === 'rejected'
      ).length : 0)
      
      // Merge API stats with location data, prioritizing backend calculations
      // Ensure stats is an object before spreading
      const safeStats = stats && typeof stats === 'object' ? stats : {}
      
      const mergedStats = {
        // Use real geodata statistics from the loaded data
        totalStates: locationData?.totalStates || 37,
        totalLGAs: locationData?.totalLGAs || 368,
        totalWards: locationData?.totalWards || 1840, // 368 LGAs × 5 wards per LGA
        totalPollingUnits: locationData?.totalPollingUnits || 9200, // 368 LGAs × 25 polling units per LGA
        // Use backend's activeElections count (it's already correct)
        activeElections: safeStats?.activeElections || 0,
        pendingObservers: pendingObservers,
        approvedObservers: approvedObservers,
        rejectedObservers: rejectedObservers,
        // Spread other stats from backend if they exist
        ...safeStats,
      }
      
      setSystemStats(mergedStats)
      setObservers(Array.isArray(observers) ? observers : [])
      setLocationStats(locationData)
      setElections(Array.isArray(electionsData) ? electionsData : [])
      
      // Initialize editable stats
      setEditableStats({
        totalVoters: mergedStats.totalVoters || 0
      })

      // Load top states data
      try {
        const [topStatesByPU, topStatesByLGA] = await Promise.all([
          RealGeoDataService.getTopStatesByPollingUnits(10),
          RealGeoDataService.getStatesWithMostLGAs(10)
        ])
        
        setTopStatesByPollingUnits(topStatesByPU)
        setTopStatesByLGAs(topStatesByLGA)
      } catch (error) {
        // Set empty arrays as fallback
        setTopStatesByPollingUnits([])
        setTopStatesByLGAs([])
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard data. Please try again.'
      
      // Check if it's an authentication error
      if (errorMessage.includes('401') || errorMessage.includes('unauthorized') || errorMessage.includes('token')) {
        setError('Authentication failed. Please log in again.')
        // Clear invalid token and redirect to login
        adminLogout()
        setTimeout(() => router.push('/admin/login'), 2000)
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  // Blockchain sync functions
  const loadBlockchainStats = async () => {
    try {
      const response = await fetch('/api/blockchain/sync-stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setBlockchainStats(data.data)
      }
    } catch (error) {
      }
  }

  const loadPendingVotes = async () => {
    try {
      const response = await fetch('/api/blockchain/pending-votes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setPendingVotes(data.data.votes)
      }
    } catch (error) {
      }
  }

  const loadSyncStatus = async () => {
    try {
      const response = await fetch('/api/blockchain/sync-status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSyncStatus(data.data)
      }
    } catch (error) {
      }
  }

  const handleRetryPendingVotes = async () => {
    try {
      setIsRetrying(true)
      setError("")
      
      const response = await fetch('/api/blockchain/retry-votes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSuccess(`Retry completed: ${data.data.success} successful, ${data.data.stillPending} still pending`)
        
        // Refresh data
        await Promise.all([
          loadBlockchainStats(),
          loadPendingVotes(),
          loadSyncStatus()
        ])
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Retry failed')
      }
    } catch (error) {
      setError('Failed to retry votes. Please try again.')
    } finally {
      setIsRetrying(false)
    }
  }

  // Auto-retry functions
  const handleToggleAutoRetry = () => {
    if (autoRetryEnabled) {
      autoRetryService.stop()
      setAutoRetryEnabled(false)
      setSuccess('Auto-retry disabled')
    } else {
      autoRetryService.start()
      setAutoRetryEnabled(true)
      setSuccess('Auto-retry enabled - will check every 5 minutes')
    }
  }

  const handleManualRetry = async () => {
    try {
      setIsRetrying(true)
      setError("")
      
      const result = await autoRetryService.manualRetry()
      
      if (result.success) {
        setSuccess(`Manual retry completed: ${result.successful} successful, ${result.stillPending} still pending`)
        
        // Refresh data
        await Promise.all([
          loadBlockchainStats(),
          loadPendingVotes(),
          loadSyncStatus()
        ])
      } else {
        setError('Manual retry failed: ' + result.errors.join(', '))
      }
    } catch (error) {
      setError('Failed to perform manual retry. Please try again.')
    } finally {
      setIsRetrying(false)
    }
  }

  // Update auto-retry status
  const updateAutoRetryStatus = () => {
    const status = autoRetryService.getStatus()
    setAutoRetryStatus({
      isRunning: status.isRunning,
      retryCount: status.retryCount,
      lastRetry: status.isRunning ? new Date() : autoRetryStatus.lastRetry
    })
  }

  // Blockchain audit functions
  const loadAuditStatus = async () => {
    try {
      const response = await fetch('/api/blockchain/audit-status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAuditStatus(data.data)
      }
    } catch (error) {
      }
  }

  const handleAuditSingleElection = async (electionId: string) => {
    try {
      setIsAuditing(true)
      setError("")
      
      const response = await fetch(`/api/blockchain/audit/${electionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAuditResults([data.data])
        setSuccess(`Audit completed for election: ${data.data.electionTitle}`)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Audit failed')
      }
    } catch (error) {
      setError('Failed to audit election. Please try again.')
    } finally {
      setIsAuditing(false)
    }
  }

  const handleAuditAllElections = async () => {
    try {
      setIsAuditing(true)
      setError("")
      
      const response = await fetch('/api/blockchain/audit-all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAuditResults(data.data.results || [])
        setSuccess(`Audit completed for ${data.data.auditedElections} elections`)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Audit failed')
      }
    } catch (error) {
      setError('Failed to audit elections. Please try again.')
    } finally {
      setIsAuditing(false)
    }
  }

  const exportAuditResults = () => {
    if (auditResults.length === 0) {
      setError('No audit results to export')
      return
    }

    const csvContent = [
      ['Election Title', 'DB Votes', 'Blockchain Votes', 'Status', 'Contract Address', 'Audit Time'],
      ...auditResults.map(result => [
        result.electionTitle || 'Unknown',
        result.dbVotes || 0,
        result.chainVotes || 0,
        result.consistencyStatus || 'unknown',
        result.contractAddress || 'Not set',
        result.auditTimestamp || 'Unknown'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `blockchain-audit-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleCreateElection = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    try {
      setLoading(true)
      setError("")
      
      // Prepare election data for API
      const electionData = {
        title: newElection.title,
        type: newElection.type,
        electionDate: newElection.electionDate,
        startTime: newElection.startTime,
        endTime: newElection.endTime,
        states: (() => {
          if (newElection.type === "Governorship" && newElection.selectedState) {
            return [newElection.selectedState]
          } else if (newElection.type === "Senatorial" && newElection.selectedState && newElection.selectedLGAs.length > 0) {
            return [newElection.selectedState] // State for senatorial
          }
          return newElection.states
        })(),
        lgas: newElection.type === "Senatorial" ? newElection.selectedLGAs : [],
        contestants: newElection.contestants.filter(contestant => 
          contestant.name.trim() !== "" && contestant.runningMate.trim() !== "" && contestant.party.trim() !== ""
        ) // Only include contestants with name, running mate, and party
      }
      
      // Get auth token
      if (!token) {
        throw new Error('No authentication token found')
      }
      
      // Make API call to create election
      const response = await fetch('/api/admin/elections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(electionData)
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      // Show success message
      setSuccess("Election created successfully!")
      
      // Reset form after successful creation
      setNewElection({
        title: "",
        type: "",
        electionDate: "",
        startTime: "",
        endTime: "",
        states: [],
        selectedState: "",
        selectedLGAs: [],
        contestants: defaultContestants
      })
      setElectionFormStep(1)
      setEditingContestantIndex(null)
      
      // Reload dashboard data to show the new election
      await loadDashboardData()
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create election")
    } finally {
      setLoading(false)
    }
  }

  const resetElectionForm = () => {
    setNewElection({
      title: "",
      type: "",
      electionDate: "",
      startTime: "",
      endTime: "",
      states: [],
      selectedState: "",
      selectedLGAs: [],
      contestants: defaultContestants
    })
    setElectionFormStep(1)
    setEditingContestantIndex(null)
  }

  const updateStats = async () => {
    try {
      setLoading(true)
      setError("")
      
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setError("No authentication token found")
        return
      }
      
      // Call the API to update system stats in the database
      const response = await fetch('/api/admin/system-stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          totalVoters: editableStats.totalVoters
        })
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        // Update the system stats with the new totalVoters value
        setSystemStats(prev => ({
          ...prev,
          totalVoters: editableStats.totalVoters
        }))
        
        setSuccess("Statistics updated successfully!")
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError(result.message || "Failed to update statistics")
      }
      
    } catch (error) {
      setError("Failed to update statistics")
    } finally {
      setLoading(false)
    }
  }

  const startEditingVoters = () => {
    setTempVotersValue(systemStats?.totalVoters || 0)
    setIsEditingVoters(true)
  }

  const cancelEditingVoters = () => {
    setTempVotersValue(systemStats?.totalVoters || 0)
    setIsEditingVoters(false)
  }

  const saveVotersValue = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Update the editable stats first
      setEditableStats(prev => ({
        ...prev,
        totalVoters: tempVotersValue
      }))
      
      // Call the API to save to database
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setError("No authentication token found")
        return
      }
      
      const response = await fetch('/api/admin/system-stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          totalVoters: tempVotersValue
        })
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        // Update the system stats after successful save
        setSystemStats(prev => ({
          ...prev,
          totalVoters: tempVotersValue
        }))
        
        setIsEditingVoters(false)
        setSuccess("Total Registered Voters updated successfully!")
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError(result.message || "Failed to update Total Registered Voters")
      }
      
    } catch (error) {
      setError("Failed to update voters count")
    } finally {
      setLoading(false)
    }
  }

  const handleContinueToContestants = () => {
    setElectionFormStep(2)
  }

  const handleBackToBasicInfo = () => {
    setElectionFormStep(1)
  }

  const handleContestantChange = (index: number, field: 'name' | 'runningMate' | 'party', value: string) => {
    // Prevent party changes - party should remain fixed
    if (field === 'party') {
      return;
    }
    
    setNewElection(prev => ({
      ...prev,
      contestants: prev.contestants.map((contestant, i) => 
        i === index ? { ...contestant, [field]: value } : contestant
      )
    }))
  }

  const handleEditContestant = (index: number) => {
    setEditingContestantIndex(index)
  }

  const handleSaveContestant = (index: number) => {
    setEditingContestantIndex(null)
  }

  const handleEditContestants = (election: any) => {
    setEditingElection(election)
    
    // Populate the form with existing contestant data
    if (election.contestants && election.contestants.length > 0) {
      setNewElection(prev => ({
        ...prev,
        contestants: election.contestants
      }))
    } else {
      // Use default contestants if no data exists
      setNewElection(prev => ({
        ...prev,
        contestants: defaultContestants
      }))
    }
    
    setShowEditContestantsModal(true)
  }

  const handleUpdateContestants = () => {
    // Handle contestants update logic here
    setShowEditContestantsModal(false)
    setEditingElection(null)
    resetElectionForm()
  }

  const handleCancelEditContestants = () => {
    setShowEditContestantsModal(false)
    setEditingElection(null)
    // Reset to default contestants
    setNewElection(prev => ({
      ...prev,
      contestants: defaultContestants
    }))
  }

  // Handle view election details
  const handleViewElectionDetails = (election: any) => {
    setSelectedElection(election)
    setShowElectionDetailsModal(true)
  }

  // Handle close election details modal
  const handleCloseElectionDetails = () => {
    setShowElectionDetailsModal(false)
    setSelectedElection(null)
  }

  // Handle state selection - navigate to LGAs view
  const handleStateClick = (stateName: string) => {
    setSelectedStateForDetails(stateName)
    setCurrentView('lgas')
    setSelectedLGA(null)
  }

  // Handle LGA selection - navigate to wards view
  const handleLGAClick = (lgaName: string) => {
    setSelectedLGA(lgaName)
    setCurrentView('wards')
  }

  // Handle back navigation
  const handleBackToStates = () => {
    setCurrentView('states')
    setSelectedStateForDetails(null)
    setSelectedLGA(null)
  }

  const handleBackToLGAs = () => {
    setCurrentView('lgas')
    setSelectedLGA(null)
  }

  const handleCloseStateDetails = () => {
    setSelectedStateForDetails(null)
    setStateDetailsData(null)
  }

  // Handle delete election
  const handleDeleteElection = async (electionId: string) => {
    if (!confirm('Are you sure you want to delete this election? This action cannot be undone.')) {
      return
    }

    try {
      setLoading(true)
      setError("")
      
      // Get auth token
      if (!token) {
        throw new Error('No authentication token found')
      }
      
      // Make API call to delete election
      const response = await fetch(`/api/admin/elections/${electionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      // Show success message
      setSuccess("Election deleted successfully!")
      
      // Reload dashboard data to remove the deleted election
      await loadDashboardData()
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete election")
    } finally {
      setLoading(false)
    }
  }

  const handleApproveObserver = async (observerId: string) => {
    try {
      setProcessingObserver(observerId)
      setError("")
      setSuccess("")
      
      await adminService.approveObserver(observerId)
      
      // Update local state
      setObservers(prev => prev.map(observer => 
        observer.id === observerId 
          ? { ...observer, status: 'approved' as const, approved_at: new Date().toISOString() }
          : observer
      ))
      
      // Update stats
      setSystemStats(prev => {
        const currentStats = prev || {
          totalVoters: 0,
          totalPollingUnits: 0,
          totalLGAs: 0,
          totalStates: 0,
          activeElections: 0,
          pendingObservers: 0,
          approvedObservers: 0,
          rejectedObservers: 0,
        }
        return {
          ...currentStats,
          pendingObservers: currentStats.pendingObservers - 1,
          approvedObservers: currentStats.approvedObservers + 1
        }
      })
      
      setSuccess(`Observer approved successfully!`)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to approve observer')
    } finally {
      setProcessingObserver(null)
    }
  }

  const handleSearchPollingUnits = async (query: string) => {
    setSearchQuery(query)
    if (query.length >= 2) {
      try {
        const results = await RealGeoDataService.searchPollingUnits(query, 20)
        setSearchResults(results)
      } catch (error) {
        setSearchResults([])
        setError('Failed to search polling units. Please try again.')
      }
    } else {
      setSearchResults([])
    }
  }

  const handleRejectObserver = async (observerId: string) => {
    try {
      setProcessingObserver(observerId)
      setError("")
      setSuccess("")
      
      await adminService.rejectObserver(observerId, rejectionReason)
      
      // Update local state
      setObservers(prev => prev.map(observer => 
        observer.id === observerId 
          ? { 
              ...observer, 
              status: 'rejected' as const, 
              approved_at: new Date().toISOString(),
              rejection_reason: rejectionReason || 'Application rejected by administrator'
            }
          : observer
      ))
      
      // Update stats
      setSystemStats(prev => {
        const currentStats = prev || {
          totalVoters: 0,
          totalPollingUnits: 0,
          totalLGAs: 0,
          totalStates: 0,
          activeElections: 0,
          pendingObservers: 0,
          approvedObservers: 0,
          rejectedObservers: 0,
        }
        return {
          ...currentStats,
          pendingObservers: currentStats.pendingObservers - 1,
          rejectedObservers: currentStats.rejectedObservers + 1
        }
      })
      
      setSuccess(`Observer rejected successfully!`)
      setRejectionReason("")
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to reject observer')
    } finally {
      setProcessingObserver(null)
    }
  }

  const handleLogout = async () => {
    // Use admin logout function
    await adminLogout()
    
    // Redirect to admin login page
    router.push('/admin/login')
  }

  // Show loading state while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-700">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Token Expiration Warning */}
      <TokenExpirationWarning
        show={showExpirationWarning}
        timeUntilExpiration={timeUntilExpiration}
        onDismiss={dismissWarning}
        onExtendSession={extendSession}
        userType="admin"
      />
      
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-slate-300 text-sm">Election Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Super Admin
              </Badge>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-20"></div>
                  <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-slate-200 rounded animate-pulse w-16 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-12"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Registered Voters</CardTitle>
              <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
                {!isEditingVoters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={startEditingVoters}
                    className="h-6 w-6 p-0"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditingVoters ? (
                <div className="space-y-2">
                  <Input
                    type="number"
                    value={tempVotersValue}
                    onChange={(e) => setTempVotersValue(parseInt(e.target.value) || 0)}
                    placeholder="84,004,084"
                    className="text-lg font-bold"
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={saveVotersValue}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-xs"
                    >
                      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelEditingVoters}
                      disabled={loading}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-bold">{(systemStats?.totalVoters || 0).toLocaleString()}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Polling Units</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(systemStats?.totalPollingUnits || 0).toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">LGAs</CardTitle>
              <MapPin className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats?.totalLGAs || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">States</CardTitle>
              <MapPin className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats?.totalStates || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Elections</CardTitle>
              <Vote className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats?.activeElections || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Pending Observers</CardTitle>
              <Eye className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats?.pendingObservers || 0}</div>
              <p className="text-xs text-slate-500">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Approved Observers</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats?.approvedObservers || 0}</div>
              <p className="text-xs text-slate-500">Active observers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Rejected Observers</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats?.rejectedObservers || 0}</div>
              <p className="text-xs text-slate-500">Rejected applications</p>
            </CardContent>
          </Card>
        </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Failed to Load Dashboard</h3>
                <p className="text-slate-600 mb-4">{error}</p>
                <Button onClick={loadDashboardData} className="bg-blue-600 hover:bg-blue-700">
                  <Loader2 className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        {!loading && !error && (
        <Tabs defaultValue="elections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="elections">Elections</TabsTrigger>
            <TabsTrigger value="observers">Observer Applications</TabsTrigger>
            <TabsTrigger value="locations">Manage Locations</TabsTrigger>
            <TabsTrigger value="position-tracking">Position Tracking</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain Sync</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="elections" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Election Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Election
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Election</DialogTitle>
                    <DialogDescription>
                      Step {electionFormStep} of 2: {electionFormStep === 1 ? "Basic Information" : "Contestants"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {/* Progress Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-slate-600">Step {electionFormStep} of 2</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(electionFormStep / 2) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {electionFormStep === 1 && (
                    <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Election Title</Label>
                        <Input
                          id="title"
                          value={newElection.title}
                          onChange={(e) => setNewElection((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Auto-generated based on type and date"
                          required
                            readOnly
                            className="bg-gray-50"
                        />
                          <p className="text-xs text-gray-500 mt-1">Title is auto-generated from election type and date</p>
                      </div>
                      <div>
                        <Label htmlFor="type">Election Type</Label>
                        <Select
                          value={newElection.type}
                            onValueChange={handleElectionTypeChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Presidential">Presidential</SelectItem>
                              <SelectItem value="Governorship">Governorship</SelectItem>
                              <SelectItem value="Senatorial">Senatorial</SelectItem>
                              <SelectItem value="House of Assembly">House of Assembly</SelectItem>
                              <SelectItem value="House of Representatives">House of Representatives</SelectItem>
                              <SelectItem value="Local Government">Local Government</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* State Selection - Show for Governorship and Senatorial elections */}
                      {(newElection.type === "Governorship" || newElection.type === "Senatorial") && (
                        <div>
                          <Label htmlFor="election-state">State</Label>
                          <Select value={newElection.selectedState} onValueChange={handleStateChange}>
                            <SelectTrigger>
                              <SelectValue placeholder={`Select state for ${newElection.type.toLowerCase()} election`} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Abia">Abia</SelectItem>
                              <SelectItem value="Adamawa">Adamawa</SelectItem>
                              <SelectItem value="Akwa Ibom">Akwa Ibom</SelectItem>
                              <SelectItem value="Anambra">Anambra</SelectItem>
                              <SelectItem value="Bauchi">Bauchi</SelectItem>
                              <SelectItem value="Bayelsa">Bayelsa</SelectItem>
                              <SelectItem value="Benue">Benue</SelectItem>
                              <SelectItem value="Borno">Borno</SelectItem>
                              <SelectItem value="Cross River">Cross River</SelectItem>
                              <SelectItem value="Delta">Delta</SelectItem>
                              <SelectItem value="Ebonyi">Ebonyi</SelectItem>
                              <SelectItem value="Edo">Edo</SelectItem>
                              <SelectItem value="Ekiti">Ekiti</SelectItem>
                              <SelectItem value="Enugu">Enugu</SelectItem>
                              <SelectItem value="Gombe">Gombe</SelectItem>
                              <SelectItem value="Imo">Imo</SelectItem>
                              <SelectItem value="Jigawa">Jigawa</SelectItem>
                              <SelectItem value="Kaduna">Kaduna</SelectItem>
                              <SelectItem value="Kano">Kano</SelectItem>
                              <SelectItem value="Katsina">Katsina</SelectItem>
                              <SelectItem value="Kebbi">Kebbi</SelectItem>
                              <SelectItem value="Kogi">Kogi</SelectItem>
                              <SelectItem value="Kwara">Kwara</SelectItem>
                              <SelectItem value="Lagos">Lagos</SelectItem>
                              <SelectItem value="Nasarawa">Nasarawa</SelectItem>
                              <SelectItem value="Niger">Niger</SelectItem>
                              <SelectItem value="Ogun">Ogun</SelectItem>
                              <SelectItem value="Ondo">Ondo</SelectItem>
                              <SelectItem value="Osun">Osun</SelectItem>
                              <SelectItem value="Oyo">Oyo</SelectItem>
                              <SelectItem value="Plateau">Plateau</SelectItem>
                              <SelectItem value="Rivers">Rivers</SelectItem>
                              <SelectItem value="Sokoto">Sokoto</SelectItem>
                              <SelectItem value="Taraba">Taraba</SelectItem>
                              <SelectItem value="Yobe">Yobe</SelectItem>
                              <SelectItem value="Zamfara">Zamfara</SelectItem>
                              <SelectItem value="FCT">Federal Capital Territory</SelectItem>
                            </SelectContent>
                          </Select>
                    </div>
                      )}

                      {/* LGA Selection - Only show for Senatorial elections after state is selected */}
                      {newElection.type === "Senatorial" && newElection.selectedState && (
                    <div>
                          <Label htmlFor="election-lgas">Local Government Areas (Select 3)</Label>
                          <div className="space-y-2">
                            <p className={`text-sm ${newElection.selectedLGAs.length === 3 ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                              Selected: {newElection.selectedLGAs.length}/3 LGAs
                              {newElection.selectedLGAs.length === 3 && ' ✓'}
                            </p>
                            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
                              {getLGAsForState(newElection.selectedState).map((lga) => (
                                <label key={lga} className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={newElection.selectedLGAs.includes(lga)}
                                    onChange={() => handleLGAChange(lga)}
                                    disabled={!newElection.selectedLGAs.includes(lga) && newElection.selectedLGAs.length >= 3}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                                  />
                                  <span className="text-sm">{lga}</span>
                                </label>
                              ))}
                            </div>
                            {newElection.selectedLGAs.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700">Selected LGAs:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {newElection.selectedLGAs.map((lga) => (
                                    <span
                                      key={lga}
                                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                      {lga}
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleLGAChange(lga)
                                        }}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                      >
                                        ×
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                          <Label htmlFor="electionDate">Election Date</Label>
                          <Input
                            id="electionDate"
                            type="date"
                            value={newElection.electionDate}
                            onChange={(e) => handleElectionDateChange(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={newElection.startTime}
                            onChange={(e) => setNewElection((prev) => ({ ...prev, startTime: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="endTime">End Time</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={newElection.endTime}
                            onChange={(e) => setNewElection((prev) => ({ ...prev, endTime: e.target.value }))}
                            required
                          />
                        </div>
                    </div>

                      <div className="flex justify-end space-x-3">
                        <Button type="button" variant="outline" onClick={resetElectionForm}>
                          Cancel
                        </Button>
                        <Button 
                          type="button" 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={handleContinueToContestants}
                          disabled={
                            !newElection.type || 
                            !newElection.electionDate || 
                            !newElection.startTime || 
                            !newElection.endTime ||
                            (newElection.type === "Governorship" && !newElection.selectedState) ||
                            (newElection.type === "Senatorial" && (!newElection.selectedState || newElection.selectedLGAs.length !== 3))
                          }
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {electionFormStep === 2 && (
                    <div className="space-y-4">
                      <div className="mb-2">
                        <h3 className="text-base font-semibold mb-1">Contestants Information</h3>
                        <p className="text-xs text-gray-600">Enter the names of contestants and their running mates</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {newElection.contestants.map((contestant, index) => (
                          <Card key={index} className="p-2">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                  <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                                </div>
                                <h4 className="font-semibold text-xs">Contestant {index + 1}</h4>
                              </div>
                              {editingContestantIndex === index ? (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSaveContestant(index)}
                                  className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100 h-5 px-1"
                                >
                                  <CheckCircle className="h-2 w-2 mr-1" />
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditContestant(index)}
                                  className="text-xs h-5 px-1"
                                >
                                  <Edit className="h-2 w-2 mr-1" />
                                  Edit
                                </Button>
                              )}
                            </div>
                            <div className="space-y-2">
                              <div>
                                <Label htmlFor={`contestant-${index}-name`} className="text-xs">Contestant Name</Label>
                                <Input
                                  id={`contestant-${index}-name`}
                                  value={contestant.name}
                                  onChange={(e) => handleContestantChange(index, 'name', e.target.value)}
                                  placeholder="Enter contestant name"
                                  readOnly={editingContestantIndex !== index}
                                  className={`h-6 text-xs ${editingContestantIndex !== index ? "bg-gray-50 cursor-not-allowed" : ""}`}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor={`contestant-${index}-runningMate`} className="text-xs">Running Mate</Label>
                                <Input
                                  id={`contestant-${index}-runningMate`}
                                  value={contestant.runningMate}
                                  onChange={(e) => handleContestantChange(index, 'runningMate', e.target.value)}
                                  placeholder="Enter running mate name"
                                  readOnly={editingContestantIndex !== index}
                                  className={`h-6 text-xs ${editingContestantIndex !== index ? "bg-gray-50 cursor-not-allowed" : ""}`}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor={`contestant-${index}-party`} className="text-xs">Political Party</Label>
                                <div className="h-6 text-xs w-full px-2 py-1 border rounded bg-gray-50 text-gray-700 flex items-center">
                                  {contestant.party || 'Not specified'}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={handleBackToBasicInfo}>
                          Back
                        </Button>
                        <div className="space-x-3">
                          <Button type="button" variant="outline" onClick={resetElectionForm}>
                            Cancel
                          </Button>
                          <Button 
                            type="button" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={handleCreateElection}
                            disabled={newElection.contestants.some(c => !c.name || !c.runningMate || !c.party) || loading}
                          >
                            {loading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              'Create Election'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Edit Contestants Modal */}
              <Dialog open={showEditContestantsModal} onOpenChange={setShowEditContestantsModal}>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Edit Contestants - {editingElection?.title}</DialogTitle>
                    <DialogDescription>
                      Update the contestants and their running mates for this election
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Contestants Information</h3>
                      <p className="text-sm text-gray-600">Update the names of contestants and their running mates</p>
                    </div>

                    <div className="space-y-6">
                      {newElection.contestants.map((contestant, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                              </div>
                              <h4 className="font-semibold">Contestant {index + 1}</h4>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Reset this contestant to default
                                const updatedContestants = [...newElection.contestants]
                                updatedContestants[index] = defaultContestants[index]
                                setNewElection(prev => ({
                                  ...prev,
                                  contestants: updatedContestants
                                }))
                              }}
                              className="text-xs"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                              <Label htmlFor={`edit-contestant-${index}-name`}>Contestant Name</Label>
                        <Input
                                id={`edit-contestant-${index}-name`}
                                value={contestant.name}
                                onChange={(e) => handleContestantChange(index, 'name', e.target.value)}
                                placeholder="Enter contestant name"
                          required
                        />
                      </div>
                      <div>
                              <Label htmlFor={`edit-contestant-${index}-runningMate`}>Running Mate</Label>
                        <Input
                                id={`edit-contestant-${index}-runningMate`}
                                value={contestant.runningMate}
                                onChange={(e) => handleContestantChange(index, 'runningMate', e.target.value)}
                                placeholder="Enter running mate name"
                          required
                        />
                      </div>
                      <div>
                              <Label htmlFor={`edit-contestant-${index}-party`}>Political Party</Label>
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 flex items-center">
                          {contestant.party || 'Not specified'}
                        </div>
                      </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button type="button" variant="outline" onClick={handleCancelEditContestants}>
                        Cancel
                      </Button>
                      <Button 
                        type="button" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleUpdateContestants}
                        disabled={newElection.contestants.some(c => !c.name || !c.runningMate || !c.party)}
                      >
                        Update Contestants
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Election Details Modal */}
              <Dialog open={showElectionDetailsModal} onOpenChange={setShowElectionDetailsModal}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Election Details</DialogTitle>
                    <DialogDescription>
                      Comprehensive information about the selected election
                    </DialogDescription>
                  </DialogHeader>

                  {selectedElection && (
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm font-medium text-gray-600">Election Title</Label>
                                <p className="text-lg font-semibold">{selectedElection.title || "Untitled Election"}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">Election Type</Label>
                                <p className="text-base">{selectedElection.election_type || selectedElection.type || "Unknown Type"}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">Status</Label>
                                <Badge className={
                                  selectedElection.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"
                                }>
                                  {selectedElection.status || "pending"}
                                </Badge>
                              </div>
                            </div>
                          </div>
            </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Date & Time</h3>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm font-medium text-gray-600">Start Date & Time</Label>
                                <p className="text-base">
                                  {selectedElection.start_date ? 
                                    new Date(selectedElection.start_date).toLocaleString() : 
                                    "Not specified"
                                  }
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">End Date & Time</Label>
                                <p className="text-base">
                                  {selectedElection.end_date ? 
                                    new Date(selectedElection.end_date).toLocaleString() : 
                                    "Not specified"
                                  }
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">Created</Label>
                                <p className="text-base">
                                  {selectedElection.created_at ? 
                                    new Date(selectedElection.created_at).toLocaleString() : 
                                    "Unknown"
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Statistics */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-green-600 font-medium">Total Votes Cast</p>
                            <p className="text-2xl font-bold text-green-800">
                              {(selectedElection.electionStats?.totalVotesCast || selectedElection.votesCast || selectedElection.total_votes || 0).toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <p className="text-sm text-orange-600 font-medium">Non-Voters</p>
                            <p className="text-2xl font-bold text-orange-800">
                              {(selectedElection.electionStats?.nonVoters || ((selectedElection.totalVoters || 0) - (selectedElection.votesCast || 0))).toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-sm text-purple-600 font-medium">Turnout</p>
                            <p className="text-2xl font-bold text-purple-800">
                              {selectedElection.electionStats?.electionTurnoutPercentage || 
                               (selectedElection.totalVoters && selectedElection.votesCast ? 
                                ((selectedElection.votesCast / selectedElection.totalVoters) * 100).toFixed(1) : 
                                "0.0")}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Contestants */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Contestants</h3>
                        {selectedElection.contestants && selectedElection.contestants.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedElection.contestants.map((contestant: any, index: number) => (
                              <Card key={index} className="p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                                  </div>
                                  {/* Party Picture */}
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <img
                                      src={contestant.partyPicture || "/party-logos/placeholder-user.jpg"}
                                      alt={contestant.party || "Independent"}
                                      className="w-10 h-10 object-contain"
                                      onError={(e) => {
                                        e.currentTarget.src = "/party-logos/placeholder-user.jpg";
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold">{contestant.name || "Unknown Candidate"}</p>
                                    <p className="text-sm text-gray-600">{contestant.party || "Independent"}</p>
                                    <p className="text-sm text-gray-600">Running Mate: {contestant.running_mate || contestant.runningMate || "Not specified"}</p>
                                    {contestant.votes !== undefined && (
                                      <p className="text-sm text-green-600 font-medium">
                                        Votes: {contestant.votes.toLocaleString()}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No contestants available</p>
                        )}
                      </div>

                      {/* Coverage */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Coverage</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          {(() => {
                            const electionType = selectedElection.election_type || selectedElection.type;
                            const states = selectedElection.states;
                            const lgas = selectedElection.lgas;
                            
                            // For Presidential elections
                            if (electionType === "Presidential") {
                              return (
                                <>
                                  <p className="text-sm text-gray-600 mb-2">Coverage Area:</p>
                                  <p className="text-base font-medium">All States</p>
                                </>
                              );
                            }
                            
                            // For Governorship elections
                            if (electionType === "Governorship") {
                              if (Array.isArray(states) && states.length > 0) {
                                return (
                                  <>
                                    <p className="text-sm text-gray-600 mb-2">Coverage Area:</p>
                                    <p className="text-base font-medium">{states.join(", ")}</p>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <p className="text-sm text-gray-600 mb-2">Coverage Area:</p>
                                    <p className="text-base text-red-600">No state specified</p>
                                  </>
                                );
                              }
                            }
                            
                            // For Senatorial elections
                            if (electionType === "Senatorial") {
                              if (Array.isArray(states) && states.length > 0 && Array.isArray(lgas) && lgas.length > 0) {
                                return (
                                  <>
                                    <p className="text-sm text-gray-600 mb-2">Coverage Area:</p>
                                    <p className="text-base font-medium mb-2">State: {states.join(", ")}</p>
                                    <p className="text-sm text-gray-600 mb-1">LGAs Covered:</p>
                                    <p className="text-base">{lgas.join(", ")}</p>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <p className="text-sm text-gray-600 mb-2">Coverage Area:</p>
                                    <p className="text-base text-red-600">Incomplete coverage data</p>
                                  </>
                                );
                              }
                            }
                            
                            // Default fallback
                            return (
                              <>
                                <p className="text-sm text-gray-600 mb-2">Coverage Area:</p>
                                <p className="text-base">All States</p>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button onClick={handleCloseElectionDetails} variant="outline">
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {(Array.isArray(elections) ? elections : []).map((election, index) => {
                return (
                <Card 
                  key={election._id || election.id || `election-${index}`} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewElectionDetails(election)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{election.title || "Untitled Election"}</CardTitle>
                        <CardDescription>
                          {election.election_type || election.type || "Unknown Type"} • {(() => {
                            const electionType = election.election_type || election.type;
                            const states = election.states;
                            const lgas = election.lgas;
                            
                            // For Presidential elections
                            if (electionType === "Presidential") {
                              return "All States";
                            }
                            
                            // For Governorship elections
                            if (electionType === "Governorship") {
                              if (Array.isArray(states) && states.length > 0) {
                                return states.join(", ");
                              } else {
                                return "No state specified";
                              }
                            }
                            
                            // For Senatorial elections
                            if (electionType === "Senatorial") {
                              if (Array.isArray(states) && states.length > 0 && Array.isArray(lgas) && lgas.length > 0) {
                                return `${states.join(", ")} (${lgas.length} LGAs)`;
                              } else {
                                return "Incomplete coverage";
                              }
                            }
                            
                            // Default fallback
                            return "All States";
                          })()}
                        </CardDescription>
                        {election.contract_address && (
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Contract:</span>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {election.contract_address.slice(0, 10)}...{election.contract_address.slice(-6)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(election.contract_address);
                                // You could add a toast notification here
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            election.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"
                          }
                        >
                          {election.status || "pending"}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditContestants(election)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteElection(String(election._id || election.id))
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">Total Votes Cast</p>
                        <p className="text-2xl font-bold text-green-800">{(election.votesCast || 0).toLocaleString()}</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-sm text-orange-600 font-medium">Non-Voters</p>
                        <p className="text-2xl font-bold text-orange-800">
                          {((election.totalVoters || 0) - (election.votesCast || 0)).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-600 font-medium">Turnout</p>
                        <p className="text-2xl font-bold text-purple-800">
                          {election.totalVoters && election.votesCast ? 
                            ((election.votesCast / election.totalVoters) * 100).toFixed(1) : 
                            "0.0"
                          }%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="observers" className="space-y-6">
            <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900">Observer Applications</h2>
              <Button 
                variant="outline" 
                onClick={loadDashboardData}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Refresh
              </Button>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-slate-600">Loading observers...</span>
              </div>
            ) : (
            <div className="grid gap-4">
                {observers.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Eye className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">No Observer Applications</h3>
                      <p className="text-slate-600">No observer applications have been submitted yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  observers.map((observer) => (
                    <Card key={observer.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{observer.organization_name}</CardTitle>
                            <CardDescription>
                              {observer.email} • {observer.organization_type}
                            </CardDescription>
                          </div>
                          <Badge
                            className={
                              observer.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : observer.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {observer.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-slate-600">Email</p>
                            <p className="font-medium">{observer.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Phone</p>
                            <p className="font-medium">{observer.country_code} {observer.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Address</p>
                            <p className="font-medium">{observer.address}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Applied Date</p>
                            <p className="font-medium">{new Date(observer.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {observer.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveObserver(observer.id)}
                              disabled={processingObserver === observer.id}
                            >
                              {processingObserver === observer.id ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4 mr-2" />
                              )}
                              Approve
                            </Button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  disabled={processingObserver === observer.id}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Observer Application</DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for rejecting this observer application.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="rejectionReason">Rejection Reason</Label>
                                    <Textarea
                                      id="rejectionReason"
                                      placeholder="Enter reason for rejection..."
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setRejectionReason("")}>
                                      Cancel
                                    </Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleRejectObserver(observer.id)}
                                      disabled={processingObserver === observer.id}
                                    >
                                      {processingObserver === observer.id ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      ) : null}
                                      Reject Application
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}

                        {observer.status === "rejected" && observer.rejection_reason && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-800">
                              <strong>Rejection Reason:</strong> {observer.rejection_reason}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
            </div>
            )}
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-slate-900">Manage Locations</h2>
                  {currentView !== 'states' && (
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <span>›</span>
                      {currentView === 'lgas' && selectedStateForDetails && (
                        <span className="font-medium">{selectedStateForDetails}</span>
                      )}
                      {currentView === 'wards' && selectedStateForDetails && selectedLGA && (
                        <>
                          <span className="font-medium">{selectedStateForDetails}</span>
                          <span>›</span>
                          <span className="font-medium">{selectedLGA}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {currentView !== 'states' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={currentView === 'lgas' ? handleBackToStates : handleBackToLGAs}
                    >
                      ← Back to {currentView === 'lgas' ? 'States' : 'LGAs'}
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={loadDashboardData}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                    Refresh Data
                  </Button>
                </div>
              </div>
            
            {/* Location Statistics Overview */}
            {locationStats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Total States</CardTitle>
                    <MapPin className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{locationStats.totalStates}</div>
                    <p className="text-xs text-slate-500">Nigerian States + FCT</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Total LGAs</CardTitle>
                    <MapPin className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{locationStats.totalLGAs.toLocaleString()}</div>
                    <p className="text-xs text-slate-500">Local Government Areas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Total Wards</CardTitle>
                    <MapPin className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{locationStats.totalWards.toLocaleString()}</div>
                    <p className="text-xs text-slate-500">Electoral Wards</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600">Polling Units</CardTitle>
                    <MapPin className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{locationStats.totalPollingUnits.toLocaleString()}</div>
                    <p className="text-xs text-slate-500">Voting Locations</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* All States Overview */}
            {/* Conditional Views Based on Navigation */}
            {currentView === 'states' && (
                  <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900">All Nigerian States</h3>
                  <p className="text-sm text-slate-600">Click on any state to view its Local Government Areas</p>
                    </div>
                
                <div className="grid gap-4">
                  {Object.entries({
                    "Abia": ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"],
                    "Adamawa": ["Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Grie", "Hong", "Jada", "Lamurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
                    "Akwa Ibom": ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"],
                    "Anambra": ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
                    "Bauchi": ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
                    "Bayelsa": ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
                    "Benue": ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Otukpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"],
                    "Borno": ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"],
                    "Cross River": ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"],
                    "Delta": ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"],
                    "Ebonyi": ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"],
                    "Edo": ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba Okha", "Oredo", "Orhionmwon", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"],
                    "Ekiti": ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"],
                    "Enugu": ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo Uwani"],
                    "FCT": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
                    "Gombe": ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"],
                    "Imo": ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West", "Unuimo"],
                    "Jigawa": ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kazaure", "Kiri Kasama", "Kiyawa", "Kaugama", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"],
                    "Kaduna": ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"],
                    "Kano": ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
                    "Katsina": ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dandume", "Danja", "Dan Musa", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
                    "Kebbi": ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"],
                    "Kogi": ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"],
                    "Kwara": ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"],
                    "Lagos": ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
                    "Nasarawa": ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"],
                    "Niger": ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Moya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"],
                    "Ogun": ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Shagamu"],
                    "Ondo": ["Akoko North-East", "Akoko North-West", "Akoko South-West", "Akoko South-East", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"],
                    "Osun": ["Atakunmosa East", "Atakunmosa West", "Aiyedaade", "Aiyedire", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Ife Central", "Ife East", "Ife North", "Ife South", "Egbedore", "Ejigbo", "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"],
                    "Oyo": ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomoso North", "Ogbomoso South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo", "Oyo East", "Saki East", "Saki West", "Surulere"],
                    "Plateau": ["Bokkos", "Barkin Ladi", "Bassa", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"],
                    "Rivers": ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"],
                    "Sokoto": ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"],
                    "Taraba": ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kurmi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"],
                    "Yobe": ["Bade", "Bursari", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"],
                    "Zamfara": ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kankara", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Chafe", "Zurmi"]
                  }).map(([stateName, lgas]) => (
                    <Card 
                      key={stateName} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleStateClick(stateName)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold text-slate-900">{stateName}</CardTitle>
                          <div className="text-sm text-blue-600 font-medium">Click to view LGAs →</div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {lgas.length} Local Government Areas
                            </span>
                            <span className="flex items-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                              ~{Math.floor(lgas.length * 4)} Electoral Wards
                            </span>
                            <span className="flex items-center">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                              ~{Math.floor(lgas.length * 20)} Polling Units
                            </span>
                          </div>
                  </div>
                </CardContent>
              </Card>
                  ))}
                </div>
              </div>
            )}

            {/* LGAs View */}
            {currentView === 'lgas' && selectedStateForDetails && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedStateForDetails} - Local Government Areas</CardTitle>
                  <CardDescription>Click on any LGA to view its wards and polling units</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {getLGAsForState(selectedStateForDetails).map((lga, index) => (
                      <div 
                        key={index} 
                        className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 cursor-pointer transition-colors"
                        onClick={() => handleLGAClick(lga)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-slate-900">{lga}</h3>
                          <div className="text-xs text-green-600 font-medium">Click to view wards</div>
                        </div>
                        <p className="text-sm text-slate-600">LGA #{index + 1}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Wards and Polling Units View */}
            {currentView === 'wards' && selectedStateForDetails && selectedLGA && (
              <div className="space-y-6">
                {/* Wards Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedLGA} - Electoral Wards</CardTitle>
                    <CardDescription>Electoral wards in {selectedLGA}, {selectedStateForDetails}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                      {Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, wardIndex) => (
                        <div key={wardIndex} className="border rounded-lg p-4 bg-orange-50">
                          <h3 className="font-semibold text-slate-900 mb-2">Ward {wardIndex + 1}</h3>
                          <p className="text-sm text-slate-600">Ward Code: WARD-{selectedStateForDetails.toUpperCase()}-{selectedLGA.replace(/\s+/g, '')}-{wardIndex + 1}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Polling Units Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedLGA} - Polling Units</CardTitle>
                    <CardDescription>Polling units in {selectedLGA}, {selectedStateForDetails}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                      {Array.from({ length: Math.floor(Math.random() * 5) + 5 }, (_, puIndex) => {
                        // Generate realistic addresses based on LGA and state
                        const addresses = [
                          `${selectedLGA} Primary School, ${selectedLGA}`,
                          `${selectedLGA} Central Mosque, ${selectedLGA}`,
                          `${selectedLGA} Community Hall, ${selectedLGA}`,
                          `${selectedLGA} Health Center, ${selectedLGA}`,
                          `${selectedLGA} Market Square, ${selectedLGA}`,
                          `${selectedLGA} Town Hall, ${selectedLGA}`,
                          `${selectedLGA} Secondary School, ${selectedLGA}`,
                          `${selectedLGA} Church, ${selectedLGA}`,
                          `${selectedLGA} Sports Complex, ${selectedLGA}`,
                          `${selectedLGA} Library, ${selectedLGA}`,
                          `${selectedLGA} Post Office, ${selectedLGA}`,
                          `${selectedLGA} Police Station, ${selectedLGA}`,
                          `${selectedLGA} Fire Station, ${selectedLGA}`,
                          `${selectedLGA} Court House, ${selectedLGA}`,
                          `${selectedLGA} Bank, ${selectedLGA}`
                        ];
                        
                        const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
                        
                        return (
                          <div key={puIndex} className="border rounded-lg p-4 bg-purple-50">
                            <h3 className="font-semibold text-slate-900 mb-2">Polling Unit {puIndex + 1}</h3>
                            <p className="text-sm text-slate-600 mb-1">Address: {randomAddress}, {selectedStateForDetails} State</p>
                            <p className="text-xs text-slate-500">PU Code: PU-{selectedStateForDetails.toUpperCase()}-{selectedLGA.replace(/\s+/g, '')}-{puIndex + 1}</p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid gap-6">
              {/* Search Polling Units */}
              <Card>
                <CardHeader>
                  <CardTitle>Search Polling Units</CardTitle>
                  <CardDescription>Search for specific polling units across Nigeria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="search">Search Query</Label>
                      <Input
                        id="search"
                        placeholder="Enter polling unit name, ward, LGA, or state..."
                        value={searchQuery}
                        onChange={(e) => handleSearchPollingUnits(e.target.value)}
                      />
                    </div>
                    
                    {searchResults.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-900">Search Results ({searchResults.length})</h4>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {searchResults.map((result, index) => (
                            <div key={index} className="p-3 border rounded-lg bg-slate-50">
                              <div className="font-medium text-slate-900">{result.name}</div>
                              <div className="text-sm text-slate-600">
                                {result.code} • {result.address}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Top States by Polling Units */}
              <Card>
                <CardHeader>
                  <CardTitle>Top States by Polling Units</CardTitle>
                  <CardDescription>States with the highest number of polling units</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topStatesByPollingUnits.map((state, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{state.name}</div>
                            <div className="text-sm text-slate-600">
                              {state.lgaCount} LGAs • {state.wardCount} Wards
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">{state.pollingUnitCount.toLocaleString()}</div>
                          <div className="text-xs text-slate-500">Polling Units</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* States with Most LGAs */}
              <Card>
                <CardHeader>
                  <CardTitle>States with Most LGAs</CardTitle>
                  <CardDescription>States with the highest number of Local Government Areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topStatesByLGAs.map((state, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{state.name}</div>
                            <div className="text-sm text-slate-600">
                              {state.wardCount} Wards • {state.pollingUnitCount.toLocaleString()} Polling Units
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">{state.lgaCount}</div>
                          <div className="text-xs text-slate-500">LGAs</div>
                        </div>
                    </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="position-tracking" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Live Position Tracking</h2>
              <Button 
                onClick={() => window.open('/vote-position-enhanced', '_blank')}
                variant="outline"
                size="sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                View User Experience
              </Button>
            </div>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Election Position Analytics</span>
                  </CardTitle>
                  <CardDescription>
                    Monitor vote positions and election progress in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Position Tracking Dashboard</h3>
                    <p className="text-slate-600 mb-4">
                      Live position tracking features are now available
                    </p>
                    <div className="space-y-2 text-sm text-slate-500">
                      <p>✅ Real-time vote position calculation</p>
                      <p>✅ Hierarchical position tracking (PU → Ward → LGA → State → National)</p>
                      <p>✅ Live election progress monitoring</p>
                      <p>✅ Geographic breakdown analytics</p>
                      <p>✅ Manual refresh for live updates</p>
                    </div>
                    <div className="mt-6">
                      <Button 
                        onClick={() => window.open('/vote-position-enhanced', '_blank')}
                        className="mr-4"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Live Tracking
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          // Refresh election data
                          loadDashboardData();
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Data
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Election Selection for Position Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Election for Position Analysis</CardTitle>
                  <CardDescription>
                    Choose an election to view detailed position tracking data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {elections.length > 0 ? (
                      <div className="grid gap-4">
                        {elections.map((election) => (
                          <div key={election._id} className="border rounded-lg p-4 hover:bg-slate-50">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-slate-900">{election.title}</h3>
                                <p className="text-sm text-slate-600">
                                  {election.total_votes || 0} total votes • {election.status}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => window.open(`/vote-position-enhanced?election=${election._id}`, '_blank')}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Positions
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No Elections Available</h3>
                        <p className="text-slate-600">
                          Create an election to start tracking vote positions
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Blockchain Sync Management</h2>
              <div className="flex gap-2">
                <Button 
                  onClick={handleRetryPendingVotes}
                  disabled={isRetrying || syncStatus.isRunning}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isRetrying ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry Pending Votes
                    </>
                  )}
                </Button>

                <Button 
                  onClick={handleToggleAutoRetry}
                  variant={autoRetryEnabled ? "destructive" : "outline"}
                  className={autoRetryEnabled ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  {autoRetryEnabled ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Disable Auto-Retry
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Enable Auto-Retry
                    </>
                  )}
                </Button>

                <Button 
                  onClick={handleManualRetry}
                  disabled={isRetrying}
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Manual Retry
                </Button>
              </div>
            </div>

            {/* Blockchain Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
                  <Vote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blockchainStats.totalVotes}</div>
                  <p className="text-xs text-muted-foreground">
                    All votes in system
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Successful Votes</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{blockchainStats.successfulVotes}</div>
                  <p className="text-xs text-muted-foreground">
                    Synced to blockchain
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Votes</CardTitle>
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{blockchainStats.pendingVotes}</div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting blockchain sync
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <Target className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{blockchainStats.successRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Blockchain sync success rate
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sync Status */}
            <Card>
              <CardHeader>
                <CardTitle>Sync Status</CardTitle>
                <CardDescription>
                  Current blockchain synchronization status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sync Status:</span>
                    <Badge variant={syncStatus.isRunning ? "default" : "secondary"}>
                      {syncStatus.isRunning ? "Running" : "Idle"}
                    </Badge>
                  </div>
                  
                  {syncStatus.lastResults && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Last Sync Results:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Retried:</span>
                          <span className="ml-2 font-medium">{(syncStatus.lastResults as any)?.retried || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Successful:</span>
                          <span className="ml-2 font-medium text-green-600">{(syncStatus.lastResults as any)?.success || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Still Pending:</span>
                          <span className="ml-2 font-medium text-yellow-600">{(syncStatus.lastResults as any)?.stillPending || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="ml-2 font-medium">{(syncStatus.lastResults as any)?.duration || 0}ms</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Auto-Retry Status */}
            <Card>
              <CardHeader>
                <CardTitle>Auto-Retry Status</CardTitle>
                <CardDescription>
                  Automatic retry service for pending blockchain votes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-Retry Status:</span>
                    <Badge variant={autoRetryEnabled ? "default" : "secondary"}>
                      {autoRetryEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Service Status:</span>
                    <Badge variant={autoRetryStatus.isRunning ? "default" : "outline"}>
                      {autoRetryStatus.isRunning ? "Running" : "Stopped"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Retries:</span>
                      <span className="ml-2 font-medium">{autoRetryStatus.retryCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Retry:</span>
                      <span className="ml-2 font-medium">
                        {autoRetryStatus.lastRetry 
                          ? autoRetryStatus.lastRetry.toLocaleTimeString()
                          : 'Never'
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Auto-retry checks for pending votes every 5 minutes when enabled
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Votes Details */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Votes Details</CardTitle>
                <CardDescription>
                  Votes that failed to sync to blockchain and need retry
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingVotes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <p>No pending votes! All votes are synced to blockchain.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      {pendingVotes.length} votes pending blockchain sync
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {pendingVotes.map((vote, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{vote.electionTitle}</span>
                            <Badge variant="outline">
                              Retry #{vote.retryCount}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div>Voter: {vote.voterEmail}</div>
                            <div>Candidate: {vote.candidateId}</div>
                            <div>Last Attempt: {new Date(vote.lastAttempt).toLocaleString()}</div>
                            <div>Error: {vote.lastError}</div>
                          </div>
                          <div className="flex items-center space-x-4 text-xs">
                            <div className={`flex items-center ${vote.hasContract ? 'text-green-600' : 'text-red-600'}`}>
                              <div className={`w-2 h-2 rounded-full mr-2 ${vote.hasContract ? 'bg-green-600' : 'bg-red-600'}`}></div>
                              Contract: {vote.hasContract ? 'Available' : 'Missing'}
                            </div>
                            <div className={`flex items-center ${vote.hasWallet ? 'text-green-600' : 'text-red-600'}`}>
                              <div className={`w-2 h-2 rounded-full mr-2 ${vote.hasWallet ? 'bg-green-600' : 'bg-red-600'}`}></div>
                              Wallet: {vote.hasWallet ? 'Available' : 'Missing'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Blockchain Audit Section */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Blockchain Audit & Consistency Reports</CardTitle>
                    <CardDescription>
                      Compare MongoDB votes with blockchain data for consistency verification
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleAuditAllElections}
                      disabled={isAuditing || auditStatus.isRunning}
                      variant="outline"
                      size="sm"
                    >
                      {isAuditing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Auditing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Audit All Elections
                        </>
                      )}
                    </Button>
                    {auditResults.length > 0 && (
                      <Button 
                        onClick={exportAuditResults}
                        variant="outline"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Audit Status */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Audit Status:</span>
                    <Badge variant={auditStatus.isRunning ? "default" : "secondary"}>
                      {auditStatus.isRunning ? "Running" : "Idle"}
                    </Badge>
                  </div>
                  
                  {auditStatus.lastAudit && (
                    <div className="text-sm text-muted-foreground">
                      Last Audit: {new Date(auditStatus.lastAudit).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Election Selection for Single Audit */}
                <div className="mb-6">
                  <Label htmlFor="election-select">Audit Single Election:</Label>
                  <Select 
                    value={selectedElectionForAudit || ""} 
                    onValueChange={setSelectedElectionForAudit}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an election to audit" />
                    </SelectTrigger>
                    <SelectContent>
                      {elections.map((election) => (
                        <SelectItem key={election._id || election.id} value={election._id || election.id}>
                          {election.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => selectedElectionForAudit && handleAuditSingleElection(selectedElectionForAudit)}
                    disabled={!selectedElectionForAudit || isAuditing || auditStatus.isRunning}
                    className="mt-2"
                    size="sm"
                  >
                    Audit Selected Election
                  </Button>
                </div>

                {/* Audit Results */}
                {auditResults.length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Audit Results</h4>
                    <div className="space-y-2">
                      {auditResults.map((result, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">{result.electionTitle}</h5>
                            <Badge 
                              variant={result.isConsistent ? "default" : "destructive"}
                              className={result.isConsistent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                            >
                              {result.consistencyStatus === 'consistent' ? '✅ Consistent' : '⚠️ Inconsistent'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">DB Votes:</span>
                              <span className="ml-2 font-medium">{result.dbVotes}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Blockchain Votes:</span>
                              <span className="ml-2 font-medium">{result.chainVotes}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Contract:</span>
                              <span className="ml-2 font-medium text-xs">
                                {result.contractAddress ? 'Available' : 'Not Set'}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Chain Status:</span>
                              <span className="ml-2 font-medium text-xs">
                                {result.chainStatus || 'Unknown'}
                              </span>
                            </div>
                          </div>

                          {result.analysis && result.analysis.issues && result.analysis.issues.length > 0 && (
                            <div className="mt-3">
                              <h6 className="text-sm font-medium text-red-600 mb-2">Issues Found:</h6>
                              <ul className="text-sm text-red-600 space-y-1">
                                {result.analysis.issues.map((issue: any, issueIndex: number) => (
                                  <li key={issueIndex} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{issue}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {result.analysis && result.analysis.recommendations && result.analysis.recommendations.length > 0 && (
                            <div className="mt-3">
                              <h6 className="text-sm font-medium text-blue-600 mb-2">Recommendations:</h6>
                              <ul className="text-sm text-blue-600 space-y-1">
                                {result.analysis.recommendations.map((rec: any, recIndex: number) => (
                                  <li key={recIndex} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="text-xs text-muted-foreground">
                            Audited: {new Date(result.auditTimestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <RefreshCw className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No audit results yet. Run an audit to see consistency reports.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">System Settings</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Homepage Statistics</CardTitle>
                  <CardDescription>Update the statistics displayed on the homepage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {success && (
                    <Alert className="border-green-500 bg-green-50">
                      <AlertDescription className="text-green-700">
                        {success}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert className="border-red-500 bg-red-50">
                      <AlertDescription className="text-red-700">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="totalVoters">Total Registered Voters</Label>
                        {!isEditingVoters && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={startEditingVoters}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {isEditingVoters ? (
                        <div className="space-y-2">
                      <Input
                        id="totalVoters"
                        type="number"
                            value={tempVotersValue}
                            onChange={(e) => setTempVotersValue(parseInt(e.target.value) || 0)}
                        placeholder="84,004,084"
                            className="mb-2"
                          />
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={saveVotersValue}
                              disabled={loading}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelEditingVoters}
                              disabled={loading}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                          <span className="text-lg font-semibold">
                            {editableStats.totalVoters.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="states">Total States</Label>
                      <Input
                        id="states" 
                        type="number"
                        value={systemStats?.totalStates || 37} 
                        readOnly
                        className="bg-gray-100"
                        placeholder="37" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lgas">Total LGAs</Label>
                      <Input 
                        id="lgas" 
                        type="number" 
                        value={systemStats?.totalLGAs || 368} 
                        readOnly
                        className="bg-gray-100"
                        placeholder="368" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="wards">Total Wards</Label>
                      <Input 
                        id="wards" 
                        type="number" 
                        value={systemStats?.totalWards || 1840} 
                        readOnly
                        className="bg-gray-100"
                        placeholder="1,840" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="pollingUnits">Total Polling Units</Label>
                      <Input
                        id="pollingUnits"
                        type="number"
                        value={systemStats?.totalPollingUnits || 9200}
                        readOnly
                        className="bg-gray-100"
                        placeholder="9,200"
                      />
                  </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        )}
      </div>
    </div>
  )
}
