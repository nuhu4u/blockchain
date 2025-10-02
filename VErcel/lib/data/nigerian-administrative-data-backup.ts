export interface NigerianAdministrativeData {
  [stateKey: string]: {
    name: string;
    lgas: {
      [lgaKey: string]: {
        name: string;
        wards: {
          [wardKey: string]: {
            name: string;
            pollingUnits: string[];
          };
        };
      };
    };
  };
}

export const nigerianAdministrativeData: NigerianAdministrativeData = {
  abia: {
    name: "Abia",
    lgas: {
      "aba-north": {
        name: "Aba North",
        wards: {
          "umungasi": {
            name: "Umungasi",
            pollingUnits: [
              "PU 001 - Umungasi Central Market",
              "PU 002 - Umungasi Primary School",
              "PU 003 - Umungasi Community Hall",
              "PU 004 - Umungasi Health Center",
              "PU 005 - Umungasi Mosque",
              "PU 006 - Umungasi Post Office",
              "PU 007 - Umungasi Police Station",
              "PU 008 - Umungasi Fire Station"
            ]
          },
          "umungasi-central": {
            name: "Umungasi Central",
            pollingUnits: [
              "PU 009 - Umungasi Central Primary School",
              "PU 010 - Umungasi Central Market",
              "PU 011 - Umungasi Central Community Hall",
              "PU 012 - Umungasi Central Health Center",
              "PU 013 - Umungasi Central Mosque",
              "PU 014 - Umungasi Central Church",
              "PU 015 - Umungasi Central Post Office",
              "PU 016 - Umungasi Central Police Station"
            ]
          },
          "umungasi-east": {
            name: "Umungasi East",
            pollingUnits: [
              "PU 017 - Umungasi East Primary School",
              "PU 018 - Umungasi East Market",
              "PU 019 - Umungasi East Community Hall",
              "PU 020 - Umungasi East Health Center",
              "PU 021 - Umungasi East Mosque",
              "PU 022 - Umungasi East Church",
              "PU 023 - Umungasi East Post Office",
              "PU 024 - Umungasi East Police Station"
            ]
          }
        }
      },
      "aba-south": {
        name: "Aba South",
        wards: {
          "abaukwu": {
            name: "Abaukwu",
            pollingUnits: [
              "PU 025 - Abaukwu Central Market",
              "PU 026 - Abaukwu Primary School",
              "PU 027 - Abaukwu Community Hall",
              "PU 028 - Abaukwu Health Center",
              "PU 029 - Abaukwu Mosque",
              "PU 030 - Abaukwu Post Office",
              "PU 031 - Abaukwu Police Station",
              "PU 032 - Abaukwu Fire Station"
            ]
          },
          "abaukwu-central": {
            name: "Abaukwu Central",
            pollingUnits: [
              "PU 033 - Abaukwu Central Primary School",
              "PU 034 - Abaukwu Central Market",
              "PU 035 - Abaukwu Central Community Hall",
              "PU 036 - Abaukwu Central Health Center",
              "PU 037 - Abaukwu Central Mosque",
              "PU 038 - Abaukwu Central Church",
              "PU 039 - Abaukwu Central Post Office",
              "PU 040 - Abaukwu Central Police Station"
            ]
          }
        }
      },
      "umuahia-north": {
        name: "Umuahia North",
        wards: {
          "umuahia-central": {
            name: "Umuahia Central",
            pollingUnits: [
              "PU 041 - Umuahia Central Market",
              "PU 042 - Umuahia Central Primary School",
              "PU 043 - Umuahia Central Community Hall",
              "PU 044 - Umuahia Central Health Center",
              "PU 045 - Umuahia Central Mosque",
              "PU 046 - Umuahia Central Post Office",
              "PU 047 - Umuahia Central Police Station",
              "PU 048 - Umuahia Central Fire Station"
            ]
          },
          "umuahia-east": {
            name: "Umuahia East",
            pollingUnits: [
              "PU 049 - Umuahia East Primary School",
              "PU 050 - Umuahia East Market",
              "PU 051 - Umuahia East Community Hall",
              "PU 052 - Umuahia East Health Center",
              "PU 053 - Umuahia East Mosque",
              "PU 054 - Umuahia East Church",
              "PU 055 - Umuahia East Post Office",
              "PU 056 - Umuahia East Police Station"
            ]
          }
        }
      },
      "umuahia-south": {
        name: "Umuahia South",
        wards: {
          "umuahia-south-central": {
            name: "Umuahia South Central",
            pollingUnits: [
              "PU 057 - Umuahia South Central Market",
              "PU 058 - Umuahia South Central Primary School",
              "PU 059 - Umuahia South Central Community Hall",
              "PU 060 - Umuahia South Central Health Center",
              "PU 061 - Umuahia South Central Mosque",
              "PU 062 - Umuahia South Central Post Office",
              "PU 063 - Umuahia South Central Police Station",
              "PU 064 - Umuahia South Central Fire Station"
            ]
          }
        }
      },
      "ukwa-east": {
        name: "Ukwa East",
        wards: {
          "ukwa-east-central": {
            name: "Ukwa East Central",
            pollingUnits: [
              "PU 065 - Ukwa East Central Market",
              "PU 066 - Ukwa East Central Primary School",
              "PU 067 - Ukwa East Central Community Hall",
              "PU 068 - Ukwa East Central Health Center",
              "PU 069 - Ukwa East Central Mosque",
              "PU 070 - Ukwa East Central Post Office",
              "PU 071 - Ukwa East Central Police Station",
              "PU 072 - Ukwa East Central Fire Station"
            ]
          }
        }
      },
      "ukwa-west": {
        name: "Ukwa West",
        wards: {
          "ukwa-west-central": {
            name: "Ukwa West Central",
            pollingUnits: [
              "PU 073 - Ukwa West Central Market",
              "PU 074 - Ukwa West Central Primary School",
              "PU 075 - Ukwa West Central Community Hall",
              "PU 076 - Ukwa West Central Health Center",
              "PU 077 - Ukwa West Central Mosque",
              "PU 078 - Ukwa West Central Post Office",
              "PU 079 - Ukwa West Central Police Station",
              "PU 080 - Ukwa West Central Fire Station"
            ]
          }
        }
      },
      "ugwunagbo": {
        name: "Ugwunagbo",
        wards: {
          "ugwunagbo-central": {
            name: "Ugwunagbo Central",
            pollingUnits: [
              "PU 081 - Ugwunagbo Central Market",
              "PU 082 - Ugwunagbo Central Primary School",
              "PU 083 - Ugwunagbo Central Community Hall",
              "PU 084 - Ugwunagbo Central Health Center",
              "PU 085 - Ugwunagbo Central Mosque",
              "PU 086 - Ugwunagbo Central Post Office",
              "PU 087 - Ugwunagbo Central Police Station",
              "PU 088 - Ugwunagbo Central Fire Station"
            ]
          }
        }
      },
      "obingwa": {
        name: "Obingwa",
        wards: {
          "obingwa-central": {
            name: "Obingwa Central",
            pollingUnits: [
              "PU 089 - Obingwa Central Market",
              "PU 090 - Obingwa Central Primary School",
              "PU 091 - Obingwa Central Community Hall",
              "PU 092 - Obingwa Central Health Center",
              "PU 093 - Obingwa Central Mosque",
              "PU 094 - Obingwa Central Post Office",
              "PU 095 - Obingwa Central Police Station",
              "PU 096 - Obingwa Central Fire Station"
            ]
          }
        }
      },
      "osisioma": {
        name: "Osisioma",
        wards: {
          "osisioma-central": {
            name: "Osisioma Central",
            pollingUnits: [
              "PU 097 - Osisioma Central Market",
              "PU 098 - Osisioma Central Primary School",
              "PU 099 - Osisioma Central Community Hall",
              "PU 100 - Osisioma Central Health Center",
              "PU 101 - Osisioma Central Mosque",
              "PU 102 - Osisioma Central Post Office",
              "PU 103 - Osisioma Central Police Station",
              "PU 104 - Osisioma Central Fire Station"
            ]
          }
        }
      },
      "ohafia": {
        name: "Ohafia",
        wards: {
          "ohafia-central": {
            name: "Ohafia Central",
            pollingUnits: [
              "PU 105 - Ohafia Central Market",
              "PU 106 - Ohafia Central Primary School",
              "PU 107 - Ohafia Central Community Hall",
              "PU 108 - Ohafia Central Health Center",
              "PU 109 - Ohafia Central Mosque",
              "PU 110 - Ohafia Central Post Office",
              "PU 111 - Ohafia Central Police Station",
              "PU 112 - Ohafia Central Fire Station"
            ]
          }
        }
      },
      "bende": {
        name: "Bende",
        wards: {
          "bende-central": {
            name: "Bende Central",
            pollingUnits: [
              "PU 113 - Bende Central Market",
              "PU 114 - Bende Central Primary School",
              "PU 115 - Bende Central Community Hall",
              "PU 116 - Bende Central Health Center",
              "PU 117 - Bende Central Mosque",
              "PU 118 - Bende Central Post Office",
              "PU 119 - Bende Central Police Station",
              "PU 120 - Bende Central Fire Station"
            ]
          }
        }
      },
      "aarochukwu": {
        name: "Arochukwu",
        wards: {
          "aarochukwu-central": {
            name: "Arochukwu Central",
            pollingUnits: [
              "PU 121 - Arochukwu Central Market",
              "PU 122 - Arochukwu Central Primary School",
              "PU 123 - Arochukwu Central Community Hall",
              "PU 124 - Arochukwu Central Health Center",
              "PU 125 - Arochukwu Central Mosque",
              "PU 126 - Arochukwu Central Post Office",
              "PU 127 - Arochukwu Central Police Station",
              "PU 128 - Arochukwu Central Fire Station"
            ]
          }
        }
      },
      "isiala-ngwa-north": {
        name: "Isiala Ngwa North",
        wards: {
          "isiala-ngwa-north-central": {
            name: "Isiala Ngwa North Central",
            pollingUnits: [
              "PU 129 - Isiala Ngwa North Central Market",
              "PU 130 - Isiala Ngwa North Central Primary School",
              "PU 131 - Isiala Ngwa North Central Community Hall",
              "PU 132 - Isiala Ngwa North Central Health Center",
              "PU 133 - Isiala Ngwa North Central Mosque",
              "PU 134 - Isiala Ngwa North Central Post Office",
              "PU 135 - Isiala Ngwa North Central Police Station",
              "PU 136 - Isiala Ngwa North Central Fire Station"
            ]
          }
        }
      },
      "isiala-ngwa-south": {
        name: "Isiala Ngwa South",
        wards: {
          "isiala-ngwa-south-central": {
            name: "Isiala Ngwa South Central",
            pollingUnits: [
              "PU 137 - Isiala Ngwa South Central Market",
              "PU 138 - Isiala Ngwa South Central Primary School",
              "PU 139 - Isiala Ngwa South Central Community Hall",
              "PU 140 - Isiala Ngwa South Central Health Center",
              "PU 141 - Isiala Ngwa South Central Mosque",
              "PU 142 - Isiala Ngwa South Central Post Office",
              "PU 143 - Isiala Ngwa South Central Police Station",
              "PU 144 - Isiala Ngwa South Central Fire Station"
            ]
          }
        }
      },
      "isukwuato": {
        name: "Isuikwuato",
        wards: {
          "isukwuato-central": {
            name: "Isuikwuato Central",
            pollingUnits: [
              "PU 145 - Isuikwuato Central Market",
              "PU 146 - Isuikwuato Central Primary School",
              "PU 147 - Isuikwuato Central Community Hall",
              "PU 148 - Isuikwuato Central Health Center",
              "PU 149 - Isuikwuato Central Mosque",
              "PU 150 - Isuikwuato Central Post Office",
              "PU 151 - Isuikwuato Central Police Station",
              "PU 152 - Isuikwuato Central Fire Station"
            ]
          }
        }
      }
    }
  },
  adamawa: {
    name: "Adamawa",
    lgas: {
      "yola-north": {
        name: "Yola North",
        wards: {
          "yola-north-central": {
            name: "Yola North Central",
            pollingUnits: [
              "PU 001 - Yola North Central Market",
              "PU 002 - Yola North Central Primary School",
              "PU 003 - Yola North Central Community Hall",
              "PU 004 - Yola North Central Health Center",
              "PU 005 - Yola North Central Mosque",
              "PU 006 - Yola North Central Post Office",
              "PU 007 - Yola North Central Police Station",
              "PU 008 - Yola North Central Fire Station"
            ]
          },
          "yola-north-east": {
            name: "Yola North East",
            pollingUnits: [
              "PU 009 - Yola North East Primary School",
              "PU 010 - Yola North East Market",
              "PU 011 - Yola North East Community Hall",
              "PU 012 - Yola North East Health Center",
              "PU 013 - Yola North East Mosque",
              "PU 014 - Yola North East Church",
              "PU 015 - Yola North East Post Office",
              "PU 016 - Yola North East Police Station"
            ]
          }
        }
      },
      "yola-south": {
        name: "Yola South",
        wards: {
          "yola-south-central": {
            name: "Yola South Central",
            pollingUnits: [
              "PU 017 - Yola South Central Market",
              "PU 018 - Yola South Central Primary School",
              "PU 019 - Yola South Central Community Hall",
              "PU 020 - Yola South Central Health Center",
              "PU 021 - Yola South Central Mosque",
              "PU 022 - Yola South Central Post Office",
              "PU 023 - Yola South Central Police Station",
              "PU 024 - Yola South Central Fire Station"
            ]
          }
        }
      },
      "girei": {
        name: "Girei",
        wards: {
          "girei-central": {
            name: "Girei Central",
            pollingUnits: [
              "PU 025 - Girei Central Market",
              "PU 026 - Girei Central Primary School",
              "PU 027 - Girei Central Community Hall",
              "PU 028 - Girei Central Health Center",
              "PU 029 - Girei Central Mosque",
              "PU 030 - Girei Central Post Office",
              "PU 031 - Girei Central Police Station",
              "PU 032 - Girei Central Fire Station"
            ]
          }
        }
      },
      "gombi": {
        name: "Gombi",
        wards: {
          "gombi-central": {
            name: "Gombi Central",
            pollingUnits: [
              "PU 033 - Gombi Central Market",
              "PU 034 - Gombi Central Primary School",
              "PU 035 - Gombi Central Community Hall",
              "PU 036 - Gombi Central Health Center",
              "PU 037 - Gombi Central Mosque",
              "PU 038 - Gombi Central Post Office",
              "PU 039 - Gombi Central Police Station",
              "PU 040 - Gombi Central Fire Station"
            ]
          }
        }
      },
      "hong": {
        name: "Hong",
        wards: {
          "hong-central": {
            name: "Hong Central",
            pollingUnits: [
              "PU 041 - Hong Central Market",
              "PU 042 - Hong Central Primary School",
              "PU 043 - Hong Central Community Hall",
              "PU 044 - Hong Central Health Center",
              "PU 045 - Hong Central Mosque",
              "PU 046 - Hong Central Post Office",
              "PU 047 - Hong Central Police Station",
              "PU 048 - Hong Central Fire Station"
            ]
          }
        }
      },
      "jada": {
        name: "Jada",
        wards: {
          "jada-central": {
            name: "Jada Central",
            pollingUnits: [
              "PU 049 - Jada Central Market",
              "PU 050 - Jada Central Primary School",
              "PU 051 - Jada Central Community Hall",
              "PU 052 - Jada Central Health Center",
              "PU 053 - Jada Central Mosque",
              "PU 054 - Jada Central Post Office",
              "PU 055 - Jada Central Police Station",
              "PU 056 - Jada Central Fire Station"
            ]
          }
        }
      },
      "lamurde": {
        name: "Lamurde",
        wards: {
          "lamurde-central": {
            name: "Lamurde Central",
            pollingUnits: [
              "PU 057 - Lamurde Central Market",
              "PU 058 - Lamurde Central Primary School",
              "PU 059 - Lamurde Central Community Hall",
              "PU 060 - Lamurde Central Health Center",
              "PU 061 - Lamurde Central Mosque",
              "PU 062 - Lamurde Central Post Office",
              "PU 063 - Lamurde Central Police Station",
              "PU 064 - Lamurde Central Fire Station"
            ]
          }
        }
      },
      "madagali": {
        name: "Madagali",
        wards: {
          "madagali-central": {
            name: "Madagali Central",
            pollingUnits: [
              "PU 065 - Madagali Central Market",
              "PU 066 - Madagali Central Primary School",
              "PU 067 - Madagali Central Community Hall",
              "PU 068 - Madagali Central Health Center",
              "PU 069 - Madagali Central Mosque",
              "PU 070 - Madagali Central Post Office",
              "PU 071 - Madagali Central Police Station",
              "PU 072 - Madagali Central Fire Station"
            ]
          }
        }
      },
      "maiha": {
        name: "Maiha",
        wards: {
          "maiha-central": {
            name: "Maiha Central",
            pollingUnits: [
              "PU 073 - Maiha Central Market",
              "PU 074 - Maiha Central Primary School",
              "PU 075 - Maiha Central Community Hall",
              "PU 076 - Maiha Central Health Center",
              "PU 077 - Maiha Central Mosque",
              "PU 078 - Maiha Central Post Office",
              "PU 079 - Maiha Central Police Station",
              "PU 080 - Maiha Central Fire Station"
            ]
          }
        }
      },
      "mayo-belwa": {
        name: "Mayo Belwa",
        wards: {
          "mayo-belwa-central": {
            name: "Mayo Belwa Central",
            pollingUnits: [
              "PU 081 - Mayo Belwa Central Market",
              "PU 082 - Mayo Belwa Central Primary School",
              "PU 083 - Mayo Belwa Central Community Hall",
              "PU 084 - Mayo Belwa Central Health Center",
              "PU 085 - Mayo Belwa Central Mosque",
              "PU 086 - Mayo Belwa Central Post Office",
              "PU 087 - Mayo Belwa Central Police Station",
              "PU 088 - Mayo Belwa Central Fire Station"
            ]
          }
        }
      },
      "michika": {
        name: "Michika",
        wards: {
          "michika-central": {
            name: "Michika Central",
            pollingUnits: [
              "PU 089 - Michika Central Market",
              "PU 090 - Michika Central Primary School",
              "PU 091 - Michika Central Community Hall",
              "PU 092 - Michika Central Health Center",
              "PU 093 - Michika Central Mosque",
              "PU 094 - Michika Central Post Office",
              "PU 095 - Michika Central Police Station",
              "PU 096 - Michika Central Fire Station"
            ]
          }
        }
      },
      "mubi-north": {
        name: "Mubi North",
        wards: {
          "mubi-north-central": {
            name: "Mubi North Central",
            pollingUnits: [
              "PU 097 - Mubi North Central Market",
              "PU 098 - Mubi North Central Primary School",
              "PU 099 - Mubi North Central Community Hall",
              "PU 100 - Mubi North Central Health Center",
              "PU 101 - Mubi North Central Mosque",
              "PU 102 - Mubi North Central Post Office",
              "PU 103 - Mubi North Central Police Station",
              "PU 104 - Mubi North Central Fire Station"
            ]
          }
        }
      },
      "mubi-south": {
        name: "Mubi South",
        wards: {
          "mubi-south-central": {
            name: "Mubi South Central",
            pollingUnits: [
              "PU 105 - Mubi South Central Market",
              "PU 106 - Mubi South Central Primary School",
              "PU 107 - Mubi South Central Community Hall",
              "PU 108 - Mubi South Central Health Center",
              "PU 109 - Mubi South Central Mosque",
              "PU 110 - Mubi South Central Post Office",
              "PU 111 - Mubi South Central Police Station",
              "PU 112 - Mubi South Central Fire Station"
            ]
          }
        }
      },
      "numan": {
        name: "Numan",
        wards: {
          "numan-central": {
            name: "Numan Central",
            pollingUnits: [
              "PU 113 - Numan Central Market",
              "PU 114 - Numan Central Primary School",
              "PU 115 - Numan Central Community Hall",
              "PU 116 - Numan Central Health Center",
              "PU 117 - Numan Central Mosque",
              "PU 118 - Numan Central Post Office",
              "PU 119 - Numan Central Police Station",
              "PU 120 - Numan Central Fire Station"
            ]
          }
        }
      },
      "shelleng": {
        name: "Shelleng",
        wards: {
          "shelleng-central": {
            name: "Shelleng Central",
            pollingUnits: [
              "PU 121 - Shelleng Central Market",
              "PU 122 - Shelleng Central Primary School",
              "PU 123 - Shelleng Central Community Hall",
              "PU 124 - Shelleng Central Health Center",
              "PU 125 - Shelleng Central Mosque",
              "PU 126 - Shelleng Central Post Office",
              "PU 127 - Shelleng Central Police Station",
              "PU 128 - Shelleng Central Fire Station"
            ]
          }
        }
      },
      "song": {
        name: "Song",
        wards: {
          "song-central": {
            name: "Song Central",
            pollingUnits: [
              "PU 129 - Song Central Market",
              "PU 130 - Song Central Primary School",
              "PU 131 - Song Central Community Hall",
              "PU 132 - Song Central Health Center",
              "PU 133 - Song Central Mosque",
              "PU 134 - Song Central Post Office",
              "PU 135 - Song Central Police Station",
              "PU 136 - Song Central Fire Station"
            ]
          }
        }
      },
      "toungo": {
        name: "Toungo",
        wards: {
          "toungo-central": {
            name: "Toungo Central",
            pollingUnits: [
              "PU 137 - Toungo Central Market",
              "PU 138 - Toungo Central Primary School",
              "PU 139 - Toungo Central Community Hall",
              "PU 140 - Toungo Central Health Center",
              "PU 141 - Toungo Central Mosque",
              "PU 142 - Toungo Central Post Office",
              "PU 143 - Toungo Central Police Station",
              "PU 144 - Toungo Central Fire Station"
            ]
          }
        }
      }
    }
  },
  akwaIbom: {
    name: "Akwa Ibom",
    lgas: {
      "uyo": {
        name: "Uyo",
        wards: {
          "uyo-central": {
            name: "Uyo Central",
            pollingUnits: [
              "PU 001 - Uyo Central Market",
              "PU 002 - Uyo Central Primary School",
              "PU 003 - Uyo Central Community Hall",
              "PU 004 - Uyo Central Health Center",
              "PU 005 - Uyo Central Mosque",
              "PU 006 - Uyo Central Post Office",
              "PU 007 - Uyo Central Police Station",
              "PU 008 - Uyo Central Fire Station"
            ]
          }
        }
      },
      "etinan": {
        name: "Etinan",
        wards: {
          "etinan-central": {
            name: "Etinan Central",
            pollingUnits: [
              "PU 009 - Etinan Central Market",
              "PU 010 - Etinan Central Primary School",
              "PU 011 - Etinan Central Community Hall",
              "PU 012 - Etinan Central Health Center",
              "PU 013 - Etinan Central Mosque",
              "PU 014 - Etinan Central Post Office",
              "PU 015 - Etinan Central Police Station",
              "PU 016 - Etinan Central Fire Station"
            ]
          }
        }
      },
      "ikot-ekpene": {
        name: "Ikot Ekpene",
        wards: {
          "ikot-ekpene-central": {
            name: "Ikot Ekpene Central",
            pollingUnits: [
              "PU 017 - Ikot Ekpene Central Market",
              "PU 018 - Ikot Ekpene Central Primary School",
              "PU 019 - Ikot Ekpene Central Community Hall",
              "PU 020 - Ikot Ekpene Central Health Center",
              "PU 021 - Ikot Ekpene Central Mosque",
              "PU 022 - Ikot Ekpene Central Post Office",
              "PU 023 - Ikot Ekpene Central Police Station",
              "PU 024 - Ikot Ekpene Central Fire Station"
            ]
          }
        }
      },
      "abak": {
        name: "Abak",
        wards: {
          "abak-central": {
            name: "Abak Central",
            pollingUnits: [
              "PU 025 - Abak Central Market",
              "PU 026 - Abak Central Primary School",
              "PU 027 - Abak Central Community Hall",
              "PU 028 - Abak Central Health Center",
              "PU 029 - Abak Central Mosque",
              "PU 030 - Abak Central Post Office",
              "PU 031 - Abak Central Police Station",
              "PU 032 - Abak Central Fire Station"
            ]
          }
        }
      },
      "essien-udim": {
        name: "Essien Udim",
        wards: {
          "essien-udim-central": {
            name: "Essien Udim Central",
            pollingUnits: [
              "PU 033 - Essien Udim Central Market",
              "PU 034 - Essien Udim Central Primary School",
              "PU 035 - Essien Udim Central Community Hall",
              "PU 036 - Essien Udim Central Health Center",
              "PU 037 - Essien Udim Central Mosque",
              "PU 038 - Essien Udim Central Post Office",
              "PU 039 - Essien Udim Central Police Station",
              "PU 040 - Essien Udim Central Fire Station"
            ]
          }
        }
      },
      "obot-akara": {
        name: "Obot Akara",
        wards: {
          "obot-akara-central": {
            name: "Obot Akara Central",
            pollingUnits: [
              "PU 041 - Obot Akara Central Market",
              "PU 042 - Obot Akara Central Primary School",
              "PU 043 - Obot Akara Central Community Hall",
              "PU 044 - Obot Akara Central Health Center",
              "PU 045 - Obot Akara Central Mosque",
              "PU 046 - Obot Akara Central Post Office",
              "PU 047 - Obot Akara Central Police Station",
              "PU 048 - Obot Akara Central Fire Station"
            ]
          }
        }
      },
      "nsit-ubium": {
        name: "Nsit Ubium",
        wards: {
          "nsit-ubium-central": {
            name: "Nsit Ubium Central",
            pollingUnits: [
              "PU 049 - Nsit Ubium Central Market",
              "PU 050 - Nsit Ubium Central Primary School",
              "PU 051 - Nsit Ubium Central Community Hall",
              "PU 052 - Nsit Ubium Central Health Center",
              "PU 053 - Nsit Ubium Central Mosque",
              "PU 054 - Nsit Ubium Central Post Office",
              "PU 055 - Nsit Ubium Central Police Station",
              "PU 056 - Nsit Ubium Central Fire Station"
            ]
          }
        }
      },
      "nsit-atai": {
        name: "Nsit Atai",
        wards: {
          "nsit-atai-central": {
            name: "Nsit Atai Central",
            pollingUnits: [
              "PU 057 - Nsit Atai Central Market",
              "PU 058 - Nsit Atai Central Primary School",
              "PU 059 - Nsit Atai Central Community Hall",
              "PU 060 - Nsit Atai Central Health Center",
              "PU 061 - Nsit Atai Central Mosque",
              "PU 062 - Nsit Atai Central Post Office",
              "PU 063 - Nsit Atai Central Police Station",
              "PU 064 - Nsit Atai Central Fire Station"
            ]
          }
        }
      },
      "mkpat-enin": {
        name: "Mkpat Enin",
        wards: {
          "mkpat-enin-central": {
            name: "Mkpat Enin Central",
            pollingUnits: [
              "PU 065 - Mkpat Enin Central Market",
              "PU 066 - Mkpat Enin Central Primary School",
              "PU 067 - Mkpat Enin Central Community Hall",
              "PU 068 - Mkpat Enin Central Health Center",
              "PU 069 - Mkpat Enin Central Mosque",
              "PU 070 - Mkpat Enin Central Post Office",
              "PU 071 - Mkpat Enin Central Police Station",
              "PU 072 - Mkpat Enin Central Fire Station"
            ]
          }
        }
      },
      "ikot-abasi": {
        name: "Ikot Abasi",
        wards: {
          "ikot-abasi-central": {
            name: "Ikot Abasi Central",
            pollingUnits: [
              "PU 073 - Ikot Abasi Central Market",
              "PU 074 - Ikot Abasi Central Primary School",
              "PU 075 - Ikot Abasi Central Community Hall",
              "PU 076 - Ikot Abasi Central Health Center",
              "PU 077 - Ikot Abasi Central Mosque",
              "PU 078 - Ikot Abasi Central Post Office",
              "PU 079 - Ikot Abasi Central Police Station",
              "PU 080 - Ikot Abasi Central Fire Station"
            ]
          }
        }
      },
      "eastern-obolo": {
        name: "Eastern Obolo",
        wards: {
          "eastern-obolo-central": {
            name: "Eastern Obolo Central",
            pollingUnits: [
              "PU 081 - Eastern Obolo Central Market",
              "PU 082 - Eastern Obolo Central Primary School",
              "PU 083 - Eastern Obolo Central Community Hall",
              "PU 084 - Eastern Obolo Central Health Center",
              "PU 085 - Eastern Obolo Central Mosque",
              "PU 086 - Eastern Obolo Central Post Office",
              "PU 087 - Eastern Obolo Central Police Station",
              "PU 088 - Eastern Obolo Central Fire Station"
            ]
          }
        }
      },
      "onyong": {
        name: "Onyong",
        wards: {
          "onyong-central": {
            name: "Onyong Central",
            pollingUnits: [
              "PU 089 - Onyong Central Market",
              "PU 090 - Onyong Central Primary School",
              "PU 091 - Onyong Central Community Hall",
              "PU 092 - Onyong Central Health Center",
              "PU 093 - Onyong Central Mosque",
              "PU 094 - Onyong Central Post Office",
              "PU 095 - Onyong Central Police Station",
              "PU 096 - Onyong Central Fire Station"
            ]
          }
        }
      },
      "okobo": {
        name: "Okobo",
        wards: {
          "okobo-central": {
            name: "Okobo Central",
            pollingUnits: [
              "PU 097 - Okobo Central Market",
              "PU 098 - Okobo Central Primary School",
              "PU 099 - Okobo Central Community Hall",
              "PU 100 - Okobo Central Health Center",
              "PU 101 - Okobo Central Mosque",
              "PU 102 - Okobo Central Post Office",
              "PU 103 - Okobo Central Police Station",
              "PU 104 - Okobo Central Fire Station"
            ]
          }
        }
      },
      "urue-offong-oruko": {
        name: "Urue Offong Oruko",
        wards: {
          "urue-offong-oruko-central": {
            name: "Urue Offong Oruko Central",
            pollingUnits: [
              "PU 105 - Urue Offong Oruko Central Market",
              "PU 106 - Urue Offong Oruko Central Primary School",
              "PU 107 - Urue Offong Oruko Central Community Hall",
              "PU 108 - Urue Offong Oruko Central Health Center",
              "PU 109 - Urue Offong Oruko Central Mosque",
              "PU 110 - Urue Offong Oruko Central Post Office",
              "PU 111 - Urue Offong Oruko Central Police Station",
              "PU 112 - Urue Offong Oruko Central Fire Station"
            ]
          }
        }
      },
      "udung-uko": {
        name: "Udung Uko",
        wards: {
          "udung-uko-central": {
            name: "Udung Uko Central",
            pollingUnits: [
              "PU 113 - Udung Uko Central Market",
              "PU 114 - Udung Uko Central Primary School",
              "PU 115 - Udung Uko Central Community Hall",
              "PU 116 - Udung Uko Central Health Center",
              "PU 117 - Udung Uko Central Mosque",
              "PU 118 - Udung Uko Central Post Office",
              "PU 119 - Udung Uko Central Police Station",
              "PU 120 - Udung Uko Central Fire Station"
            ]
          }
        }
      }
    }
  },
  anambra: {
    name: "Anambra",
    lgas: {
      "awka-south": {
        name: "Awka South",
        wards: {
          "awka-south-central": {
            name: "Awka South Central",
            pollingUnits: [
              "PU 001 - Awka South Central Market",
              "PU 002 - Awka South Central Primary School",
              "PU 003 - Awka South Central Community Hall",
              "PU 004 - Awka South Central Health Center",
              "PU 005 - Awka South Central Mosque",
              "PU 006 - Awka South Central Post Office",
              "PU 007 - Awka South Central Police Station",
              "PU 008 - Awka South Central Fire Station"
            ]
          }
        }
      },
      "awka-north": {
        name: "Awka North",
        wards: {
          "awka-north-central": {
            name: "Awka North Central",
            pollingUnits: [
              "PU 009 - Awka North Central Market",
              "PU 010 - Awka North Central Primary School",
              "PU 011 - Awka North Central Community Hall",
              "PU 012 - Awka North Central Health Center",
              "PU 013 - Awka North Central Mosque",
              "PU 014 - Awka North Central Post Office",
              "PU 015 - Awka North Central Police Station",
              "PU 016 - Awka North Central Fire Station"
            ]
          }
        }
      },
      "nnewi-north": {
        name: "Nnewi North",
        wards: {
          "nnewi-north-central": {
            name: "Nnewi North Central",
            pollingUnits: [
              "PU 017 - Nnewi North Central Market",
              "PU 018 - Nnewi North Central Primary School",
              "PU 019 - Nnewi North Central Community Hall",
              "PU 020 - Nnewi North Central Health Center",
              "PU 021 - Nnewi North Central Mosque",
              "PU 022 - Nnewi North Central Post Office",
              "PU 023 - Nnewi North Central Police Station",
              "PU 024 - Nnewi North Central Fire Station"
            ]
          }
        }
      },
      "nnewi-south": {
        name: "Nnewi South",
        wards: {
          "nnewi-south-central": {
            name: "Nnewi South Central",
            pollingUnits: [
              "PU 025 - Nnewi South Central Market",
              "PU 026 - Nnewi South Central Primary School",
              "PU 027 - Nnewi South Central Community Hall",
              "PU 028 - Nnewi South Central Health Center",
              "PU 029 - Nnewi South Central Mosque",
              "PU 030 - Nnewi South Central Post Office",
              "PU 031 - Nnewi South Central Police Station",
              "PU 032 - Nnewi South Central Fire Station"
            ]
          }
        }
      },
      "ekwusigo": {
        name: "Ekwusigo",
        wards: {
          "ekwusigo-central": {
            name: "Ekwusigo Central",
            pollingUnits: [
              "PU 033 - Ekwusigo Central Market",
              "PU 034 - Ekwusigo Central Primary School",
              "PU 035 - Ekwusigo Central Community Hall",
              "PU 036 - Ekwusigo Central Health Center",
              "PU 037 - Ekwusigo Central Mosque",
              "PU 038 - Ekwusigo Central Post Office",
              "PU 039 - Ekwusigo Central Police Station",
              "PU 040 - Ekwusigo Central Fire Station"
            ]
          }
        }
      },
      "idemili-north": {
        name: "Idemili North",
        wards: {
          "idemili-north-central": {
            name: "Idemili North Central",
            pollingUnits: [
              "PU 041 - Idemili North Central Market",
              "PU 042 - Idemili North Central Primary School",
              "PU 043 - Idemili North Central Community Hall",
              "PU 044 - Idemili North Central Health Center",
              "PU 045 - Idemili North Central Mosque",
              "PU 046 - Idemili North Central Post Office",
              "PU 047 - Idemili North Central Police Station",
              "PU 048 - Idemili North Central Fire Station"
            ]
          }
        }
      },
      "idemili-south": {
        name: "Idemili South",
        wards: {
          "idemili-south-central": {
            name: "Idemili South Central",
            pollingUnits: [
              "PU 049 - Idemili South Central Market",
              "PU 050 - Idemili South Central Primary School",
              "PU 051 - Idemili South Central Community Hall",
              "PU 052 - Idemili South Central Health Center",
              "PU 053 - Idemili South Central Mosque",
              "PU 054 - Idemili South Central Post Office",
              "PU 055 - Idemili South Central Police Station",
              "PU 056 - Idemili South Central Fire Station"
            ]
          }
        }
      },
      "njikoka": {
        name: "Njikoka",
        wards: {
          "njikoka-central": {
            name: "Njikoka Central",
            pollingUnits: [
              "PU 057 - Njikoka Central Market",
              "PU 058 - Njikoka Central Primary School",
              "PU 059 - Njikoka Central Community Hall",
              "PU 060 - Njikoka Central Health Center",
              "PU 061 - Njikoka Central Mosque",
              "PU 062 - Njikoka Central Post Office",
              "PU 063 - Njikoka Central Police Station",
              "PU 064 - Njikoka Central Fire Station"
            ]
          }
        }
      },
      "dunukofia": {
        name: "Dunukofia",
        wards: {
          "dunukofia-central": {
            name: "Dunukofia Central",
            pollingUnits: [
              "PU 065 - Dunukofia Central Market",
              "PU 066 - Dunukofia Central Primary School",
              "PU 067 - Dunukofia Central Community Hall",
              "PU 068 - Dunukofia Central Health Center",
              "PU 069 - Dunukofia Central Mosque",
              "PU 070 - Dunukofia Central Post Office",
              "PU 071 - Dunukofia Central Police Station",
              "PU 072 - Dunukofia Central Fire Station"
            ]
          }
        }
      },
      "anaocha": {
        name: "Anaocha",
        wards: {
          "anaocha-central": {
            name: "Anaocha Central",
            pollingUnits: [
              "PU 073 - Anaocha Central Market",
              "PU 074 - Anaocha Central Primary School",
              "PU 075 - Anaocha Central Community Hall",
              "PU 076 - Anaocha Central Health Center",
              "PU 077 - Anaocha Central Mosque",
              "PU 078 - Anaocha Central Post Office",
              "PU 079 - Anaocha Central Police Station",
              "PU 080 - Anaocha Central Fire Station"
            ]
          }
        }
      },
      "orumba-north": {
        name: "Orumba North",
        wards: {
          "orumba-north-central": {
            name: "Orumba North Central",
            pollingUnits: [
              "PU 081 - Orumba North Central Market",
              "PU 082 - Orumba North Central Primary School",
              "PU 083 - Orumba North Central Community Hall",
              "PU 084 - Orumba North Central Health Center",
              "PU 085 - Orumba North Central Mosque",
              "PU 086 - Orumba North Central Post Office",
              "PU 087 - Orumba North Central Police Station",
              "PU 088 - Orumba North Central Fire Station"
            ]
          }
        }
      },
      "orumba-south": {
        name: "Orumba South",
        wards: {
          "orumba-south-central": {
            name: "Orumba South Central",
            pollingUnits: [
              "PU 089 - Orumba South Central Market",
              "PU 090 - Orumba South Central Primary School",
              "PU 091 - Orumba South Central Community Hall",
              "PU 092 - Orumba South Central Health Center",
              "PU 093 - Orumba South Central Mosque",
              "PU 094 - Orumba South Central Post Office",
              "PU 095 - Orumba South Central Police Station",
              "PU 096 - Orumba South Central Fire Station"
            ]
          }
        }
      },
      "ayamelum": {
        name: "Ayamelum",
        wards: {
          "ayamelum-central": {
            name: "Ayamelum Central",
            pollingUnits: [
              "PU 097 - Ayamelum Central Market",
              "PU 098 - Ayamelum Central Primary School",
              "PU 099 - Ayamelum Central Community Hall",
              "PU 100 - Ayamelum Central Health Center",
              "PU 101 - Ayamelum Central Mosque",
              "PU 102 - Ayamelum Central Post Office",
              "PU 103 - Ayamelum Central Police Station",
              "PU 104 - Ayamelum Central Fire Station"
            ]
          }
        }
      },
      "ogbaru": {
        name: "Ogbaru",
        wards: {
          "ogbaru-central": {
            name: "Ogbaru Central",
            pollingUnits: [
              "PU 105 - Ogbaru Central Market",
              "PU 106 - Ogbaru Central Primary School",
              "PU 107 - Ogbaru Central Community Hall",
              "PU 108 - Ogbaru Central Health Center",
              "PU 109 - Ogbaru Central Mosque",
              "PU 110 - Ogbaru Central Post Office",
              "PU 111 - Ogbaru Central Police Station",
              "PU 112 - Ogbaru Central Fire Station"
            ]
          }
        }
      },
      "onitsha-north": {
        name: "Onitsha North",
        wards: {
          "onitsha-north-central": {
            name: "Onitsha North Central",
            pollingUnits: [
              "PU 113 - Onitsha North Central Market",
              "PU 114 - Onitsha North Central Primary School",
              "PU 115 - Onitsha North Central Community Hall",
              "PU 116 - Onitsha North Central Health Center",
              "PU 117 - Onitsha North Central Mosque",
              "PU 118 - Onitsha North Central Post Office",
              "PU 119 - Onitsha North Central Police Station",
              "PU 120 - Onitsha North Central Fire Station"
            ]
          }
        }
      },
      "onitsha-south": {
        name: "Onitsha South",
        wards: {
          "onitsha-south-central": {
            name: "Onitsha South Central",
            pollingUnits: [
              "PU 121 - Onitsha South Central Market",
              "PU 122 - Onitsha South Central Primary School",
              "PU 123 - Onitsha South Central Community Hall",
              "PU 124 - Onitsha South Central Health Center",
              "PU 125 - Onitsha South Central Mosque",
              "PU 126 - Onitsha South Central Post Office",
              "PU 127 - Onitsha South Central Police Station",
              "PU 128 - Onitsha South Central Fire Station"
            ]
          }
        }
      }
    }
  },
  bauchi: {
    name: "Bauchi",
    lgas: {
      "bauchi": {
        name: "Bauchi",
        wards: {
          "bauchi-central": {
            name: "Bauchi Central",
            pollingUnits: [
              "PU 001 - Bauchi Central Market",
              "PU 002 - Bauchi Central Primary School",
              "PU 003 - Bauchi Central Community Hall",
              "PU 004 - Bauchi Central Health Center",
              "PU 005 - Bauchi Central Mosque",
              "PU 006 - Bauchi Central Post Office",
              "PU 007 - Bauchi Central Police Station",
              "PU 008 - Bauchi Central Fire Station"
            ]
          }
        }
      },
      "alkaleri": {
        name: "Alkaleri",
        wards: {
          "alkaleri-central": {
            name: "Alkaleri Central",
            pollingUnits: [
              "PU 009 - Alkaleri Central Market",
              "PU 010 - Alkaleri Central Primary School",
              "PU 011 - Alkaleri Central Community Hall",
              "PU 012 - Alkaleri Central Health Center",
              "PU 013 - Alkaleri Central Mosque",
              "PU 014 - Alkaleri Central Post Office",
              "PU 015 - Alkaleri Central Police Station",
              "PU 016 - Alkaleri Central Fire Station"
            ]
          }
        }
      },
      "bogoro": {
        name: "Bogoro",
        wards: {
          "bogoro-central": {
            name: "Bogoro Central",
            pollingUnits: [
              "PU 017 - Bogoro Central Market",
              "PU 018 - Bogoro Central Primary School",
              "PU 019 - Bogoro Central Community Hall",
              "PU 020 - Bogoro Central Health Center",
              "PU 021 - Bogoro Central Mosque",
              "PU 022 - Bogoro Central Post Office",
              "PU 023 - Bogoro Central Police Station",
              "PU 024 - Bogoro Central Fire Station"
            ]
          }
        }
      },
      "dambam": {
        name: "Dambam",
        wards: {
          "dambam-central": {
            name: "Dambam Central",
            pollingUnits: [
              "PU 025 - Dambam Central Market",
              "PU 026 - Dambam Central Primary School",
              "PU 027 - Dambam Central Community Hall",
              "PU 028 - Dambam Central Health Center",
              "PU 029 - Dambam Central Mosque",
              "PU 030 - Dambam Central Post Office",
              "PU 031 - Dambam Central Police Station",
              "PU 032 - Dambam Central Fire Station"
            ]
          }
        }
      },
      "darazo": {
        name: "Darazo",
        wards: {
          "darazo-central": {
            name: "Darazo Central",
            pollingUnits: [
              "PU 033 - Darazo Central Market",
              "PU 034 - Darazo Central Primary School",
              "PU 035 - Darazo Central Community Hall",
              "PU 036 - Darazo Central Health Center",
              "PU 037 - Darazo Central Mosque",
              "PU 038 - Darazo Central Post Office",
              "PU 039 - Darazo Central Police Station",
              "PU 040 - Darazo Central Fire Station"
            ]
          }
        }
      },
      "dass": {
        name: "Dass",
        wards: {
          "dass-central": {
            name: "Dass Central",
            pollingUnits: [
              "PU 041 - Dass Central Market",
              "PU 042 - Dass Central Primary School",
              "PU 043 - Dass Central Community Hall",
              "PU 044 - Dass Central Health Center",
              "PU 045 - Dass Central Mosque",
              "PU 046 - Dass Central Post Office",
              "PU 047 - Dass Central Police Station",
              "PU 048 - Dass Central Fire Station"
            ]
          }
        }
      },
      "gamawa": {
        name: "Gamawa",
        wards: {
          "gamawa-central": {
            name: "Gamawa Central",
            pollingUnits: [
              "PU 049 - Gamawa Central Market",
              "PU 050 - Gamawa Central Primary School",
              "PU 051 - Gamawa Central Community Hall",
              "PU 052 - Gamawa Central Health Center",
              "PU 053 - Gamawa Central Mosque",
              "PU 054 - Gamawa Central Post Office",
              "PU 055 - Gamawa Central Police Station",
              "PU 056 - Gamawa Central Fire Station"
            ]
          }
        }
      },
      "ganjuwa": {
        name: "Ganjuwa",
        wards: {
          "ganjuwa-central": {
            name: "Ganjuwa Central",
            pollingUnits: [
              "PU 057 - Ganjuwa Central Market",
              "PU 058 - Ganjuwa Central Primary School",
              "PU 059 - Ganjuwa Central Community Hall",
              "PU 060 - Ganjuwa Central Health Center",
              "PU 061 - Ganjuwa Central Mosque",
              "PU 062 - Ganjuwa Central Post Office",
              "PU 063 - Ganjuwa Central Police Station",
              "PU 064 - Ganjuwa Central Fire Station"
            ]
          }
        }
      },
      "giade": {
        name: "Giade",
        wards: {
          "giade-central": {
            name: "Giade Central",
            pollingUnits: [
              "PU 065 - Giade Central Market",
              "PU 066 - Giade Central Primary School",
              "PU 067 - Giade Central Community Hall",
              "PU 068 - Giade Central Health Center",
              "PU 069 - Giade Central Mosque",
              "PU 070 - Giade Central Post Office",
              "PU 071 - Giade Central Police Station",
              "PU 072 - Giade Central Fire Station"
            ]
          }
        }
      },
      "itas-gadau": {
        name: "Itas Gadau",
        wards: {
          "itas-gadau-central": {
            name: "Itas Gadau Central",
            pollingUnits: [
              "PU 073 - Itas Gadau Central Market",
              "PU 074 - Itas Gadau Central Primary School",
              "PU 075 - Itas Gadau Central Community Hall",
              "PU 076 - Itas Gadau Central Health Center",
              "PU 077 - Itas Gadau Central Mosque",
              "PU 078 - Itas Gadau Central Post Office",
              "PU 079 - Itas Gadau Central Police Station",
              "PU 080 - Itas Gadau Central Fire Station"
            ]
          }
        }
      },
      "jamaare": {
        name: "Jamaare",
        wards: {
          "jamaare-central": {
            name: "Jamaare Central",
            pollingUnits: [
              "PU 081 - Jamaare Central Market",
              "PU 082 - Jamaare Central Primary School",
              "PU 083 - Jamaare Central Community Hall",
              "PU 084 - Jamaare Central Health Center",
              "PU 085 - Jamaare Central Mosque",
              "PU 086 - Jamaare Central Post Office",
              "PU 087 - Jamaare Central Police Station",
              "PU 088 - Jamaare Central Fire Station"
            ]
          }
        }
      },
      "katagum": {
        name: "Katagum",
        wards: {
          "katagum-central": {
            name: "Katagum Central",
            pollingUnits: [
              "PU 089 - Katagum Central Market",
              "PU 090 - Katagum Central Primary School",
              "PU 091 - Katagum Central Community Hall",
              "PU 092 - Katagum Central Health Center",
              "PU 093 - Katagum Central Mosque",
              "PU 094 - Katagum Central Post Office",
              "PU 095 - Katagum Central Police Station",
              "PU 096 - Katagum Central Fire Station"
            ]
          }
        }
      },
      "kirfi": {
        name: "Kirfi",
        wards: {
          "kirfi-central": {
            name: "Kirfi Central",
            pollingUnits: [
              "PU 097 - Kirfi Central Market",
              "PU 098 - Kirfi Central Primary School",
              "PU 099 - Kirfi Central Community Hall",
              "PU 100 - Kirfi Central Health Center",
              "PU 101 - Kirfi Central Mosque",
              "PU 102 - Kirfi Central Post Office",
              "PU 103 - Kirfi Central Police Station",
              "PU 104 - Kirfi Central Fire Station"
            ]
          }
        }
      },
      "misau": {
        name: "Misau",
        wards: {
          "misau-central": {
            name: "Misau Central",
            pollingUnits: [
              "PU 105 - Misau Central Market",
              "PU 106 - Misau Central Primary School",
              "PU 107 - Misau Central Community Hall",
              "PU 108 - Misau Central Health Center",
              "PU 109 - Misau Central Mosque",
              "PU 110 - Misau Central Post Office",
              "PU 111 - Misau Central Police Station",
              "PU 112 - Misau Central Fire Station"
            ]
          }
        }
      },
      "ningi": {
        name: "Ningi",
        wards: {
          "ningi-central": {
            name: "Ningi Central",
            pollingUnits: [
              "PU 113 - Ningi Central Market",
              "PU 114 - Ningi Central Primary School",
              "PU 115 - Ningi Central Community Hall",
              "PU 116 - Ningi Central Health Center",
              "PU 117 - Ningi Central Mosque",
              "PU 118 - Ningi Central Post Office",
              "PU 119 - Ningi Central Police Station",
              "PU 120 - Ningi Central Fire Station"
            ]
          }
        }
      },
      "shira": {
        name: "Shira",
        wards: {
          "shira-central": {
            name: "Shira Central",
            pollingUnits: [
              "PU 121 - Shira Central Market",
              "PU 122 - Shira Central Primary School",
              "PU 123 - Shira Central Community Hall",
              "PU 124 - Shira Central Health Center",
              "PU 125 - Shira Central Mosque",
              "PU 126 - Shira Central Post Office",
              "PU 127 - Shira Central Police Station",
              "PU 128 - Shira Central Fire Station"
            ]
          }
        }
      },
      "tafawa-balewa": {
        name: "Tafawa Balewa",
        wards: {
          "tafawa-balewa-central": {
            name: "Tafawa Balewa Central",
            pollingUnits: [
              "PU 129 - Tafawa Balewa Central Market",
              "PU 130 - Tafawa Balewa Central Primary School",
              "PU 131 - Tafawa Balewa Central Community Hall",
              "PU 132 - Tafawa Balewa Central Health Center",
              "PU 133 - Tafawa Balewa Central Mosque",
              "PU 134 - Tafawa Balewa Central Post Office",
              "PU 135 - Tafawa Balewa Central Police Station",
              "PU 136 - Tafawa Balewa Central Fire Station"
            ]
          }
        }
      },
      "toro": {
        name: "Toro",
        wards: {
          "toro-central": {
            name: "Toro Central",
            pollingUnits: [
              "PU 137 - Toro Central Market",
              "PU 138 - Toro Central Primary School",
              "PU 139 - Toro Central Community Hall",
              "PU 140 - Toro Central Health Center",
              "PU 141 - Toro Central Mosque",
              "PU 142 - Toro Central Post Office",
              "PU 143 - Toro Central Police Station",
              "PU 144 - Toro Central Fire Station"
            ]
          }
        }
      },
      "warji": {
        name: "Warji",
        wards: {
          "warji-central": {
            name: "Warji Central",
            pollingUnits: [
              "PU 145 - Warji Central Market",
              "PU 146 - Warji Central Primary School",
              "PU 147 - Warji Central Community Hall",
              "PU 148 - Warji Central Health Center",
              "PU 149 - Warji Central Mosque",
              "PU 150 - Warji Central Post Office",
              "PU 151 - Warji Central Police Station",
              "PU 152 - Warji Central Fire Station"
            ]
          }
        }
      },
      "zaki": {
        name: "Zaki",
        wards: {
          "zaki-central": {
            name: "Zaki Central",
            pollingUnits: [
              "PU 153 - Zaki Central Market",
              "PU 154 - Zaki Central Primary School",
              "PU 155 - Zaki Central Community Hall",
              "PU 156 - Zaki Central Health Center",
              "PU 157 - Zaki Central Mosque",
              "PU 158 - Zaki Central Post Office",
              "PU 159 - Zaki Central Police Station",
              "PU 160 - Zaki Central Fire Station"
            ]
          }
        }
      }
    }
  },
  bayelsa: {
    name: "Bayelsa",
    lgas: {
      "yenagoa": {
        name: "Yenagoa",
        wards: {
          "yenagoa-central": {
            name: "Yenagoa Central",
            pollingUnits: [
              "PU 001 - Yenagoa Central Market",
              "PU 002 - Yenagoa Central Primary School",
              "PU 003 - Yenagoa Central Community Hall",
              "PU 004 - Yenagoa Central Health Center",
              "PU 005 - Yenagoa Central Mosque",
              "PU 006 - Yenagoa Central Post Office",
              "PU 007 - Yenagoa Central Police Station",
              "PU 008 - Yenagoa Central Fire Station"
            ]
          }
        }
      },
      "kolokuma-opokuma": {
        name: "Kolokuma Opokuma",
        wards: {
          "kolokuma-opokuma-central": {
            name: "Kolokuma Opokuma Central",
            pollingUnits: [
              "PU 009 - Kolokuma Opokuma Central Market",
              "PU 010 - Kolokuma Opokuma Central Primary School",
              "PU 011 - Kolokuma Opokuma Central Community Hall",
              "PU 012 - Kolokuma Opokuma Central Health Center",
              "PU 013 - Kolokuma Opokuma Central Mosque",
              "PU 014 - Kolokuma Opokuma Central Post Office",
              "PU 015 - Kolokuma Opokuma Central Police Station",
              "PU 016 - Kolokuma Opokuma Central Fire Station"
            ]
          }
        }
      },
      "sagbama": {
        name: "Sagbama",
        wards: {
          "sagbama-central": {
            name: "Sagbama Central",
            pollingUnits: [
              "PU 017 - Sagbama Central Market",
              "PU 018 - Sagbama Central Primary School",
              "PU 019 - Sagbama Central Community Hall",
              "PU 020 - Sagbama Central Health Center",
              "PU 021 - Sagbama Central Mosque",
              "PU 022 - Sagbama Central Post Office",
              "PU 023 - Sagbama Central Police Station",
              "PU 024 - Sagbama Central Fire Station"
            ]
          }
        }
      },
      "ekeremor": {
        name: "Ekeremor",
        wards: {
          "ekeremor-central": {
            name: "Ekeremor Central",
            pollingUnits: [
              "PU 025 - Ekeremor Central Market",
              "PU 026 - Ekeremor Central Primary School",
              "PU 027 - Ekeremor Central Community Hall",
              "PU 028 - Ekeremor Central Health Center",
              "PU 029 - Ekeremor Central Mosque",
              "PU 030 - Ekeremor Central Post Office",
              "PU 031 - Ekeremor Central Police Station",
              "PU 032 - Ekeremor Central Fire Station"
            ]
          }
        }
      },
      "southern-ijaw": {
        name: "Southern Ijaw",
        wards: {
          "southern-ijaw-central": {
            name: "Southern Ijaw Central",
            pollingUnits: [
              "PU 033 - Southern Ijaw Central Market",
              "PU 034 - Southern Ijaw Central Primary School",
              "PU 035 - Southern Ijaw Central Community Hall",
              "PU 036 - Southern Ijaw Central Health Center",
              "PU 037 - Southern Ijaw Central Mosque",
              "PU 038 - Southern Ijaw Central Post Office",
              "PU 039 - Southern Ijaw Central Police Station",
              "PU 040 - Southern Ijaw Central Fire Station"
            ]
          }
        }
      },
      "nembe": {
        name: "Nembe",
        wards: {
          "nembe-central": {
            name: "Nembe Central",
            pollingUnits: [
              "PU 041 - Nembe Central Market",
              "PU 042 - Nembe Central Primary School",
              "PU 043 - Nembe Central Community Hall",
              "PU 044 - Nembe Central Health Center",
              "PU 045 - Nembe Central Mosque",
              "PU 046 - Nembe Central Post Office",
              "PU 047 - Nembe Central Police Station",
              "PU 048 - Nembe Central Fire Station"
            ]
          }
        }
      },
      "brass": {
        name: "Brass",
        wards: {
          "brass-central": {
            name: "Brass Central",
            pollingUnits: [
              "PU 049 - Brass Central Market",
              "PU 050 - Brass Central Primary School",
              "PU 051 - Brass Central Community Hall",
              "PU 052 - Brass Central Health Center",
              "PU 053 - Brass Central Mosque",
              "PU 054 - Brass Central Post Office",
              "PU 055 - Brass Central Police Station",
              "PU 056 - Brass Central Fire Station"
            ]
          }
        }
      },
      "ogbia": {
        name: "Ogbia",
        wards: {
          "ogbia-central": {
            name: "Ogbia Central",
            pollingUnits: [
              "PU 057 - Ogbia Central Market",
              "PU 058 - Ogbia Central Primary School",
              "PU 059 - Ogbia Central Community Hall",
              "PU 060 - Ogbia Central Health Center",
              "PU 061 - Ogbia Central Mosque",
              "PU 062 - Ogbia Central Post Office",
              "PU 063 - Ogbia Central Police Station",
              "PU 064 - Ogbia Central Fire Station"
            ]
          }
        }
      }
    }
  },
  benue: {
    name: "Benue",
    lgas: {
      "makurdi": {
        name: "Makurdi",
        wards: {
          "makurdi-central": {
            name: "Makurdi Central",
            pollingUnits: [
              "PU 001 - Makurdi Central Market",
              "PU 002 - Makurdi Central Primary School",
              "PU 003 - Makurdi Central Community Hall",
              "PU 004 - Makurdi Central Health Center",
              "PU 005 - Makurdi Central Mosque",
              "PU 006 - Makurdi Central Post Office",
              "PU 007 - Makurdi Central Police Station",
              "PU 008 - Makurdi Central Fire Station"
            ]
          },
          "makurdi-north": {
            name: "Makurdi North",
            pollingUnits: [
              "PU 009 - Makurdi North Market",
              "PU 010 - Makurdi North Primary School",
              "PU 011 - Makurdi North Community Hall",
              "PU 012 - Makurdi North Health Center",
              "PU 013 - Makurdi North Mosque",
              "PU 014 - Makurdi North Post Office",
              "PU 015 - Makurdi North Police Station",
              "PU 016 - Makurdi North Fire Station"
            ]
          },
          "makurdi-south": {
            name: "Makurdi South",
            pollingUnits: [
              "PU 017 - Makurdi South Market",
              "PU 018 - Makurdi South Primary School",
              "PU 019 - Makurdi South Community Hall",
              "PU 020 - Makurdi South Health Center",
              "PU 021 - Makurdi South Mosque",
              "PU 022 - Makurdi South Post Office",
              "PU 023 - Makurdi South Police Station",
              "PU 024 - Makurdi South Fire Station"
            ]
          },
          "makurdi-east": {
            name: "Makurdi East",
            pollingUnits: [
              "PU 025 - Makurdi East Market",
              "PU 026 - Makurdi East Primary School",
              "PU 027 - Makurdi East Community Hall",
              "PU 028 - Makurdi East Health Center",
              "PU 029 - Makurdi East Mosque",
              "PU 030 - Makurdi East Post Office",
              "PU 031 - Makurdi East Police Station",
              "PU 032 - Makurdi East Fire Station"
            ]
          }
        }
      },
      "guma": {
        name: "Guma",
        wards: {
          "guma-central": {
            name: "Guma Central",
            pollingUnits: [
              "PU 009 - Guma Central Market",
              "PU 010 - Guma Central Primary School",
              "PU 011 - Guma Central Community Hall",
              "PU 012 - Guma Central Health Center",
              "PU 013 - Guma Central Mosque",
              "PU 014 - Guma Central Post Office",
              "PU 015 - Guma Central Police Station",
              "PU 016 - Guma Central Fire Station"
            ]
          },
          "guma-north": {
            name: "Guma North",
            pollingUnits: [
              "PU 017 - Guma North Market",
              "PU 018 - Guma North Primary School",
              "PU 019 - Guma North Community Hall",
              "PU 020 - Guma North Health Center",
              "PU 021 - Guma North Mosque",
              "PU 022 - Guma North Post Office",
              "PU 023 - Guma North Police Station",
              "PU 024 - Guma North Fire Station"
            ]
          },
          "guma-south": {
            name: "Guma South",
            pollingUnits: [
              "PU 025 - Guma South Market",
              "PU 026 - Guma South Primary School",
              "PU 027 - Guma South Community Hall",
              "PU 028 - Guma South Health Center",
              "PU 029 - Guma South Mosque",
              "PU 030 - Guma South Post Office",
              "PU 031 - Guma South Police Station",
              "PU 032 - Guma South Fire Station"
            ]
          }
        }
      },
      "gwer-east": {
        name: "Gwer East",
        wards: {
          "gwer-east-central": {
            name: "Gwer East Central",
            pollingUnits: [
              "PU 033 - Gwer East Central Market",
              "PU 034 - Gwer East Central Primary School",
              "PU 035 - Gwer East Central Community Hall",
              "PU 036 - Gwer East Central Health Center",
              "PU 037 - Gwer East Central Mosque",
              "PU 038 - Gwer East Central Post Office",
              "PU 039 - Gwer East Central Police Station",
              "PU 040 - Gwer East Central Fire Station"
            ]
          },
          "gwer-east-north": {
            name: "Gwer East North",
            pollingUnits: [
              "PU 041 - Gwer East North Market",
              "PU 042 - Gwer East North Primary School",
              "PU 043 - Gwer East North Community Hall",
              "PU 044 - Gwer East North Health Center",
              "PU 045 - Gwer East North Mosque",
              "PU 046 - Gwer East North Post Office",
              "PU 047 - Gwer East North Police Station",
              "PU 048 - Gwer East North Fire Station"
            ]
          },
          "gwer-east-south": {
            name: "Gwer East South",
            pollingUnits: [
              "PU 049 - Gwer East South Market",
              "PU 050 - Gwer East South Primary School",
              "PU 051 - Gwer East South Community Hall",
              "PU 052 - Gwer East South Health Center",
              "PU 053 - Gwer East South Mosque",
              "PU 054 - Gwer East South Post Office",
              "PU 055 - Gwer East South Police Station",
              "PU 056 - Gwer East South Fire Station"
            ]
          }
        }
      },
      "gwer-west": {
        name: "Gwer West",
        wards: {
          "gwer-west-central": {
            name: "Gwer West Central",
            pollingUnits: [
              "PU 057 - Gwer West Central Market",
              "PU 058 - Gwer West Central Primary School",
              "PU 059 - Gwer West Central Community Hall",
              "PU 060 - Gwer West Central Health Center",
              "PU 061 - Gwer West Central Mosque",
              "PU 062 - Gwer West Central Post Office",
              "PU 063 - Gwer West Central Police Station",
              "PU 064 - Gwer West Central Fire Station"
            ]
          },
          "gwer-west-north": {
            name: "Gwer West North",
            pollingUnits: [
              "PU 065 - Gwer West North Market",
              "PU 066 - Gwer West North Primary School",
              "PU 067 - Gwer West North Community Hall",
              "PU 068 - Gwer West North Health Center",
              "PU 069 - Gwer West North Mosque",
              "PU 070 - Gwer West North Post Office",
              "PU 071 - Gwer West North Police Station",
              "PU 072 - Gwer West North Fire Station"
            ]
          },
          "gwer-west-south": {
            name: "Gwer West South",
            pollingUnits: [
              "PU 073 - Gwer West South Market",
              "PU 074 - Gwer West South Primary School",
              "PU 075 - Gwer West South Community Hall",
              "PU 076 - Gwer West South Health Center",
              "PU 077 - Gwer West South Mosque",
              "PU 078 - Gwer West South Post Office",
              "PU 079 - Gwer West South Police Station",
              "PU 080 - Gwer West South Fire Station"
            ]
          }
        }
      },
      "kwande": {
        name: "Kwande",
        wards: {
          "kwande-central": {
            name: "Kwande Central",
            pollingUnits: [
              "PU 081 - Kwande Central Market",
              "PU 082 - Kwande Central Primary School",
              "PU 083 - Kwande Central Community Hall",
              "PU 084 - Kwande Central Health Center",
              "PU 085 - Kwande Central Mosque",
              "PU 086 - Kwande Central Post Office",
              "PU 087 - Kwande Central Police Station",
              "PU 088 - Kwande Central Fire Station"
            ]
          },
          "kwande-north": {
            name: "Kwande North",
            pollingUnits: [
              "PU 089 - Kwande North Market",
              "PU 090 - Kwande North Primary School",
              "PU 091 - Kwande North Community Hall",
              "PU 092 - Kwande North Health Center",
              "PU 093 - Kwande North Mosque",
              "PU 094 - Kwande North Post Office",
              "PU 095 - Kwande North Police Station",
              "PU 096 - Kwande North Fire Station"
            ]
          },
          "kwande-south": {
            name: "Kwande South",
            pollingUnits: [
              "PU 097 - Kwande South Market",
              "PU 098 - Kwande South Primary School",
              "PU 099 - Kwande South Community Hall",
              "PU 100 - Kwande South Health Center",
              "PU 101 - Kwande South Mosque",
              "PU 102 - Kwande South Post Office",
              "PU 103 - Kwande South Police Station",
              "PU 104 - Kwande South Fire Station"
            ]
          }
        }
      },
      "ushongo": {
        name: "Ushongo",
        wards: {
          "ushongo-central": {
            name: "Ushongo Central",
            pollingUnits: [
              "PU 105 - Ushongo Central Market",
              "PU 106 - Ushongo Central Primary School",
              "PU 107 - Ushongo Central Community Hall",
              "PU 108 - Ushongo Central Health Center",
              "PU 109 - Ushongo Central Mosque",
              "PU 110 - Ushongo Central Post Office",
              "PU 111 - Ushongo Central Police Station",
              "PU 112 - Ushongo Central Fire Station"
            ]
          },
          "ushongo-north": {
            name: "Ushongo North",
            pollingUnits: [
              "PU 113 - Ushongo North Market",
              "PU 114 - Ushongo North Primary School",
              "PU 115 - Ushongo North Community Hall",
              "PU 116 - Ushongo North Health Center",
              "PU 117 - Ushongo North Mosque",
              "PU 118 - Ushongo North Post Office",
              "PU 119 - Ushongo North Police Station",
              "PU 120 - Ushongo North Fire Station"
            ]
          },
          "ushongo-south": {
            name: "Ushongo South",
            pollingUnits: [
              "PU 121 - Ushongo South Market",
              "PU 122 - Ushongo South Primary School",
              "PU 123 - Ushongo South Community Hall",
              "PU 124 - Ushongo South Health Center",
              "PU 125 - Ushongo South Mosque",
              "PU 126 - Ushongo South Post Office",
              "PU 127 - Ushongo South Police Station",
              "PU 128 - Ushongo South Fire Station"
            ]
          }
        }
      },
      "katsina-ala": {
        name: "Katsina Ala",
        wards: {
          "katsina-ala-central": {
            name: "Katsina Ala Central",
            pollingUnits: [
              "PU 049 - Katsina Ala Central Market",
              "PU 050 - Katsina Ala Central Primary School",
              "PU 051 - Katsina Ala Central Community Hall",
              "PU 052 - Katsina Ala Central Health Center",
              "PU 053 - Katsina Ala Central Mosque",
              "PU 054 - Katsina Ala Central Post Office",
              "PU 055 - Katsina Ala Central Police Station",
              "PU 056 - Katsina Ala Central Fire Station"
            ]
          }
        }
      },
      "ukum": {
        name: "Ukum",
        wards: {
          "ukum-central": {
            name: "Ukum Central",
            pollingUnits: [
              "PU 057 - Ukum Central Market",
              "PU 058 - Ukum Central Primary School",
              "PU 059 - Ukum Central Community Hall",
              "PU 060 - Ukum Central Health Center",
              "PU 061 - Ukum Central Mosque",
              "PU 062 - Ukum Central Post Office",
              "PU 063 - Ukum Central Police Station",
              "PU 064 - Ukum Central Fire Station"
            ]
          }
        }
      },
      "logo": {
        name: "Logo",
        wards: {
          "logo-central": {
            name: "Logo Central",
            pollingUnits: [
              "PU 065 - Logo Central Market",
              "PU 066 - Logo Central Primary School",
              "PU 067 - Logo Central Community Hall",
              "PU 068 - Logo Central Health Center",
              "PU 069 - Logo Central Mosque",
              "PU 070 - Logo Central Post Office",
              "PU 071 - Logo Central Police Station",
              "PU 072 - Logo Central Fire Station"
            ]
          }
        }
      },
      "buruku": {
        name: "Buruku",
        wards: {
          "buruku-central": {
            name: "Buruku Central",
            pollingUnits: [
              "PU 073 - Buruku Central Market",
              "PU 074 - Buruku Central Primary School",
              "PU 075 - Buruku Central Community Hall",
              "PU 076 - Buruku Central Health Center",
              "PU 077 - Buruku Central Mosque",
              "PU 078 - Buruku Central Post Office",
              "PU 079 - Buruku Central Police Station",
              "PU 080 - Buruku Central Fire Station"
            ]
          }
        }
      },
      "otukpo": {
        name: "Otukpo",
        wards: {
          "otukpo-central": {
            name: "Otukpo Central",
            pollingUnits: [
              "PU 129 - Otukpo Central Market",
              "PU 130 - Otukpo Central Primary School",
              "PU 131 - Otukpo Central Community Hall",
              "PU 132 - Otukpo Central Health Center",
              "PU 133 - Otukpo Central Mosque",
              "PU 134 - Otukpo Central Post Office",
              "PU 135 - Otukpo Central Police Station",
              "PU 136 - Otukpo Central Fire Station"
            ]
          },
          "otukpo-north": {
            name: "Otukpo North",
            pollingUnits: [
              "PU 137 - Otukpo North Market",
              "PU 138 - Otukpo North Primary School",
              "PU 139 - Otukpo North Community Hall",
              "PU 140 - Otukpo North Health Center",
              "PU 141 - Otukpo North Mosque",
              "PU 142 - Otukpo North Post Office",
              "PU 143 - Otukpo North Police Station",
              "PU 144 - Otukpo North Fire Station"
            ]
          },
          "otukpo-south": {
            name: "Otukpo South",
            pollingUnits: [
              "PU 145 - Otukpo South Market",
              "PU 146 - Otukpo South Primary School",
              "PU 147 - Otukpo South Community Hall",
              "PU 148 - Otukpo South Health Center",
              "PU 149 - Otukpo South Mosque",
              "PU 150 - Otukpo South Post Office",
              "PU 151 - Otukpo South Police Station",
              "PU 152 - Otukpo South Fire Station"
            ]
          }
        }
      },
      "apa": {
        name: "Apa",
        wards: {
          "apa-central": {
            name: "Apa Central",
            pollingUnits: [
              "PU 153 - Apa Central Market",
              "PU 154 - Apa Central Primary School",
              "PU 155 - Apa Central Community Hall",
              "PU 156 - Apa Central Health Center",
              "PU 157 - Apa Central Mosque",
              "PU 158 - Apa Central Post Office",
              "PU 159 - Apa Central Police Station",
              "PU 160 - Apa Central Fire Station"
            ]
          },
          "apa-north": {
            name: "Apa North",
            pollingUnits: [
              "PU 161 - Apa North Market",
              "PU 162 - Apa North Primary School",
              "PU 163 - Apa North Community Hall",
              "PU 164 - Apa North Health Center",
              "PU 165 - Apa North Mosque",
              "PU 166 - Apa North Post Office",
              "PU 167 - Apa North Police Station",
              "PU 168 - Apa North Fire Station"
            ]
          },
          "apa-south": {
            name: "Apa South",
            pollingUnits: [
              "PU 169 - Apa South Market",
              "PU 170 - Apa South Primary School",
              "PU 171 - Apa South Community Hall",
              "PU 172 - Apa South Health Center",
              "PU 173 - Apa South Mosque",
              "PU 174 - Apa South Post Office",
              "PU 175 - Apa South Police Station",
              "PU 176 - Apa South Fire Station"
            ]
          }
        }
      },
      "agatu": {
        name: "Agatu",
        wards: {
          "agatu-central": {
            name: "Agatu Central",
            pollingUnits: [
              "PU 177 - Agatu Central Market",
              "PU 178 - Agatu Central Primary School",
              "PU 179 - Agatu Central Community Hall",
              "PU 180 - Agatu Central Health Center",
              "PU 181 - Agatu Central Mosque",
              "PU 182 - Agatu Central Post Office",
              "PU 183 - Agatu Central Police Station",
              "PU 184 - Agatu Central Fire Station"
            ]
          },
          "agatu-north": {
            name: "Agatu North",
            pollingUnits: [
              "PU 185 - Agatu North Market",
              "PU 186 - Agatu North Primary School",
              "PU 187 - Agatu North Community Hall",
              "PU 188 - Agatu North Health Center",
              "PU 189 - Agatu North Mosque",
              "PU 190 - Agatu North Post Office",
              "PU 191 - Agatu North Police Station",
              "PU 192 - Agatu North Fire Station"
            ]
          },
          "agatu-south": {
            name: "Agatu South",
            pollingUnits: [
              "PU 193 - Agatu South Market",
              "PU 194 - Agatu South Primary School",
              "PU 195 - Agatu South Community Hall",
              "PU 196 - Agatu South Health Center",
              "PU 197 - Agatu South Mosque",
              "PU 198 - Agatu South Post Office",
              "PU 199 - Agatu South Police Station",
              "PU 200 - Agatu South Fire Station"
            ]
          }
        }
      },
      "adoka": {
        name: "Adoka",
        wards: {
          "adoka-central": {
            name: "Adoka Central",
            pollingUnits: [
              "PU 201 - Adoka Central Market",
              "PU 202 - Adoka Central Primary School",
              "PU 203 - Adoka Central Community Hall",
              "PU 204 - Adoka Central Health Center",
              "PU 205 - Adoka Central Mosque",
              "PU 206 - Adoka Central Post Office",
              "PU 207 - Adoka Central Police Station",
              "PU 208 - Adoka Central Fire Station"
            ]
          },
          "adoka-north": {
            name: "Adoka North",
            pollingUnits: [
              "PU 209 - Adoka North Market",
              "PU 210 - Adoka North Primary School",
              "PU 211 - Adoka North Community Hall",
              "PU 212 - Adoka North Health Center",
              "PU 213 - Adoka North Mosque",
              "PU 214 - Adoka North Post Office",
              "PU 215 - Adoka North Police Station",
              "PU 216 - Adoka North Fire Station"
            ]
          },
          "adoka-south": {
            name: "Adoka South",
            pollingUnits: [
              "PU 217 - Adoka South Market",
              "PU 218 - Adoka South Primary School",
              "PU 219 - Adoka South Community Hall",
              "PU 220 - Adoka South Health Center",
              "PU 221 - Adoka South Mosque",
              "PU 222 - Adoka South Post Office",
              "PU 223 - Adoka South Police Station",
              "PU 224 - Adoka South Fire Station"
            ]
          }
        }
      },
      "ogbadibo": {
        name: "Ogbadibo",
        wards: {
          "ogbadibo-central": {
            name: "Ogbadibo Central",
            pollingUnits: [
              "PU 225 - Ogbadibo Central Market",
              "PU 226 - Ogbadibo Central Primary School",
              "PU 227 - Ogbadibo Central Community Hall",
              "PU 228 - Ogbadibo Central Health Center",
              "PU 229 - Ogbadibo Central Mosque",
              "PU 230 - Ogbadibo Central Post Office",
              "PU 231 - Ogbadibo Central Police Station",
              "PU 232 - Ogbadibo Central Fire Station"
            ]
          },
          "ogbadibo-north": {
            name: "Ogbadibo North",
            pollingUnits: [
              "PU 233 - Ogbadibo North Market",
              "PU 234 - Ogbadibo North Primary School",
              "PU 235 - Ogbadibo North Community Hall",
              "PU 236 - Ogbadibo North Health Center",
              "PU 237 - Ogbadibo North Mosque",
              "PU 238 - Ogbadibo North Post Office",
              "PU 239 - Ogbadibo North Police Station",
              "PU 240 - Ogbadibo North Fire Station"
            ]
          },
          "ogbadibo-south": {
            name: "Ogbadibo South",
            pollingUnits: [
              "PU 241 - Ogbadibo South Market",
              "PU 242 - Ogbadibo South Primary School",
              "PU 243 - Ogbadibo South Community Hall",
              "PU 244 - Ogbadibo South Health Center",
              "PU 245 - Ogbadibo South Mosque",
              "PU 246 - Ogbadibo South Post Office",
              "PU 247 - Ogbadibo South Police Station",
              "PU 248 - Ogbadibo South Fire Station"
            ]
          }
        }
      },
      "okpokwu": {
        name: "Okpokwu",
        wards: {
          "okpokwu-central": {
            name: "Okpokwu Central",
            pollingUnits: [
              "PU 249 - Okpokwu Central Market",
              "PU 250 - Okpokwu Central Primary School",
              "PU 251 - Okpokwu Central Community Hall",
              "PU 252 - Okpokwu Central Health Center",
              "PU 253 - Okpokwu Central Mosque",
              "PU 254 - Okpokwu Central Post Office",
              "PU 255 - Okpokwu Central Police Station",
              "PU 256 - Okpokwu Central Fire Station"
            ]
          },
          "okpokwu-north": {
            name: "Okpokwu North",
            pollingUnits: [
              "PU 257 - Okpokwu North Market",
              "PU 258 - Okpokwu North Primary School",
              "PU 259 - Okpokwu North Community Hall",
              "PU 260 - Okpokwu North Health Center",
              "PU 261 - Okpokwu North Mosque",
              "PU 262 - Okpokwu North Post Office",
              "PU 263 - Okpokwu North Police Station",
              "PU 264 - Okpokwu North Fire Station"
            ]
          },
          "okpokwu-south": {
            name: "Okpokwu South",
            pollingUnits: [
              "PU 265 - Okpokwu South Market",
              "PU 266 - Okpokwu South Primary School",
              "PU 267 - Okpokwu South Community Hall",
              "PU 268 - Okpokwu South Health Center",
              "PU 269 - Okpokwu South Mosque",
              "PU 270 - Okpokwu South Post Office",
              "PU 271 - Okpokwu South Police Station",
              "PU 272 - Okpokwu South Fire Station"
            ]
          }
        }
      },
      "ohimini": {
        name: "Ohimini",
        wards: {
          "ohimini-central": {
            name: "Ohimini Central",
            pollingUnits: [
              "PU 273 - Ohimini Central Market",
              "PU 274 - Ohimini Central Primary School",
              "PU 275 - Ohimini Central Community Hall",
              "PU 276 - Ohimini Central Health Center",
              "PU 277 - Ohimini Central Mosque",
              "PU 278 - Ohimini Central Post Office",
              "PU 279 - Ohimini Central Police Station",
              "PU 280 - Ohimini Central Fire Station"
            ]
          },
          "ohimini-north": {
            name: "Ohimini North",
            pollingUnits: [
              "PU 281 - Ohimini North Market",
              "PU 282 - Ohimini North Primary School",
              "PU 283 - Ohimini North Community Hall",
              "PU 284 - Ohimini North Health Center",
              "PU 285 - Ohimini North Mosque",
              "PU 286 - Ohimini North Post Office",
              "PU 287 - Ohimini North Police Station",
              "PU 288 - Ohimini North Fire Station"
            ]
          },
          "ohimini-south": {
            name: "Ohimini South",
            pollingUnits: [
              "PU 289 - Ohimini South Market",
              "PU 290 - Ohimini South Primary School",
              "PU 291 - Ohimini South Community Hall",
              "PU 292 - Ohimini South Health Center",
              "PU 293 - Ohimini South Mosque",
              "PU 294 - Ohimini South Post Office",
              "PU 295 - Ohimini South Police Station",
              "PU 296 - Ohimini South Fire Station"
            ]
          }
        }
      },
      "obi": {
        name: "Obi",
        wards: {
          "obi-central": {
            name: "Obi Central",
            pollingUnits: [
              "PU 297 - Obi Central Market",
              "PU 298 - Obi Central Primary School",
              "PU 299 - Obi Central Community Hall",
              "PU 300 - Obi Central Health Center",
              "PU 301 - Obi Central Mosque",
              "PU 302 - Obi Central Post Office",
              "PU 303 - Obi Central Police Station",
              "PU 304 - Obi Central Fire Station"
            ]
          },
          "obi-north": {
            name: "Obi North",
            pollingUnits: [
              "PU 305 - Obi North Market",
              "PU 306 - Obi North Primary School",
              "PU 307 - Obi North Community Hall",
              "PU 308 - Obi North Health Center",
              "PU 309 - Obi North Mosque",
              "PU 310 - Obi North Post Office",
              "PU 311 - Obi North Police Station",
              "PU 312 - Obi North Fire Station"
            ]
          },
          "obi-south": {
            name: "Obi South",
            pollingUnits: [
              "PU 313 - Obi South Market",
              "PU 314 - Obi South Primary School",
              "PU 315 - Obi South Community Hall",
              "PU 316 - Obi South Health Center",
              "PU 317 - Obi South Mosque",
              "PU 318 - Obi South Post Office",
              "PU 319 - Obi South Police Station",
              "PU 320 - Obi South Fire Station"
            ]
          }
        }
      },
      "konshisha": {
        name: "Konshisha",
        wards: {
          "konshisha-central": {
            name: "Konshisha Central",
            pollingUnits: [
              "PU 321 - Konshisha Central Market",
              "PU 322 - Konshisha Central Primary School",
              "PU 323 - Konshisha Central Community Hall",
              "PU 324 - Konshisha Central Health Center",
              "PU 325 - Konshisha Central Mosque",
              "PU 326 - Konshisha Central Post Office",
              "PU 327 - Konshisha Central Police Station",
              "PU 328 - Konshisha Central Fire Station"
            ]
          },
          "konshisha-north": {
            name: "Konshisha North",
            pollingUnits: [
              "PU 329 - Konshisha North Market",
              "PU 330 - Konshisha North Primary School",
              "PU 331 - Konshisha North Community Hall",
              "PU 332 - Konshisha North Health Center",
              "PU 333 - Konshisha North Mosque",
              "PU 334 - Konshisha North Post Office",
              "PU 335 - Konshisha North Police Station",
              "PU 336 - Konshisha North Fire Station"
            ]
          },
          "konshisha-south": {
            name: "Konshisha South",
            pollingUnits: [
              "PU 337 - Konshisha South Market",
              "PU 338 - Konshisha South Primary School",
              "PU 339 - Konshisha South Community Hall",
              "PU 340 - Konshisha South Health Center",
              "PU 341 - Konshisha South Mosque",
              "PU 342 - Konshisha South Post Office",
              "PU 343 - Konshisha South Police Station",
              "PU 344 - Konshisha South Fire Station"
            ]
          }
        }
      },
      "vandeikya": {
        name: "Vandeikya",
        wards: {
          "vandeikya-central": {
            name: "Vandeikya Central",
            pollingUnits: [
              "PU 345 - Vandeikya Central Market",
              "PU 346 - Vandeikya Central Primary School",
              "PU 347 - Vandeikya Central Community Hall",
              "PU 348 - Vandeikya Central Health Center",
              "PU 349 - Vandeikya Central Mosque",
              "PU 350 - Vandeikya Central Post Office",
              "PU 351 - Vandeikya Central Police Station",
              "PU 352 - Vandeikya Central Fire Station"
            ]
          },
          "vandeikya-north": {
            name: "Vandeikya North",
            pollingUnits: [
              "PU 353 - Vandeikya North Market",
              "PU 354 - Vandeikya North Primary School",
              "PU 355 - Vandeikya North Community Hall",
              "PU 356 - Vandeikya North Health Center",
              "PU 357 - Vandeikya North Mosque",
              "PU 358 - Vandeikya North Post Office",
              "PU 359 - Vandeikya North Police Station",
              "PU 360 - Vandeikya North Fire Station"
            ]
          },
          "vandeikya-south": {
            name: "Vandeikya South",
            pollingUnits: [
              "PU 361 - Vandeikya South Market",
              "PU 362 - Vandeikya South Primary School",
              "PU 363 - Vandeikya South Community Hall",
              "PU 364 - Vandeikya South Health Center",
              "PU 365 - Vandeikya South Mosque",
              "PU 366 - Vandeikya South Post Office",
              "PU 367 - Vandeikya South Police Station",
              "PU 368 - Vandeikya South Fire Station"
            ]
          }
        }
      }
    }
  },
  borno: {
    name: "Borno",
    lgas: {
      "maiduguri": {
        name: "Maiduguri",
        wards: {
          "maiduguri-central": {
            name: "Maiduguri Central",
            pollingUnits: [
              "PU 001 - Maiduguri Central Market",
              "PU 002 - Maiduguri Central Primary School",
              "PU 003 - Maiduguri Central Community Hall",
              "PU 004 - Maiduguri Central Health Center",
              "PU 005 - Maiduguri Central Mosque",
              "PU 006 - Maiduguri Central Post Office",
              "PU 007 - Maiduguri Central Police Station",
              "PU 008 - Maiduguri Central Fire Station"
            ]
          },
          "maiduguri-north": {
            name: "Maiduguri North",
            pollingUnits: [
              "PU 009 - Maiduguri North Market",
              "PU 010 - Maiduguri North Primary School",
              "PU 011 - Maiduguri North Community Hall",
              "PU 012 - Maiduguri North Health Center",
              "PU 013 - Maiduguri North Mosque",
              "PU 014 - Maiduguri North Post Office",
              "PU 015 - Maiduguri North Police Station",
              "PU 016 - Maiduguri North Fire Station"
            ]
          },
          "maiduguri-south": {
            name: "Maiduguri South",
            pollingUnits: [
              "PU 017 - Maiduguri South Market",
              "PU 018 - Maiduguri South Primary School",
              "PU 019 - Maiduguri South Community Hall",
              "PU 020 - Maiduguri South Health Center",
              "PU 021 - Maiduguri South Mosque",
              "PU 022 - Maiduguri South Post Office",
              "PU 023 - Maiduguri South Police Station",
              "PU 024 - Maiduguri South Fire Station"
            ]
          },
          "maiduguri-east": {
            name: "Maiduguri East",
            pollingUnits: [
              "PU 025 - Maiduguri East Market",
              "PU 026 - Maiduguri East Primary School",
              "PU 027 - Maiduguri East Community Hall",
              "PU 028 - Maiduguri East Health Center",
              "PU 029 - Maiduguri East Mosque",
              "PU 030 - Maiduguri East Post Office",
              "PU 031 - Maiduguri East Police Station",
              "PU 032 - Maiduguri East Fire Station"
            ]
          }
        }
      },
      "gwoza": {
        name: "Gwoza",
        wards: {
          "gwoza-central": {
            name: "Gwoza Central",
            pollingUnits: [
              "PU 033 - Gwoza Central Market",
              "PU 034 - Gwoza Central Primary School",
              "PU 035 - Gwoza Central Community Hall",
              "PU 036 - Gwoza Central Health Center",
              "PU 037 - Gwoza Central Mosque",
              "PU 038 - Gwoza Central Post Office",
              "PU 039 - Gwoza Central Police Station",
              "PU 040 - Gwoza Central Fire Station"
            ]
          },
          "gwoza-north": {
            name: "Gwoza North",
            pollingUnits: [
              "PU 041 - Gwoza North Market",
              "PU 042 - Gwoza North Primary School",
              "PU 043 - Gwoza North Community Hall",
              "PU 044 - Gwoza North Health Center",
              "PU 045 - Gwoza North Mosque",
              "PU 046 - Gwoza North Post Office",
              "PU 047 - Gwoza North Police Station",
              "PU 048 - Gwoza North Fire Station"
            ]
          },
          "gwoza-south": {
            name: "Gwoza South",
            pollingUnits: [
              "PU 049 - Gwoza South Market",
              "PU 050 - Gwoza South Primary School",
              "PU 051 - Gwoza South Community Hall",
              "PU 052 - Gwoza South Health Center",
              "PU 053 - Gwoza South Mosque",
              "PU 054 - Gwoza South Post Office",
              "PU 055 - Gwoza South Police Station",
              "PU 056 - Gwoza South Fire Station"
            ]
          }
        }
      },
      "kukawa": {
        name: "Kukawa",
        wards: {
          "kukawa-central": {
            name: "Kukawa Central",
            pollingUnits: [
              "PU 057 - Kukawa Central Market",
              "PU 058 - Kukawa Central Primary School",
              "PU 059 - Kukawa Central Community Hall",
              "PU 060 - Kukawa Central Health Center",
              "PU 061 - Kukawa Central Mosque",
              "PU 062 - Kukawa Central Post Office",
              "PU 063 - Kukawa Central Police Station",
              "PU 064 - Kukawa Central Fire Station"
            ]
          },
          "kukawa-north": {
            name: "Kukawa North",
            pollingUnits: [
              "PU 065 - Kukawa North Market",
              "PU 066 - Kukawa North Primary School",
              "PU 067 - Kukawa North Community Hall",
              "PU 068 - Kukawa North Health Center",
              "PU 069 - Kukawa North Mosque",
              "PU 070 - Kukawa North Post Office",
              "PU 071 - Kukawa North Police Station",
              "PU 072 - Kukawa North Fire Station"
            ]
          },
          "kukawa-south": {
            name: "Kukawa South",
            pollingUnits: [
              "PU 073 - Kukawa South Market",
              "PU 074 - Kukawa South Primary School",
              "PU 075 - Kukawa South Community Hall",
              "PU 076 - Kukawa South Health Center",
              "PU 077 - Kukawa South Mosque",
              "PU 078 - Kukawa South Post Office",
              "PU 079 - Kukawa South Police Station",
              "PU 080 - Kukawa South Fire Station"
            ]
          }
        }
      },
      "kaga": {
        name: "Kaga",
        wards: {
          "kaga-central": {
            name: "Kaga Central",
            pollingUnits: [
              "PU 081 - Kaga Central Market",
              "PU 082 - Kaga Central Primary School",
              "PU 083 - Kaga Central Community Hall",
              "PU 084 - Kaga Central Health Center",
              "PU 085 - Kaga Central Mosque",
              "PU 086 - Kaga Central Post Office",
              "PU 087 - Kaga Central Police Station",
              "PU 088 - Kaga Central Fire Station"
            ]
          },
          "kaga-north": {
            name: "Kaga North",
            pollingUnits: [
              "PU 089 - Kaga North Market",
              "PU 090 - Kaga North Primary School",
              "PU 091 - Kaga North Community Hall",
              "PU 092 - Kaga North Health Center",
              "PU 093 - Kaga North Mosque",
              "PU 094 - Kaga North Post Office",
              "PU 095 - Kaga North Police Station",
              "PU 096 - Kaga North Fire Station"
            ]
          },
          "kaga-south": {
            name: "Kaga South",
            pollingUnits: [
              "PU 097 - Kaga South Market",
              "PU 098 - Kaga South Primary School",
              "PU 099 - Kaga South Community Hall",
              "PU 100 - Kaga South Health Center",
              "PU 101 - Kaga South Mosque",
              "PU 102 - Kaga South Post Office",
              "PU 103 - Kaga South Police Station",
              "PU 104 - Kaga South Fire Station"
            ]
          }
        }
      },
      "dikwa": {
        name: "Dikwa",
        wards: {
          "dikwa-central": {
            name: "Dikwa Central",
            pollingUnits: [
              "PU 105 - Dikwa Central Market",
              "PU 106 - Dikwa Central Primary School",
              "PU 107 - Dikwa Central Community Hall",
              "PU 108 - Dikwa Central Health Center",
              "PU 109 - Dikwa Central Mosque",
              "PU 110 - Dikwa Central Post Office",
              "PU 111 - Dikwa Central Police Station",
              "PU 112 - Dikwa Central Fire Station"
            ]
          },
          "dikwa-north": {
            name: "Dikwa North",
            pollingUnits: [
              "PU 113 - Dikwa North Market",
              "PU 114 - Dikwa North Primary School",
              "PU 115 - Dikwa North Community Hall",
              "PU 116 - Dikwa North Health Center",
              "PU 117 - Dikwa North Mosque",
              "PU 118 - Dikwa North Post Office",
              "PU 119 - Dikwa North Police Station",
              "PU 120 - Dikwa North Fire Station"
            ]
          },
          "dikwa-south": {
            name: "Dikwa South",
            pollingUnits: [
              "PU 121 - Dikwa South Market",
              "PU 122 - Dikwa South Primary School",
              "PU 123 - Dikwa South Community Hall",
              "PU 124 - Dikwa South Health Center",
              "PU 125 - Dikwa South Mosque",
              "PU 126 - Dikwa South Post Office",
              "PU 127 - Dikwa South Police Station",
              "PU 128 - Dikwa South Fire Station"
            ]
          }
        }
      },
      "bama": {
        name: "Bama",
        wards: {
          "bama-central": {
            name: "Bama Central",
            pollingUnits: [
              "PU 129 - Bama Central Market",
              "PU 130 - Bama Central Primary School",
              "PU 131 - Bama Central Community Hall",
              "PU 132 - Bama Central Health Center",
              "PU 133 - Bama Central Mosque",
              "PU 134 - Bama Central Post Office",
              "PU 135 - Bama Central Police Station",
              "PU 136 - Bama Central Fire Station"
            ]
          },
          "bama-north": {
            name: "Bama North",
            pollingUnits: [
              "PU 137 - Bama North Market",
              "PU 138 - Bama North Primary School",
              "PU 139 - Bama North Community Hall",
              "PU 140 - Bama North Health Center",
              "PU 141 - Bama North Mosque",
              "PU 142 - Bama North Post Office",
              "PU 143 - Bama North Police Station",
              "PU 144 - Bama North Fire Station"
            ]
          },
          "bama-south": {
            name: "Bama South",
            pollingUnits: [
              "PU 145 - Bama South Market",
              "PU 146 - Bama South Primary School",
              "PU 147 - Bama South Community Hall",
              "PU 148 - Bama South Health Center",
              "PU 149 - Bama South Mosque",
              "PU 150 - Bama South Post Office",
              "PU 151 - Bama South Police Station",
              "PU 152 - Bama South Fire Station"
            ]
          }
        }
      },
      "ngala": {
        name: "Ngala",
        wards: {
          "ngala-central": {
            name: "Ngala Central",
            pollingUnits: [
              "PU 153 - Ngala Central Market",
              "PU 154 - Ngala Central Primary School",
              "PU 155 - Ngala Central Community Hall",
              "PU 156 - Ngala Central Health Center",
              "PU 157 - Ngala Central Mosque",
              "PU 158 - Ngala Central Post Office",
              "PU 159 - Ngala Central Police Station",
              "PU 160 - Ngala Central Fire Station"
            ]
          },
          "ngala-north": {
            name: "Ngala North",
            pollingUnits: [
              "PU 161 - Ngala North Market",
              "PU 162 - Ngala North Primary School",
              "PU 163 - Ngala North Community Hall",
              "PU 164 - Ngala North Health Center",
              "PU 165 - Ngala North Mosque",
              "PU 166 - Ngala North Post Office",
              "PU 167 - Ngala North Police Station",
              "PU 168 - Ngala North Fire Station"
            ]
          },
          "ngala-south": {
            name: "Ngala South",
            pollingUnits: [
              "PU 169 - Ngala South Market",
              "PU 170 - Ngala South Primary School",
              "PU 171 - Ngala South Community Hall",
              "PU 172 - Ngala South Health Center",
              "PU 173 - Ngala South Mosque",
              "PU 174 - Ngala South Post Office",
              "PU 175 - Ngala South Police Station",
              "PU 176 - Ngala South Fire Station"
            ]
          }
        }
      },
      "abadam": {
        name: "Abadam",
        wards: {
          "abadam-central": {
            name: "Abadam Central",
            pollingUnits: [
              "PU 177 - Abadam Central Market",
              "PU 178 - Abadam Central Primary School",
              "PU 179 - Abadam Central Community Hall",
              "PU 180 - Abadam Central Health Center",
              "PU 181 - Abadam Central Mosque",
              "PU 182 - Abadam Central Post Office",
              "PU 183 - Abadam Central Police Station",
              "PU 184 - Abadam Central Fire Station"
            ]
          },
          "abadam-north": {
            name: "Abadam North",
            pollingUnits: [
              "PU 185 - Abadam North Market",
              "PU 186 - Abadam North Primary School",
              "PU 187 - Abadam North Community Hall",
              "PU 188 - Abadam North Health Center",
              "PU 189 - Abadam North Mosque",
              "PU 190 - Abadam North Post Office",
              "PU 191 - Abadam North Police Station",
              "PU 192 - Abadam North Fire Station"
            ]
          },
          "abadam-south": {
            name: "Abadam South",
            pollingUnits: [
              "PU 193 - Abadam South Market",
              "PU 194 - Abadam South Primary School",
              "PU 195 - Abadam South Community Hall",
              "PU 196 - Abadam South Health Center",
              "PU 197 - Abadam South Mosque",
              "PU 198 - Abadam South Post Office",
              "PU 199 - Abadam South Police Station",
              "PU 200 - Abadam South Fire Station"
            ]
          }
        }
      },
      "guzamala": {
        name: "Guzamala",
        wards: {
          "guzamala-central": {
            name: "Guzamala Central",
            pollingUnits: [
              "PU 201 - Guzamala Central Market",
              "PU 202 - Guzamala Central Primary School",
              "PU 203 - Guzamala Central Community Hall",
              "PU 204 - Guzamala Central Health Center",
              "PU 205 - Guzamala Central Mosque",
              "PU 206 - Guzamala Central Post Office",
              "PU 207 - Guzamala Central Police Station",
              "PU 208 - Guzamala Central Fire Station"
            ]
          },
          "guzamala-north": {
            name: "Guzamala North",
            pollingUnits: [
              "PU 209 - Guzamala North Market",
              "PU 210 - Guzamala North Primary School",
              "PU 211 - Guzamala North Community Hall",
              "PU 212 - Guzamala North Health Center",
              "PU 213 - Guzamala North Mosque",
              "PU 214 - Guzamala North Post Office",
              "PU 215 - Guzamala North Police Station",
              "PU 216 - Guzamala North Fire Station"
            ]
          },
          "guzamala-south": {
            name: "Guzamala South",
            pollingUnits: [
              "PU 217 - Guzamala South Market",
              "PU 218 - Guzamala South Primary School",
              "PU 219 - Guzamala South Community Hall",
              "PU 220 - Guzamala South Health Center",
              "PU 221 - Guzamala South Mosque",
              "PU 222 - Guzamala South Post Office",
              "PU 223 - Guzamala South Police Station",
              "PU 224 - Guzamala South Fire Station"
            ]
          }
        }
      },
      "geidam": {
        name: "Geidam",
        wards: {
          "geidam-central": {
            name: "Geidam Central",
            pollingUnits: [
              "PU 225 - Geidam Central Market",
              "PU 226 - Geidam Central Primary School",
              "PU 227 - Geidam Central Community Hall",
              "PU 228 - Geidam Central Health Center",
              "PU 229 - Geidam Central Mosque",
              "PU 230 - Geidam Central Post Office",
              "PU 231 - Geidam Central Police Station",
              "PU 232 - Geidam Central Fire Station"
            ]
          },
          "geidam-north": {
            name: "Geidam North",
            pollingUnits: [
              "PU 233 - Geidam North Market",
              "PU 234 - Geidam North Primary School",
              "PU 235 - Geidam North Community Hall",
              "PU 236 - Geidam North Health Center",
              "PU 237 - Geidam North Mosque",
              "PU 238 - Geidam North Post Office",
              "PU 239 - Geidam North Police Station",
              "PU 240 - Geidam North Fire Station"
            ]
          },
          "geidam-south": {
            name: "Geidam South",
            pollingUnits: [
              "PU 241 - Geidam South Market",
              "PU 242 - Geidam South Primary School",
              "PU 243 - Geidam South Community Hall",
              "PU 244 - Geidam South Health Center",
              "PU 245 - Geidam South Mosque",
              "PU 246 - Geidam South Post Office",
              "PU 247 - Geidam South Police Station",
              "PU 248 - Geidam South Fire Station"
            ]
          }
        }
      },
      "tarmuwa": {
        name: "Tarmuwa",
        wards: {
          "tarmuwa-central": {
            name: "Tarmuwa Central",
            pollingUnits: [
              "PU 249 - Tarmuwa Central Market",
              "PU 250 - Tarmuwa Central Primary School",
              "PU 251 - Tarmuwa Central Community Hall",
              "PU 252 - Tarmuwa Central Health Center",
              "PU 253 - Tarmuwa Central Mosque",
              "PU 254 - Tarmuwa Central Post Office",
              "PU 255 - Tarmuwa Central Police Station",
              "PU 256 - Tarmuwa Central Fire Station"
            ]
          },
          "tarmuwa-north": {
            name: "Tarmuwa North",
            pollingUnits: [
              "PU 257 - Tarmuwa North Market",
              "PU 258 - Tarmuwa North Primary School",
              "PU 259 - Tarmuwa North Community Hall",
              "PU 260 - Tarmuwa North Health Center",
              "PU 261 - Tarmuwa North Mosque",
              "PU 262 - Tarmuwa North Post Office",
              "PU 263 - Tarmuwa North Police Station",
              "PU 264 - Tarmuwa North Fire Station"
            ]
          },
          "tarmuwa-south": {
            name: "Tarmuwa South",
            pollingUnits: [
              "PU 265 - Tarmuwa South Market",
              "PU 266 - Tarmuwa South Primary School",
              "PU 267 - Tarmuwa South Community Hall",
              "PU 268 - Tarmuwa South Health Center",
              "PU 269 - Tarmuwa South Mosque",
              "PU 270 - Tarmuwa South Post Office",
              "PU 271 - Tarmuwa South Police Station",
              "PU 272 - Tarmuwa South Fire Station"
            ]
          }
        }
      },
      "damaturu": {
        name: "Damaturu",
        wards: {
          "damaturu-central": {
            name: "Damaturu Central",
            pollingUnits: [
              "PU 273 - Damaturu Central Market",
              "PU 274 - Damaturu Central Primary School",
              "PU 275 - Damaturu Central Community Hall",
              "PU 276 - Damaturu Central Health Center",
              "PU 277 - Damaturu Central Mosque",
              "PU 278 - Damaturu Central Post Office",
              "PU 279 - Damaturu Central Police Station",
              "PU 280 - Damaturu Central Fire Station"
            ]
          },
          "damaturu-north": {
            name: "Damaturu North",
            pollingUnits: [
              "PU 281 - Damaturu North Market",
              "PU 282 - Damaturu North Primary School",
              "PU 283 - Damaturu North Community Hall",
              "PU 284 - Damaturu North Health Center",
              "PU 285 - Damaturu North Mosque",
              "PU 286 - Damaturu North Post Office",
              "PU 287 - Damaturu North Police Station",
              "PU 288 - Damaturu North Fire Station"
            ]
          },
          "damaturu-south": {
            name: "Damaturu South",
            pollingUnits: [
              "PU 289 - Damaturu South Market",
              "PU 290 - Damaturu South Primary School",
              "PU 291 - Damaturu South Community Hall",
              "PU 292 - Damaturu South Health Center",
              "PU 293 - Damaturu South Mosque",
              "PU 294 - Damaturu South Post Office",
              "PU 295 - Damaturu South Police Station",
              "PU 296 - Damaturu South Fire Station"
            ]
          }
        }
      },
      "fune": {
        name: "Fune",
        wards: {
          "fune-central": {
            name: "Fune Central",
            pollingUnits: [
              "PU 297 - Fune Central Market",
              "PU 298 - Fune Central Primary School",
              "PU 299 - Fune Central Community Hall",
              "PU 300 - Fune Central Health Center",
              "PU 301 - Fune Central Mosque",
              "PU 302 - Fune Central Post Office",
              "PU 303 - Fune Central Police Station",
              "PU 304 - Fune Central Fire Station"
            ]
          },
          "fune-north": {
            name: "Fune North",
            pollingUnits: [
              "PU 305 - Fune North Market",
              "PU 306 - Fune North Primary School",
              "PU 307 - Fune North Community Hall",
              "PU 308 - Fune North Health Center",
              "PU 309 - Fune North Mosque",
              "PU 310 - Fune North Post Office",
              "PU 311 - Fune North Police Station",
              "PU 312 - Fune North Fire Station"
            ]
          },
          "fune-south": {
            name: "Fune South",
            pollingUnits: [
              "PU 313 - Fune South Market",
              "PU 314 - Fune South Primary School",
              "PU 315 - Fune South Community Hall",
              "PU 316 - Fune South Health Center",
              "PU 317 - Fune South Mosque",
              "PU 318 - Fune South Post Office",
              "PU 319 - Fune South Police Station",
              "PU 320 - Fune South Fire Station"
            ]
          }
        }
      },
      "fika": {
        name: "Fika",
        wards: {
          "fika-central": {
            name: "Fika Central",
            pollingUnits: [
              "PU 321 - Fika Central Market",
              "PU 322 - Fika Central Primary School",
              "PU 323 - Fika Central Community Hall",
              "PU 324 - Fika Central Health Center",
              "PU 325 - Fika Central Mosque",
              "PU 326 - Fika Central Post Office",
              "PU 327 - Fika Central Police Station",
              "PU 328 - Fika Central Fire Station"
            ]
          },
          "fika-north": {
            name: "Fika North",
            pollingUnits: [
              "PU 329 - Fika North Market",
              "PU 330 - Fika North Primary School",
              "PU 331 - Fika North Community Hall",
              "PU 332 - Fika North Health Center",
              "PU 333 - Fika North Mosque",
              "PU 334 - Fika North Post Office",
              "PU 335 - Fika North Police Station",
              "PU 336 - Fika North Fire Station"
            ]
          },
          "fika-south": {
            name: "Fika South",
            pollingUnits: [
              "PU 337 - Fika South Market",
              "PU 338 - Fika South Primary School",
              "PU 339 - Fika South Community Hall",
              "PU 340 - Fika South Health Center",
              "PU 341 - Fika South Mosque",
              "PU 342 - Fika South Post Office",
              "PU 343 - Fika South Police Station",
              "PU 344 - Fika South Fire Station"
            ]
          }
        }
      },
      "potiskum": {
        name: "Potiskum",
        wards: {
          "potiskum-central": {
            name: "Potiskum Central",
            pollingUnits: [
              "PU 345 - Potiskum Central Market",
              "PU 346 - Potiskum Central Primary School",
              "PU 347 - Potiskum Central Community Hall",
              "PU 348 - Potiskum Central Health Center",
              "PU 349 - Potiskum Central Mosque",
              "PU 350 - Potiskum Central Post Office",
              "PU 351 - Potiskum Central Police Station",
              "PU 352 - Potiskum Central Fire Station"
            ]
          },
          "potiskum-north": {
            name: "Potiskum North",
            pollingUnits: [
              "PU 353 - Potiskum North Market",
              "PU 354 - Potiskum North Primary School",
              "PU 355 - Potiskum North Community Hall",
              "PU 356 - Potiskum North Health Center",
              "PU 357 - Potiskum North Mosque",
              "PU 358 - Potiskum North Post Office",
              "PU 359 - Potiskum North Police Station",
              "PU 360 - Potiskum North Fire Station"
            ]
          },
          "potiskum-south": {
            name: "Potiskum South",
            pollingUnits: [
              "PU 361 - Potiskum South Market",
              "PU 362 - Potiskum South Primary School",
              "PU 363 - Potiskum South Community Hall",
              "PU 364 - Potiskum South Health Center",
              "PU 365 - Potiskum South Mosque",
              "PU 366 - Potiskum South Post Office",
              "PU 367 - Potiskum South Police Station",
              "PU 368 - Potiskum South Fire Station"
            ]
          }
        }
      },
      "nangere": {
        name: "Nangere",
        wards: {
          "nangere-central": {
            name: "Nangere Central",
            pollingUnits: [
              "PU 369 - Nangere Central Market",
              "PU 370 - Nangere Central Primary School",
              "PU 371 - Nangere Central Community Hall",
              "PU 372 - Nangere Central Health Center",
              "PU 373 - Nangere Central Mosque",
              "PU 374 - Nangere Central Post Office",
              "PU 375 - Nangere Central Police Station",
              "PU 376 - Nangere Central Fire Station"
            ]
          },
          "nangere-north": {
            name: "Nangere North",
            pollingUnits: [
              "PU 377 - Nangere North Market",
              "PU 378 - Nangere North Primary School",
              "PU 379 - Nangere North Community Hall",
              "PU 380 - Nangere North Health Center",
              "PU 381 - Nangere North Mosque",
              "PU 382 - Nangere North Post Office",
              "PU 383 - Nangere North Police Station",
              "PU 384 - Nangere North Fire Station"
            ]
          },
          "nangere-south": {
            name: "Nangere South",
            pollingUnits: [
              "PU 385 - Nangere South Market",
              "PU 386 - Nangere South Primary School",
              "PU 387 - Nangere South Community Hall",
              "PU 388 - Nangere South Health Center",
              "PU 389 - Nangere South Mosque",
              "PU 390 - Nangere South Post Office",
              "PU 391 - Nangere South Police Station",
              "PU 392 - Nangere South Fire Station"
            ]
          }
        }
      },
      "bade": {
        name: "Bade",
        wards: {
          "bade-central": {
            name: "Bade Central",
            pollingUnits: [
              "PU 393 - Bade Central Market",
              "PU 394 - Bade Central Primary School",
              "PU 395 - Bade Central Community Hall",
              "PU 396 - Bade Central Health Center",
              "PU 397 - Bade Central Mosque",
              "PU 398 - Bade Central Post Office",
              "PU 399 - Bade Central Police Station",
              "PU 400 - Bade Central Fire Station"
            ]
          },
          "bade-north": {
            name: "Bade North",
            pollingUnits: [
              "PU 401 - Bade North Market",
              "PU 402 - Bade North Primary School",
              "PU 403 - Bade North Community Hall",
              "PU 404 - Bade North Health Center",
              "PU 405 - Bade North Mosque",
              "PU 406 - Bade North Post Office",
              "PU 407 - Bade North Police Station",
              "PU 408 - Bade North Fire Station"
            ]
          },
          "bade-south": {
            name: "Bade South",
            pollingUnits: [
              "PU 409 - Bade South Market",
              "PU 410 - Bade South Primary School",
              "PU 411 - Bade South Community Hall",
              "PU 412 - Bade South Health Center",
              "PU 413 - Bade South Mosque",
              "PU 414 - Bade South Post Office",
              "PU 415 - Bade South Police Station",
              "PU 416 - Bade South Fire Station"
            ]
          }
        }
      },
      "jakusko": {
        name: "Jakusko",
        wards: {
          "jakusko-central": {
            name: "Jakusko Central",
            pollingUnits: [
              "PU 417 - Jakusko Central Market",
              "PU 418 - Jakusko Central Primary School",
              "PU 419 - Jakusko Central Community Hall",
              "PU 420 - Jakusko Central Health Center",
              "PU 421 - Jakusko Central Mosque",
              "PU 422 - Jakusko Central Post Office",
              "PU 423 - Jakusko Central Police Station",
              "PU 424 - Jakusko Central Fire Station"
            ]
          },
          "jakusko-north": {
            name: "Jakusko North",
            pollingUnits: [
              "PU 425 - Jakusko North Market",
              "PU 426 - Jakusko North Primary School",
              "PU 427 - Jakusko North Community Hall",
              "PU 428 - Jakusko North Health Center",
              "PU 429 - Jakusko North Mosque",
              "PU 430 - Jakusko North Post Office",
              "PU 431 - Jakusko North Police Station",
              "PU 432 - Jakusko North Fire Station"
            ]
          },
          "jakusko-south": {
            name: "Jakusko South",
            pollingUnits: [
              "PU 433 - Jakusko South Market",
              "PU 434 - Jakusko South Primary School",
              "PU 435 - Jakusko South Community Hall",
              "PU 436 - Jakusko South Health Center",
              "PU 437 - Jakusko South Mosque",
              "PU 438 - Jakusko South Post Office",
              "PU 439 - Jakusko South Police Station",
              "PU 440 - Jakusko South Fire Station"
            ]
          }
        }
      },
      "karasuwa": {
        name: "Karasuwa",
        wards: {
          "karasuwa-central": {
            name: "Karasuwa Central",
            pollingUnits: [
              "PU 441 - Karasuwa Central Market",
              "PU 442 - Karasuwa Central Primary School",
              "PU 443 - Karasuwa Central Community Hall",
              "PU 444 - Karasuwa Central Health Center",
              "PU 445 - Karasuwa Central Mosque",
              "PU 446 - Karasuwa Central Post Office",
              "PU 447 - Karasuwa Central Police Station",
              "PU 448 - Karasuwa Central Fire Station"
            ]
          },
          "karasuwa-north": {
            name: "Karasuwa North",
            pollingUnits: [
              "PU 449 - Karasuwa North Market",
              "PU 450 - Karasuwa North Primary School",
              "PU 451 - Karasuwa North Community Hall",
              "PU 452 - Karasuwa North Health Center",
              "PU 453 - Karasuwa North Mosque",
              "PU 454 - Karasuwa North Post Office",
              "PU 455 - Karasuwa North Police Station",
              "PU 456 - Karasuwa North Fire Station"
            ]
          },
          "karasuwa-south": {
            name: "Karasuwa South",
            pollingUnits: [
              "PU 457 - Karasuwa South Market",
              "PU 458 - Karasuwa South Primary School",
              "PU 459 - Karasuwa South Community Hall",
              "PU 460 - Karasuwa South Health Center",
              "PU 461 - Karasuwa South Mosque",
              "PU 462 - Karasuwa South Post Office",
              "PU 463 - Karasuwa South Police Station",
              "PU 464 - Karasuwa South Fire Station"
            ]
          }
        }
      },
      "yusufari": {
        name: "Yusufari",
        wards: {
          "yusufari-central": {
            name: "Yusufari Central",
            pollingUnits: [
              "PU 465 - Yusufari Central Market",
              "PU 466 - Yusufari Central Primary School",
              "PU 467 - Yusufari Central Community Hall",
              "PU 468 - Yusufari Central Health Center",
              "PU 469 - Yusufari Central Mosque",
              "PU 470 - Yusufari Central Post Office",
              "PU 471 - Yusufari Central Police Station",
              "PU 472 - Yusufari Central Fire Station"
            ]
          },
          "yusufari-north": {
            name: "Yusufari North",
            pollingUnits: [
              "PU 473 - Yusufari North Market",
              "PU 474 - Yusufari North Primary School",
              "PU 475 - Yusufari North Community Hall",
              "PU 476 - Yusufari North Health Center",
              "PU 477 - Yusufari North Mosque",
              "PU 478 - Yusufari North Post Office",
              "PU 479 - Yusufari North Police Station",
              "PU 480 - Yusufari North Fire Station"
            ]
          },
          "yusufari-south": {
            name: "Yusufari South",
            pollingUnits: [
              "PU 481 - Yusufari South Market",
              "PU 482 - Yusufari South Primary School",
              "PU 483 - Yusufari South Community Hall",
              "PU 484 - Yusufari South Health Center",
              "PU 485 - Yusufari South Mosque",
              "PU 486 - Yusufari South Post Office",
              "PU 487 - Yusufari South Police Station",
              "PU 488 - Yusufari South Fire Station"
            ]
          }
        }
      },
      "machina": {
        name: "Machina",
        wards: {
          "machina-central": {
            name: "Machina Central",
            pollingUnits: [
              "PU 489 - Machina Central Market",
              "PU 490 - Machina Central Primary School",
              "PU 491 - Machina Central Community Hall",
              "PU 492 - Machina Central Health Center",
              "PU 493 - Machina Central Mosque",
              "PU 494 - Machina Central Post Office",
              "PU 495 - Machina Central Police Station",
              "PU 496 - Machina Central Fire Station"
            ]
          },
          "machina-north": {
            name: "Machina North",
            pollingUnits: [
              "PU 497 - Machina North Market",
              "PU 498 - Machina North Primary School",
              "PU 499 - Machina North Community Hall",
              "PU 500 - Machina North Health Center",
              "PU 501 - Machina North Mosque",
              "PU 502 - Machina North Post Office",
              "PU 503 - Machina North Police Station",
              "PU 504 - Machina North Fire Station"
            ]
          },
          "machina-south": {
            name: "Machina South",
            pollingUnits: [
              "PU 505 - Machina South Market",
              "PU 506 - Machina South Primary School",
              "PU 507 - Machina South Community Hall",
              "PU 508 - Machina South Health Center",
              "PU 509 - Machina South Mosque",
              "PU 510 - Machina South Post Office",
              "PU 511 - Machina South Police Station",
              "PU 512 - Machina South Fire Station"
            ]
          }
        }
      },
      "nguru": {
        name: "Nguru",
        wards: {
          "nguru-central": {
            name: "Nguru Central",
            pollingUnits: [
              "PU 513 - Nguru Central Market",
              "PU 514 - Nguru Central Primary School",
              "PU 515 - Nguru Central Community Hall",
              "PU 516 - Nguru Central Health Center",
              "PU 517 - Nguru Central Mosque",
              "PU 518 - Nguru Central Post Office",
              "PU 519 - Nguru Central Police Station",
              "PU 520 - Nguru Central Fire Station"
            ]
          },
          "nguru-north": {
            name: "Nguru North",
            pollingUnits: [
              "PU 521 - Nguru North Market",
              "PU 522 - Nguru North Primary School",
              "PU 523 - Nguru North Community Hall",
              "PU 524 - Nguru North Health Center",
              "PU 525 - Nguru North Mosque",
              "PU 526 - Nguru North Post Office",
              "PU 527 - Nguru North Police Station",
              "PU 528 - Nguru North Fire Station"
            ]
          },
          "nguru-south": {
            name: "Nguru South",
            pollingUnits: [
              "PU 529 - Nguru South Market",
              "PU 530 - Nguru South Primary School",
              "PU 531 - Nguru South Community Hall",
              "PU 532 - Nguru South Health Center",
              "PU 533 - Nguru South Mosque",
              "PU 534 - Nguru South Post Office",
              "PU 535 - Nguru South Police Station",
              "PU 536 - Nguru South Fire Station"
            ]
          }
        }
      },
      "yunusari": {
        name: "Yunusari",
        wards: {
          "yunusari-central": {
            name: "Yunusari Central",
            pollingUnits: [
              "PU 537 - Yunusari Central Market",
              "PU 538 - Yunusari Central Primary School",
              "PU 539 - Yunusari Central Community Hall",
              "PU 540 - Yunusari Central Health Center",
              "PU 541 - Yunusari Central Mosque",
              "PU 542 - Yunusari Central Post Office",
              "PU 543 - Yunusari Central Police Station",
              "PU 544 - Yunusari Central Fire Station"
            ]
          },
          "yunusari-north": {
            name: "Yunusari North",
            pollingUnits: [
              "PU 545 - Yunusari North Market",
              "PU 546 - Yunusari North Primary School",
              "PU 547 - Yunusari North Community Hall",
              "PU 548 - Yunusari North Health Center",
              "PU 549 - Yunusari North Mosque",
              "PU 550 - Yunusari North Post Office",
              "PU 551 - Yunusari North Police Station",
              "PU 552 - Yunusari North Fire Station"
            ]
          },
          "yunusari-south": {
            name: "Yunusari South",
            pollingUnits: [
              "PU 553 - Yunusari South Market",
              "PU 554 - Yunusari South Primary School",
              "PU 555 - Yunusari South Community Hall",
              "PU 556 - Yunusari South Health Center",
              "PU 557 - Yunusari South Mosque",
              "PU 558 - Yunusari South Post Office",
              "PU 559 - Yunusari South Police Station",
              "PU 560 - Yunusari South Fire Station"
            ]
          }
        }
      },
      "gulani": {
        name: "Gulani",
        wards: {
          "gulani-central": {
            name: "Gulani Central",
            pollingUnits: [
              "PU 185 - Gulani Central Market",
              "PU 186 - Gulani Central Primary School",
              "PU 187 - Gulani Central Community Hall",
              "PU 188 - Gulani Central Health Center",
              "PU 189 - Gulani Central Mosque",
              "PU 190 - Gulani Central Post Office",
              "PU 191 - Gulani Central Police Station",
              "PU 192 - Gulani Central Fire Station"
            ]
          }
        }
      },
      "hawul": {
        name: "Hawul",
        wards: {
          "hawul-central": {
            name: "Hawul Central",
            pollingUnits: [
              "PU 193 - Hawul Central Market",
              "PU 194 - Hawul Central Primary School",
              "PU 195 - Hawul Central Community Hall",
              "PU 196 - Hawul Central Health Center",
              "PU 197 - Hawul Central Mosque",
              "PU 198 - Hawul Central Post Office",
              "PU 199 - Hawul Central Police Station",
              "PU 200 - Hawul Central Fire Station"
            ]
          }
        }
      },
      "shani": {
        name: "Shani",
        wards: {
          "shani-central": {
            name: "Shani Central",
            pollingUnits: [
              "PU 201 - Shani Central Market",
              "PU 202 - Shani Central Primary School",
              "PU 203 - Shani Central Community Hall",
              "PU 204 - Shani Central Health Center",
              "PU 205 - Shani Central Mosque",
              "PU 206 - Shani Central Post Office",
              "PU 207 - Shani Central Police Station",
              "PU 208 - Shani Central Fire Station"
            ]
          }
        }
      },
      "biu": {
        name: "Biu",
        wards: {
          "biu-central": {
            name: "Biu Central",
            pollingUnits: [
              "PU 209 - Biu Central Market",
              "PU 210 - Biu Central Primary School",
              "PU 211 - Biu Central Community Hall",
              "PU 212 - Biu Central Health Center",
              "PU 213 - Biu Central Mosque",
              "PU 214 - Biu Central Post Office",
              "PU 215 - Biu Central Police Station",
              "PU 216 - Biu Central Fire Station"
            ]
          }
        }
      },
      "kwaya-kusar": {
        name: "Kwaya Kusar",
        wards: {
          "kwaya-kusar-central": {
            name: "Kwaya Kusar Central",
            pollingUnits: [
              "PU 217 - Kwaya Kusar Central Market",
              "PU 218 - Kwaya Kusar Central Primary School",
              "PU 219 - Kwaya Kusar Central Community Hall",
              "PU 220 - Kwaya Kusar Central Health Center",
              "PU 221 - Kwaya Kusar Central Mosque",
              "PU 222 - Kwaya Kusar Central Post Office",
              "PU 223 - Kwaya Kusar Central Police Station",
              "PU 224 - Kwaya Kusar Central Fire Station"
            ]
          }
        }
      },
      "bayo": {
        name: "Bayo",
        wards: {
          "bayo-central": {
            name: "Bayo Central",
            pollingUnits: [
              "PU 225 - Bayo Central Market",
              "PU 226 - Bayo Central Primary School",
              "PU 227 - Bayo Central Community Hall",
              "PU 228 - Bayo Central Health Center",
              "PU 229 - Bayo Central Mosque",
              "PU 230 - Bayo Central Post Office",
              "PU 231 - Bayo Central Police Station",
              "PU 232 - Bayo Central Fire Station"
            ]
          }
        }
      },

    }
  },
  crossRiver: {
    name: "Cross River",
    lgas: {
      "calabar-municipal": {
        name: "Calabar Municipal",
        wards: {
          "calabar-central": {
            name: "Calabar Central",
            pollingUnits: [
              "PU 001 - Calabar Central Market",
              "PU 002 - Calabar Central Primary School",
              "PU 003 - Calabar Central Community Hall",
              "PU 004 - Calabar Central Health Center",
              "PU 005 - Calabar Central Mosque",
              "PU 006 - Calabar Central Post Office",
              "PU 007 - Calabar Central Police Station",
              "PU 008 - Calabar Central Fire Station"
            ]
          }
        }
      },
      "calabar-south": {
        name: "Calabar South",
        wards: {
          "calabar-south-central": {
            name: "Calabar South Central",
            pollingUnits: [
              "PU 009 - Calabar South Central Market",
              "PU 010 - Calabar South Central Primary School",
              "PU 011 - Calabar South Central Community Hall",
              "PU 012 - Calabar South Central Health Center",
              "PU 013 - Calabar South Central Mosque",
              "PU 014 - Calabar South Central Post Office",
              "PU 015 - Calabar South Central Police Station",
              "PU 016 - Calabar South Central Fire Station"
            ]
          }
        }
      },
      "akpabuyo": {
        name: "Akpabuyo",
        wards: {
          "akpabuyo-central": {
            name: "Akpabuyo Central",
            pollingUnits: [
              "PU 017 - Akpabuyo Central Market",
              "PU 018 - Akpabuyo Central Primary School",
              "PU 019 - Akpabuyo Central Community Hall",
              "PU 020 - Akpabuyo Central Health Center",
              "PU 021 - Akpabuyo Central Mosque",
              "PU 022 - Akpabuyo Central Post Office",
              "PU 023 - Akpabuyo Central Police Station",
              "PU 024 - Akpabuyo Central Fire Station"
            ]
          }
        }
      },
      "bakassi": {
        name: "Bakassi",
        wards: {
          "bakassi-central": {
            name: "Bakassi Central",
            pollingUnits: [
              "PU 025 - Bakassi Central Market",
              "PU 026 - Bakassi Central Primary School",
              "PU 027 - Bakassi Central Community Hall",
              "PU 028 - Bakassi Central Health Center",
              "PU 029 - Bakassi Central Mosque",
              "PU 030 - Bakassi Central Post Office",
              "PU 031 - Bakassi Central Police Station",
              "PU 032 - Bakassi Central Fire Station"
            ]
          }
        }
      },
      "biase": {
        name: "Biase",
        wards: {
          "biase-central": {
            name: "Biase Central",
            pollingUnits: [
              "PU 033 - Biase Central Market",
              "PU 034 - Biase Central Primary School",
              "PU 035 - Biase Central Community Hall",
              "PU 036 - Biase Central Health Center",
              "PU 037 - Biase Central Mosque",
              "PU 038 - Biase Central Post Office",
              "PU 039 - Biase Central Police Station",
              "PU 040 - Biase Central Fire Station"
            ]
          }
        }
      },
      "abuakwa": {
        name: "Abuakwa",
        wards: {
          "abuakwa-central": {
            name: "Abuakwa Central",
            pollingUnits: [
              "PU 041 - Abuakwa Central Market",
              "PU 042 - Abuakwa Central Primary School",
              "PU 043 - Abuakwa Central Community Hall",
              "PU 044 - Abuakwa Central Health Center",
              "PU 045 - Abuakwa Central Mosque",
              "PU 046 - Abuakwa Central Post Office",
              "PU 047 - Abuakwa Central Police Station",
              "PU 048 - Abuakwa Central Fire Station"
            ]
          }
        }
      },
      "akamkpa": {
        name: "Akamkpa",
        wards: {
          "akamkpa-central": {
            name: "Akamkpa Central",
            pollingUnits: [
              "PU 049 - Akamkpa Central Market",
              "PU 050 - Akamkpa Central Primary School",
              "PU 051 - Akamkpa Central Community Hall",
              "PU 052 - Akamkpa Central Health Center",
              "PU 053 - Akamkpa Central Mosque",
              "PU 054 - Akamkpa Central Post Office",
              "PU 055 - Akamkpa Central Police Station",
              "PU 056 - Akamkpa Central Fire Station"
            ]
          }
        }
      },
      "obanliku": {
        name: "Obanliku",
        wards: {
          "obanliku-central": {
            name: "Obanliku Central",
            pollingUnits: [
              "PU 057 - Obanliku Central Market",
              "PU 058 - Obanliku Central Primary School",
              "PU 059 - Obanliku Central Community Hall",
              "PU 060 - Obanliku Central Health Center",
              "PU 061 - Obanliku Central Mosque",
              "PU 062 - Obanliku Central Post Office",
              "PU 063 - Obanliku Central Police Station",
              "PU 064 - Obanliku Central Fire Station"
            ]
          }
        }
      },
      "obudu": {
        name: "Obudu",
        wards: {
          "obudu-central": {
            name: "Obudu Central",
            pollingUnits: [
              "PU 065 - Obudu Central Market",
              "PU 066 - Obudu Central Primary School",
              "PU 067 - Obudu Central Community Hall",
              "PU 068 - Obudu Central Health Center",
              "PU 069 - Obudu Central Mosque",
              "PU 070 - Obudu Central Post Office",
              "PU 071 - Obudu Central Police Station",
              "PU 072 - Obudu Central Fire Station"
            ]
          }
        }
      },
      "ogoja": {
        name: "Ogoja",
        wards: {
          "ogoja-central": {
            name: "Ogoja Central",
            pollingUnits: [
              "PU 073 - Ogoja Central Market",
              "PU 074 - Ogoja Central Primary School",
              "PU 075 - Ogoja Central Community Hall",
              "PU 076 - Ogoja Central Health Center",
              "PU 077 - Ogoja Central Mosque",
              "PU 078 - Ogoja Central Post Office",
              "PU 079 - Ogoja Central Police Station",
              "PU 080 - Ogoja Central Fire Station"
            ]
          }
        }
      },
      "yala": {
        name: "Yala",
        wards: {
          "yala-central": {
            name: "Yala Central",
            pollingUnits: [
              "PU 081 - Yala Central Market",
              "PU 082 - Yala Central Primary School",
              "PU 083 - Yala Central Community Hall",
              "PU 084 - Yala Central Health Center",
              "PU 085 - Yala Central Mosque",
              "PU 086 - Yala Central Post Office",
              "PU 087 - Yala Central Police Station",
              "PU 088 - Yala Central Fire Station"
            ]
          }
        }
      },
      "odukpani": {
        name: "Odukpani",
        wards: {
          "odukpani-central": {
            name: "Odukpani Central",
            pollingUnits: [
              "PU 089 - Odukpani Central Market",
              "PU 090 - Odukpani Central Primary School",
              "PU 091 - Odukpani Central Community Hall",
              "PU 092 - Odukpani Central Health Center",
              "PU 093 - Odukpani Central Mosque",
              "PU 094 - Odukpani Central Post Office",
              "PU 095 - Odukpani Central Police Station",
              "PU 096 - Odukpani Central Fire Station"
            ]
          }
        }
      },
      "etung": {
        name: "Etung",
        wards: {
          "etung-central": {
            name: "Etung Central",
            pollingUnits: [
              "PU 097 - Etung Central Market",
              "PU 098 - Etung Central Primary School",
              "PU 099 - Etung Central Community Hall",
              "PU 100 - Etung Central Health Center",
              "PU 101 - Etung Central Mosque",
              "PU 102 - Etung Central Post Office",
              "PU 103 - Etung Central Police Station",
              "PU 104 - Etung Central Fire Station"
            ]
          }
        }
      },
      "ikom": {
        name: "Ikom",
        wards: {
          "ikom-central": {
            name: "Ikom Central",
            pollingUnits: [
              "PU 105 - Ikom Central Market",
              "PU 106 - Ikom Central Primary School",
              "PU 107 - Ikom Central Community Hall",
              "PU 108 - Ikom Central Health Center",
              "PU 109 - Ikom Central Mosque",
              "PU 110 - Ikom Central Post Office",
              "PU 111 - Ikom Central Police Station",
              "PU 112 - Ikom Central Fire Station"
            ]
          }
        }
      },
      "boki": {
        name: "Boki",
        wards: {
          "boki-central": {
            name: "Boki Central",
            pollingUnits: [
              "PU 113 - Boki Central Market",
              "PU 114 - Boki Central Primary School",
              "PU 115 - Boki Central Community Hall",
              "PU 116 - Boki Central Health Center",
              "PU 117 - Boki Central Mosque",
              "PU 118 - Boki Central Post Office",
              "PU 119 - Boki Central Police Station",
              "PU 120 - Boki Central Fire Station"
            ]
          }
        }
      }
    }
  },
  delta: {
    name: "Delta",
    lgas: {
      "asaba": {
        name: "Asaba",
        wards: {
          "asaba-central": {
            name: "Asaba Central",
            pollingUnits: [
              "PU 001 - Asaba Central Market",
              "PU 002 - Asaba Central Primary School",
              "PU 003 - Asaba Central Community Hall",
              "PU 004 - Asaba Central Health Center",
              "PU 005 - Asaba Central Mosque",
              "PU 006 - Asaba Central Post Office",
              "PU 007 - Asaba Central Police Station",
              "PU 008 - Asaba Central Fire Station"
            ]
          }
        }
      },
      "okpe": {
        name: "Okpe",
        wards: {
          "okpe-central": {
            name: "Okpe Central",
            pollingUnits: [
              "PU 009 - Okpe Central Market",
              "PU 010 - Okpe Central Primary School",
              "PU 011 - Okpe Central Community Hall",
              "PU 012 - Okpe Central Health Center",
              "PU 013 - Okpe Central Mosque",
              "PU 014 - Okpe Central Post Office",
              "PU 015 - Okpe Central Police Station",
              "PU 016 - Okpe Central Fire Station"
            ]
          }
        }
      },
      "sapele": {
        name: "Sapele",
        wards: {
          "sapele-central": {
            name: "Sapele Central",
            pollingUnits: [
              "PU 017 - Sapele Central Market",
              "PU 018 - Sapele Central Primary School",
              "PU 019 - Sapele Central Community Hall",
              "PU 020 - Sapele Central Health Center",
              "PU 021 - Sapele Central Mosque",
              "PU 022 - Sapele Central Post Office",
              "PU 023 - Sapele Central Police Station",
              "PU 024 - Sapele Central Fire Station"
            ]
          }
        }
      },
      "ughelli-north": {
        name: "Ughelli North",
        wards: {
          "ughelli-north-central": {
            name: "Ughelli North Central",
            pollingUnits: [
              "PU 025 - Ughelli North Central Market",
              "PU 026 - Ughelli North Central Primary School",
              "PU 027 - Ughelli North Central Community Hall",
              "PU 028 - Ughelli North Central Health Center",
              "PU 029 - Ughelli North Central Mosque",
              "PU 030 - Ughelli North Central Post Office",
              "PU 031 - Ughelli North Central Police Station",
              "PU 032 - Ughelli North Central Fire Station"
            ]
          }
        }
      },
      "ughelli-south": {
        name: "Ughelli South",
        wards: {
          "ughelli-south-central": {
            name: "Ughelli South Central",
            pollingUnits: [
              "PU 033 - Ughelli South Central Market",
              "PU 034 - Ughelli South Central Primary School",
              "PU 035 - Ughelli South Central Community Hall",
              "PU 036 - Ughelli South Central Health Center",
              "PU 037 - Ughelli South Central Mosque",
              "PU 038 - Ughelli South Central Post Office",
              "PU 039 - Ughelli South Central Police Station",
              "PU 040 - Ughelli South Central Fire Station"
            ]
          }
        }
      },
      "ethiope-east": {
        name: "Ethiope East",
        wards: {
          "ethiope-east-central": {
            name: "Ethiope East Central",
            pollingUnits: [
              "PU 041 - Ethiope East Central Market",
              "PU 042 - Ethiope East Central Primary School",
              "PU 043 - Ethiope East Central Community Hall",
              "PU 044 - Ethiope East Central Health Center",
              "PU 045 - Ethiope East Central Mosque",
              "PU 046 - Ethiope East Central Post Office",
              "PU 047 - Ethiope East Central Police Station",
              "PU 048 - Ethiope East Central Fire Station"
            ]
          }
        }
      },
      "ethiope-west": {
        name: "Ethiope West",
        wards: {
          "ethiope-west-central": {
            name: "Ethiope West Central",
            pollingUnits: [
              "PU 049 - Ethiope West Central Market",
              "PU 050 - Ethiope West Central Primary School",
              "PU 051 - Ethiope West Central Community Hall",
              "PU 052 - Ethiope West Central Health Center",
              "PU 053 - Ethiope West Central Mosque",
              "PU 054 - Ethiope West Central Post Office",
              "PU 055 - Ethiope West Central Police Station",
              "PU 056 - Ethiope West Central Fire Station"
            ]
          }
        }
      },
      "isoko-north": {
        name: "Isoko North",
        wards: {
          "isoko-north-central": {
            name: "Isoko North Central",
            pollingUnits: [
              "PU 057 - Isoko North Central Market",
              "PU 058 - Isoko North Central Primary School",
              "PU 059 - Isoko North Central Community Hall",
              "PU 060 - Isoko North Central Health Center",
              "PU 061 - Isoko North Central Mosque",
              "PU 062 - Isoko North Central Post Office",
              "PU 063 - Isoko North Central Police Station",
              "PU 064 - Isoko North Central Fire Station"
            ]
          }
        }
      },
      "isoko-south": {
        name: "Isoko South",
        wards: {
          "isoko-south-central": {
            name: "Isoko South Central",
            pollingUnits: [
              "PU 065 - Isoko South Central Market",
              "PU 066 - Isoko South Central Primary School",
              "PU 067 - Isoko South Central Community Hall",
              "PU 068 - Isoko South Central Health Center",
              "PU 069 - Isoko South Central Mosque",
              "PU 070 - Isoko South Central Post Office",
              "PU 071 - Isoko South Central Police Station",
              "PU 072 - Isoko South Central Fire Station"
            ]
          }
        }
      },
      "ndokwa-east": {
        name: "Ndokwa East",
        wards: {
          "ndokwa-east-central": {
            name: "Ndokwa East Central",
            pollingUnits: [
              "PU 073 - Ndokwa East Central Market",
              "PU 074 - Ndokwa East Central Primary School",
              "PU 075 - Ndokwa East Central Community Hall",
              "PU 076 - Ndokwa East Central Health Center",
              "PU 077 - Ndokwa East Central Mosque",
              "PU 078 - Ndokwa East Central Post Office",
              "PU 079 - Ndokwa East Central Police Station",
              "PU 080 - Ndokwa East Central Fire Station"
            ]
          }
        }
      },
      "ndokwa-west": {
        name: "Ndokwa West",
        wards: {
          "ndokwa-west-central": {
            name: "Ndokwa West Central",
            pollingUnits: [
              "PU 081 - Ndokwa West Central Market",
              "PU 082 - Ndokwa West Central Primary School",
              "PU 083 - Ndokwa West Central Community Hall",
              "PU 084 - Ndokwa West Central Health Center",
              "PU 085 - Ndokwa West Central Mosque",
              "PU 086 - Ndokwa West Central Post Office",
              "PU 087 - Ndokwa West Central Police Station",
              "PU 088 - Ndokwa West Central Fire Station"
            ]
          }
        }
      },
      "ukwuani": {
        name: "Ukwuani",
        wards: {
          "ukwuani-central": {
            name: "Ukwuani Central",
            pollingUnits: [
              "PU 089 - Ukwuani Central Market",
              "PU 090 - Ukwuani Central Primary School",
              "PU 091 - Ukwuani Central Community Hall",
              "PU 092 - Ukwuani Central Health Center",
              "PU 093 - Ukwuani Central Mosque",
              "PU 094 - Ukwuani Central Post Office",
              "PU 095 - Ukwuani Central Police Station",
              "PU 096 - Ukwuani Central Fire Station"
            ]
          }
        }
      },
      "bomadi": {
        name: "Bomadi",
        wards: {
          "bomadi-central": {
            name: "Bomadi Central",
            pollingUnits: [
              "PU 097 - Bomadi Central Market",
              "PU 098 - Bomadi Central Primary School",
              "PU 099 - Bomadi Central Community Hall",
              "PU 100 - Bomadi Central Health Center",
              "PU 101 - Bomadi Central Mosque",
              "PU 102 - Bomadi Central Post Office",
              "PU 103 - Bomadi Central Police Station",
              "PU 104 - Bomadi Central Fire Station"
            ]
          }
        }
      },
      "burutu": {
        name: "Burutu",
        wards: {
          "burutu-central": {
            name: "Burutu Central",
            pollingUnits: [
              "PU 105 - Burutu Central Market",
              "PU 106 - Burutu Central Primary School",
              "PU 107 - Burutu Central Community Hall",
              "PU 108 - Burutu Central Health Center",
              "PU 109 - Burutu Central Mosque",
              "PU 110 - Burutu Central Post Office",
              "PU 111 - Burutu Central Police Station",
              "PU 112 - Burutu Central Fire Station"
            ]
          }
        }
      },
      "warri-north": {
        name: "Warri North",
        wards: {
          "warri-north-central": {
            name: "Warri North Central",
            pollingUnits: [
              "PU 113 - Warri North Central Market",
              "PU 114 - Warri North Central Primary School",
              "PU 115 - Warri North Central Community Hall",
              "PU 116 - Warri North Central Health Center",
              "PU 117 - Warri North Central Mosque",
              "PU 118 - Warri North Central Post Office",
              "PU 119 - Warri North Central Police Station",
              "PU 120 - Warri North Central Fire Station"
            ]
          }
        }
      },
      "warri-south": {
        name: "Warri South",
        wards: {
          "warri-south-central": {
            name: "Warri South Central",
            pollingUnits: [
              "PU 121 - Warri South Central Market",
              "PU 122 - Warri South Central Primary School",
              "PU 123 - Warri South Central Community Hall",
              "PU 124 - Warri South Central Health Center",
              "PU 125 - Warri South Central Mosque",
              "PU 126 - Warri South Central Post Office",
              "PU 127 - Warri South Central Police Station",
              "PU 128 - Warri South Central Fire Station"
            ]
          }
        }
      },
      "warri-south-west": {
        name: "Warri South West",
        wards: {
          "warri-south-west-central": {
            name: "Warri South West Central",
            pollingUnits: [
              "PU 129 - Warri South West Central Market",
              "PU 130 - Warri South West Central Primary School",
              "PU 131 - Warri South West Central Community Hall",
              "PU 132 - Warri South West Central Health Center",
              "PU 133 - Warri South West Central Mosque",
              "PU 134 - Warri South West Central Post Office",
              "PU 135 - Warri South West Central Police Station",
              "PU 136 - Warri South West Central Fire Station"
            ]
          }
        }
      },
      "anioma": {
        name: "Anioma",
        wards: {
          "anioma-central": {
            name: "Anioma Central",
            pollingUnits: [
              "PU 137 - Anioma Central Market",
              "PU 138 - Anioma Central Primary School",
              "PU 139 - Anioma Central Community Hall",
              "PU 140 - Anioma Central Health Center",
              "PU 141 - Anioma Central Mosque",
              "PU 142 - Anioma Central Post Office",
              "PU 143 - Anioma Central Police Station",
              "PU 144 - Anioma Central Fire Station"
            ]
          }
        }
      },
      "oshimili-north": {
        name: "Oshimili North",
        wards: {
          "oshimili-north-central": {
            name: "Oshimili North Central",
            pollingUnits: [
              "PU 145 - Oshimili North Central Market",
              "PU 146 - Oshimili North Central Primary School",
              "PU 147 - Oshimili North Central Community Hall",
              "PU 148 - Oshimili North Central Health Center",
              "PU 149 - Oshimili North Central Mosque",
              "PU 150 - Oshimili North Central Post Office",
              "PU 151 - Oshimili North Central Police Station",
              "PU 152 - Oshimili North Central Fire Station"
            ]
          }
        }
      },
      "oshimili-south": {
        name: "Oshimili South",
        wards: {
          "oshimili-south-central": {
            name: "Oshimili South Central",
            pollingUnits: [
              "PU 153 - Oshimili South Central Market",
              "PU 154 - Oshimili South Central Primary School",
              "PU 155 - Oshimili South Central Community Hall",
              "PU 156 - Oshimili South Central Health Center",
              "PU 157 - Oshimili South Central Mosque",
              "PU 158 - Oshimili South Central Post Office",
              "PU 159 - Oshimili South Central Police Station",
              "PU 160 - Oshimili South Central Fire Station"
            ]
          }
        }
      }
    }
  },
  ebonyi: {
    name: "Ebonyi",
    lgas: {
      "abakaliki": {
        name: "Abakaliki",
        wards: {
          "abakaliki-central": {
            name: "Abakaliki Central",
            pollingUnits: [
              "PU 001 - Abakaliki Central Market",
              "PU 002 - Abakaliki Central Primary School",
              "PU 003 - Abakaliki Central Community Hall",
              "PU 004 - Abakaliki Central Health Center",
              "PU 005 - Abakaliki Central Mosque",
              "PU 006 - Abakaliki Central Post Office",
              "PU 007 - Abakaliki Central Police Station",
              "PU 008 - Abakaliki Central Fire Station"
            ]
          }
        }
      },
      "afikpo-north": {
        name: "Afikpo North",
        wards: {
          "afikpo-north-central": {
            name: "Afikpo North Central",
            pollingUnits: [
              "PU 009 - Afikpo North Central Market",
              "PU 010 - Afikpo North Central Primary School",
              "PU 011 - Afikpo North Central Community Hall",
              "PU 012 - Afikpo North Central Health Center",
              "PU 013 - Afikpo North Central Mosque",
              "PU 014 - Afikpo North Central Post Office",
              "PU 015 - Afikpo North Central Police Station",
              "PU 016 - Afikpo North Central Fire Station"
            ]
          }
        }
      },
      "afikpo-south": {
        name: "Afikpo South",
        wards: {
          "afikpo-south-central": {
            name: "Afikpo South Central",
            pollingUnits: [
              "PU 017 - Afikpo South Central Market",
              "PU 018 - Afikpo South Central Primary School",
              "PU 019 - Afikpo South Central Community Hall",
              "PU 020 - Afikpo South Central Health Center",
              "PU 021 - Afikpo South Central Mosque",
              "PU 022 - Afikpo South Central Post Office",
              "PU 023 - Afikpo South Central Police Station",
              "PU 024 - Afikpo South Central Fire Station"
            ]
          }
        }
      },
      "onicha": {
        name: "Onicha",
        wards: {
          "onicha-central": {
            name: "Onicha Central",
            pollingUnits: [
              "PU 025 - Onicha Central Market",
              "PU 026 - Onicha Central Primary School",
              "PU 027 - Onicha Central Community Hall",
              "PU 028 - Onicha Central Health Center",
              "PU 029 - Onicha Central Mosque",
              "PU 030 - Onicha Central Post Office",
              "PU 031 - Onicha Central Police Station",
              "PU 032 - Onicha Central Fire Station"
            ]
          }
        }
      },
      "ozizza": {
        name: "Ozizza",
        wards: {
          "ozizza-central": {
            name: "Ozizza Central",
            pollingUnits: [
              "PU 033 - Ozizza Central Market",
              "PU 034 - Ozizza Central Primary School",
              "PU 035 - Ozizza Central Community Hall",
              "PU 036 - Ozizza Central Health Center",
              "PU 037 - Ozizza Central Mosque",
              "PU 038 - Ozizza Central Post Office",
              "PU 039 - Ozizza Central Police Station",
              "PU 040 - Ozizza Central Fire Station"
            ]
          }
        }
      },
      "edda": {
        name: "Edda",
        wards: {
          "edda-central": {
            name: "Edda Central",
            pollingUnits: [
              "PU 041 - Edda Central Market",
              "PU 042 - Edda Central Primary School",
              "PU 043 - Edda Central Community Hall",
              "PU 044 - Edda Central Health Center",
              "PU 045 - Edda Central Mosque",
              "PU 046 - Edda Central Post Office",
              "PU 047 - Edda Central Police Station",
              "PU 048 - Edda Central Fire Station"
            ]
          }
        }
      },
      "ikwo": {
        name: "Ikwo",
        wards: {
          "ikwo-central": {
            name: "Ikwo Central",
            pollingUnits: [
              "PU 049 - Ikwo Central Market",
              "PU 050 - Ikwo Central Primary School",
              "PU 051 - Ikwo Central Community Hall",
              "PU 052 - Ikwo Central Health Center",
              "PU 053 - Ikwo Central Mosque",
              "PU 054 - Ikwo Central Post Office",
              "PU 055 - Ikwo Central Police Station",
              "PU 056 - Ikwo Central Fire Station"
            ]
          }
        }
      },
      "ezza-north": {
        name: "Ezza North",
        wards: {
          "ezza-north-central": {
            name: "Ezza North Central",
            pollingUnits: [
              "PU 057 - Ezza North Central Market",
              "PU 058 - Ezza North Central Primary School",
              "PU 059 - Ezza North Central Community Hall",
              "PU 060 - Ezza North Central Health Center",
              "PU 061 - Ezza North Central Mosque",
              "PU 062 - Ezza North Central Post Office",
              "PU 063 - Ezza North Central Police Station",
              "PU 064 - Ezza North Central Fire Station"
            ]
          }
        }
      },
      "ezza-south": {
        name: "Ezza South",
        wards: {
          "ezza-south-central": {
            name: "Ezza South Central",
            pollingUnits: [
              "PU 065 - Ezza South Central Market",
              "PU 066 - Ezza South Central Primary School",
              "PU 067 - Ezza South Central Community Hall",
              "PU 068 - Ezza South Central Health Center",
              "PU 069 - Ezza South Central Mosque",
              "PU 070 - Ezza South Central Post Office",
              "PU 071 - Ezza South Central Police Station",
              "PU 072 - Ezza South Central Fire Station"
            ]
          }
        }
      },
      "ishielu": {
        name: "Ishielu",
        wards: {
          "ishielu-central": {
            name: "Ishielu Central",
            pollingUnits: [
              "PU 073 - Ishielu Central Market",
              "PU 074 - Ishielu Central Primary School",
              "PU 075 - Ishielu Central Community Hall",
              "PU 076 - Ishielu Central Health Center",
              "PU 077 - Ishielu Central Mosque",
              "PU 078 - Ishielu Central Post Office",
              "PU 079 - Ishielu Central Police Station",
              "PU 080 - Ishielu Central Fire Station"
            ]
          }
        }
      },
      "ohaukwu": {
        name: "Ohaukwu",
        wards: {
          "ohaukwu-central": {
            name: "Ohaukwu Central",
            pollingUnits: [
              "PU 081 - Ohaukwu Central Market",
              "PU 082 - Ohaukwu Central Primary School",
              "PU 083 - Ohaukwu Central Community Hall",
              "PU 084 - Ohaukwu Central Health Center",
              "PU 085 - Ohaukwu Central Mosque",
              "PU 086 - Ohaukwu Central Post Office",
              "PU 087 - Ohaukwu Central Police Station",
              "PU 088 - Ohaukwu Central Fire Station"
            ]
          }
        }
      },
      "abakaliki-north": {
        name: "Abakaliki North",
        wards: {
          "abakaliki-north-central": {
            name: "Abakaliki North Central",
            pollingUnits: [
              "PU 089 - Abakaliki North Central Market",
              "PU 090 - Abakaliki North Central Primary School",
              "PU 091 - Abakaliki North Central Community Hall",
              "PU 092 - Abakaliki North Central Health Center",
              "PU 093 - Abakaliki North Central Mosque",
              "PU 094 - Abakaliki North Central Post Office",
              "PU 095 - Abakaliki North Central Police Station",
              "PU 096 - Abakaliki North Central Fire Station"
            ]
          }
        }
      },
      "abakaliki-south": {
        name: "Abakaliki South",
        wards: {
          "abakaliki-south-central": {
            name: "Abakaliki South Central",
            pollingUnits: [
              "PU 097 - Abakaliki South Central Market",
              "PU 098 - Abakaliki South Central Primary School",
              "PU 099 - Abakaliki South Central Community Hall",
              "PU 100 - Abakaliki South Central Health Center",
              "PU 101 - Abakaliki South Central Mosque",
              "PU 102 - Abakaliki South Central Post Office",
              "PU 103 - Abakaliki South Central Police Station",
              "PU 104 - Abakaliki South Central Fire Station"
            ]
          }
        }
      }
    }
  },
  edo: {
    name: "Edo",
    lgas: {
      "benin-city": {
        name: "Benin City",
        wards: {
          "benin-central": {
            name: "Benin Central",
            pollingUnits: [
              "PU 001 - Benin Central Market",
              "PU 002 - Benin Central Primary School",
              "PU 003 - Benin Central Community Hall",
              "PU 004 - Benin Central Health Center",
              "PU 005 - Benin Central Mosque",
              "PU 006 - Benin Central Post Office",
              "PU 007 - Benin Central Police Station",
              "PU 008 - Benin Central Fire Station"
            ]
          }
        }
      },
      "orhiomwon": {
        name: "Orhiomwon",
        wards: {
          "orhiomwon-central": {
            name: "Orhiomwon Central",
            pollingUnits: [
              "PU 009 - Orhiomwon Central Market",
              "PU 010 - Orhiomwon Central Primary School",
              "PU 011 - Orhiomwon Central Community Hall",
              "PU 012 - Orhiomwon Central Health Center",
              "PU 013 - Orhiomwon Central Mosque",
              "PU 014 - Orhiomwon Central Post Office",
              "PU 015 - Orhiomwon Central Police Station",
              "PU 016 - Orhiomwon Central Fire Station"
            ]
          }
        }
      },
      "uhunmwonde": {
        name: "Uhunmwonde",
        wards: {
          "uhunmwonde-central": {
            name: "Uhunmwonde Central",
            pollingUnits: [
              "PU 017 - Uhunmwonde Central Market",
              "PU 018 - Uhunmwonde Central Primary School",
              "PU 019 - Uhunmwonde Central Community Hall",
              "PU 020 - Uhunmwonde Central Health Center",
              "PU 021 - Uhunmwonde Central Mosque",
              "PU 022 - Uhunmwonde Central Post Office",
              "PU 023 - Uhunmwonde Central Police Station",
              "PU 024 - Uhunmwonde Central Fire Station"
            ]
          }
        }
      },
      "egor": {
        name: "Egor",
        wards: {
          "egor-central": {
            name: "Egor Central",
            pollingUnits: [
              "PU 025 - Egor Central Market",
              "PU 026 - Egor Central Primary School",
              "PU 027 - Egor Central Community Hall",
              "PU 028 - Egor Central Health Center",
              "PU 029 - Egor Central Mosque",
              "PU 030 - Egor Central Post Office",
              "PU 031 - Egor Central Police Station",
              "PU 032 - Egor Central Fire Station"
            ]
          }
        }
      },
      "ikpoba-okha": {
        name: "Ikpoba Okha",
        wards: {
          "ikpoba-okha-central": {
            name: "Ikpoba Okha Central",
            pollingUnits: [
              "PU 033 - Ikpoba Okha Central Market",
              "PU 034 - Ikpoba Okha Central Primary School",
              "PU 035 - Ikpoba Okha Central Community Hall",
              "PU 036 - Ikpoba Okha Central Health Center",
              "PU 037 - Ikpoba Okha Central Mosque",
              "PU 038 - Ikpoba Okha Central Post Office",
              "PU 039 - Ikpoba Okha Central Police Station",
              "PU 040 - Ikpoba Okha Central Fire Station"
            ]
          }
        }
      },
      "ovia-north-east": {
        name: "Ovia North East",
        wards: {
          "ovia-north-east-central": {
            name: "Ovia North East Central",
            pollingUnits: [
              "PU 041 - Ovia North East Central Market",
              "PU 042 - Ovia North East Central Primary School",
              "PU 043 - Ovia North East Central Community Hall",
              "PU 044 - Ovia North East Central Health Center",
              "PU 045 - Ovia North East Central Mosque",
              "PU 046 - Ovia North East Central Post Office",
              "PU 047 - Ovia North East Central Police Station",
              "PU 048 - Ovia North East Central Fire Station"
            ]
          }
        }
      },
      "ovia-south-west": {
        name: "Ovia South West",
        wards: {
          "ovia-south-west-central": {
            name: "Ovia South West Central",
            pollingUnits: [
              "PU 049 - Ovia South West Central Market",
              "PU 050 - Ovia South West Central Primary School",
              "PU 051 - Ovia South West Central Community Hall",
              "PU 052 - Ovia South West Central Health Center",
              "PU 053 - Ovia South West Central Mosque",
              "PU 054 - Ovia South West Central Post Office",
              "PU 055 - Ovia South West Central Police Station",
              "PU 056 - Ovia South West Central Fire Station"
            ]
          }
        }
      },
      "esan-central": {
        name: "Esan Central",
        wards: {
          "esan-central-central": {
            name: "Esan Central Central",
            pollingUnits: [
              "PU 057 - Esan Central Central Market",
              "PU 058 - Esan Central Central Primary School",
              "PU 059 - Esan Central Central Community Hall",
              "PU 060 - Esan Central Central Health Center",
              "PU 061 - Esan Central Central Mosque",
              "PU 062 - Esan Central Central Post Office",
              "PU 063 - Esan Central Central Police Station",
              "PU 064 - Esan Central Central Fire Station"
            ]
          }
        }
      },
      "esan-north-east": {
        name: "Esan North East",
        wards: {
          "esan-north-east-central": {
            name: "Esan North East Central",
            pollingUnits: [
              "PU 065 - Esan North East Central Market",
              "PU 066 - Esan North East Central Primary School",
              "PU 067 - Esan North East Central Community Hall",
              "PU 068 - Esan North East Central Health Center",
              "PU 069 - Esan North East Central Mosque",
              "PU 070 - Esan North East Central Post Office",
              "PU 071 - Esan North East Central Police Station",
              "PU 072 - Esan North East Central Fire Station"
            ]
          }
        }
      },
      "esan-south-east": {
        name: "Esan South East",
        wards: {
          "esan-south-east-central": {
            name: "Esan South East Central",
            pollingUnits: [
              "PU 073 - Esan South East Central Market",
              "PU 074 - Esan South East Central Primary School",
              "PU 075 - Esan South East Central Community Hall",
              "PU 076 - Esan South East Central Health Center",
              "PU 077 - Esan South East Central Mosque",
              "PU 078 - Esan South East Central Post Office",
              "PU 079 - Esan South East Central Police Station",
              "PU 080 - Esan South East Central Fire Station"
            ]
          }
        }
      },
      "esan-west": {
        name: "Esan West",
        wards: {
          "esan-west-central": {
            name: "Esan West Central",
            pollingUnits: [
              "PU 081 - Esan West Central Market",
              "PU 082 - Esan West Central Primary School",
              "PU 083 - Esan West Central Community Hall",
              "PU 084 - Esan West Central Health Center",
              "PU 085 - Esan West Central Mosque",
              "PU 086 - Esan West Central Post Office",
              "PU 087 - Esan West Central Police Station",
              "PU 088 - Esan West Central Fire Station"
            ]
          }
        }
      },
      "akoko-edo": {
        name: "Akoko Edo",
        wards: {
          "akoko-edo-central": {
            name: "Akoko Edo Central",
            pollingUnits: [
              "PU 089 - Akoko Edo Central Market",
              "PU 090 - Akoko Edo Central Primary School",
              "PU 091 - Akoko Edo Central Community Hall",
              "PU 092 - Akoko Edo Central Health Center",
              "PU 093 - Akoko Edo Central Mosque",
              "PU 094 - Akoko Edo Central Post Office",
              "PU 095 - Akoko Edo Central Police Station",
              "PU 096 - Akoko Edo Central Fire Station"
            ]
          }
        }
      },
      "ogu": {
        name: "Ogu",
        wards: {
          "ogu-central": {
            name: "Ogu Central",
            pollingUnits: [
              "PU 097 - Ogu Central Market",
              "PU 098 - Ogu Central Primary School",
              "PU 099 - Ogu Central Community Hall",
              "PU 100 - Ogu Central Health Center",
              "PU 101 - Ogu Central Mosque",
              "PU 102 - Ogu Central Post Office",
              "PU 103 - Ogu Central Police Station",
              "PU 104 - Ogu Central Fire Station"
            ]
          }
        }
      },
      "etekpe": {
        name: "Etekpe",
        wards: {
          "etekpe-central": {
            name: "Etekpe Central",
            pollingUnits: [
              "PU 105 - Etekpe Central Market",
              "PU 106 - Etekpe Central Primary School",
              "PU 107 - Etekpe Central Community Hall",
              "PU 108 - Etekpe Central Health Center",
              "PU 109 - Etekpe Central Mosque",
              "PU 110 - Etekpe Central Post Office",
              "PU 111 - Etekpe Central Police Station",
              "PU 112 - Etekpe Central Fire Station"
            ]
          }
        }
      },
      "igbede": {
        name: "Igbede",
        wards: {
          "igbede-central": {
            name: "Igbede Central",
            pollingUnits: [
              "PU 113 - Igbede Central Market",
              "PU 114 - Igbede Central Primary School",
              "PU 115 - Igbede Central Community Hall",
              "PU 116 - Igbede Central Health Center",
              "PU 117 - Igbede Central Mosque",
              "PU 118 - Igbede Central Post Office",
              "PU 119 - Igbede Central Police Station",
              "PU 120 - Igbede Central Fire Station"
            ]
          }
        }
      }
    }
  },
  ekiti: {
    name: "Ekiti",
    lgas: {
      "ado-ekiti": {
        name: "Ado Ekiti",
        wards: {
          "ado-ekiti-central": {
            name: "Ado Ekiti Central",
            pollingUnits: [
              "PU 001 - Ado Ekiti Central Market",
              "PU 002 - Ado Ekiti Central Primary School",
              "PU 003 - Ado Ekiti Central Community Hall",
              "PU 004 - Ado Ekiti Central Health Center",
              "PU 005 - Ado Ekiti Central Mosque",
              "PU 006 - Ado Ekiti Central Post Office",
              "PU 007 - Ado Ekiti Central Police Station",
              "PU 008 - Ado Ekiti Central Fire Station"
            ]
          }
        }
      },
      "ikere": {
        name: "Ikere",
        wards: {
          "ikere-central": {
            name: "Ikere Central",
            pollingUnits: [
              "PU 009 - Ikere Central Market",
              "PU 010 - Ikere Central Primary School",
              "PU 011 - Ikere Central Community Hall",
              "PU 012 - Ikere Central Health Center",
              "PU 013 - Ikere Central Mosque",
              "PU 014 - Ikere Central Post Office",
              "PU 015 - Ikere Central Police Station",
              "PU 016 - Ikere Central Fire Station"
            ]
          }
        }
      },
      "ijero": {
        name: "Ijero",
        wards: {
          "ijero-central": {
            name: "Ijero Central",
            pollingUnits: [
              "PU 017 - Ijero Central Market",
              "PU 018 - Ijero Central Primary School",
              "PU 019 - Ijero Central Community Hall",
              "PU 020 - Ijero Central Health Center",
              "PU 021 - Ijero Central Mosque",
              "PU 022 - Ijero Central Post Office",
              "PU 023 - Ijero Central Police Station",
              "PU 024 - Ijero Central Fire Station"
            ]
          }
        }
      },
      "ekiti-west": {
        name: "Ekiti West",
        wards: {
          "ekiti-west-central": {
            name: "Ekiti West Central",
            pollingUnits: [
              "PU 025 - Ekiti West Central Market",
              "PU 026 - Ekiti West Central Primary School",
              "PU 027 - Ekiti West Central Community Hall",
              "PU 028 - Ekiti West Central Health Center",
              "PU 029 - Ekiti West Central Mosque",
              "PU 030 - Ekiti West Central Post Office",
              "PU 031 - Ekiti West Central Police Station",
              "PU 032 - Ekiti West Central Fire Station"
            ]
          }
        }
      },
      "ekiti-east": {
        name: "Ekiti East",
        wards: {
          "ekiti-east-central": {
            name: "Ekiti East Central",
            pollingUnits: [
              "PU 033 - Ekiti East Central Market",
              "PU 034 - Ekiti East Central Primary School",
              "PU 035 - Ekiti East Central Community Hall",
              "PU 036 - Ekiti East Central Health Center",
              "PU 037 - Ekiti East Central Mosque",
              "PU 038 - Ekiti East Central Post Office",
              "PU 039 - Ekiti East Central Police Station",
              "PU 040 - Ekiti East Central Fire Station"
            ]
          }
        }
      },
      "moba": {
        name: "Moba",
        wards: {
          "moba-central": {
            name: "Moba Central",
            pollingUnits: [
              "PU 041 - Moba Central Market",
              "PU 042 - Moba Central Primary School",
              "PU 043 - Moba Central Community Hall",
              "PU 044 - Moba Central Health Center",
              "PU 045 - Moba Central Mosque",
              "PU 046 - Moba Central Post Office",
              "PU 047 - Moba Central Police Station",
              "PU 048 - Moba Central Fire Station"
            ]
          }
        }
      },
      "gbonyin": {
        name: "Gbonyin",
        wards: {
          "gbonyin-central": {
            name: "Gbonyin Central",
            pollingUnits: [
              "PU 049 - Gbonyin Central Market",
              "PU 050 - Gbonyin Central Primary School",
              "PU 051 - Gbonyin Central Community Hall",
              "PU 052 - Gbonyin Central Health Center",
              "PU 053 - Gbonyin Central Mosque",
              "PU 054 - Gbonyin Central Post Office",
              "PU 055 - Gbonyin Central Police Station",
              "PU 056 - Gbonyin Central Fire Station"
            ]
          }
        }
      },
      "emure": {
        name: "Emure",
        wards: {
          "emure-central": {
            name: "Emure Central",
            pollingUnits: [
              "PU 057 - Emure Central Market",
              "PU 058 - Emure Central Primary School",
              "PU 059 - Emure Central Community Hall",
              "PU 060 - Emure Central Health Center",
              "PU 061 - Emure Central Mosque",
              "PU 062 - Emure Central Post Office",
              "PU 063 - Emure Central Police Station",
              "PU 064 - Emure Central Fire Station"
            ]
          }
        }
      },
      "ise-orun": {
        name: "Ise Orun",
        wards: {
          "ise-orun-central": {
            name: "Ise Orun Central",
            pollingUnits: [
              "PU 065 - Ise Orun Central Market",
              "PU 066 - Ise Orun Central Primary School",
              "PU 067 - Ise Orun Central Community Hall",
              "PU 068 - Ise Orun Central Health Center",
              "PU 069 - Ise Orun Central Mosque",
              "PU 070 - Ise Orun Central Post Office",
              "PU 071 - Ise Orun Central Police Station",
              "PU 072 - Ise Orun Central Fire Station"
            ]
          }
        }
      },
      "ilejemeje": {
        name: "Ilejemeje",
        wards: {
          "ilejemeje-central": {
            name: "Ilejemeje Central",
            pollingUnits: [
              "PU 073 - Ilejemeje Central Market",
              "PU 074 - Ilejemeje Central Primary School",
              "PU 075 - Ilejemeje Central Community Hall",
              "PU 076 - Ilejemeje Central Health Center",
              "PU 077 - Ilejemeje Central Mosque",
              "PU 078 - Ilejemeje Central Post Office",
              "PU 079 - Ilejemeje Central Police Station",
              "PU 080 - Ilejemeje Central Fire Station"
            ]
          }
        }
      },
      "oye": {
        name: "Oye",
        wards: {
          "oye-central": {
            name: "Oye Central",
            pollingUnits: [
              "PU 081 - Oye Central Market",
              "PU 082 - Oye Central Primary School",
              "PU 083 - Oye Central Community Hall",
              "PU 084 - Oye Central Health Center",
              "PU 085 - Oye Central Mosque",
              "PU 086 - Oye Central Post Office",
              "PU 087 - Oye Central Police Station",
              "PU 088 - Oye Central Fire Station"
            ]
          }
        }
      },
      "aisegba": {
        name: "Aisegba",
        wards: {
          "aisegba-central": {
            name: "Aisegba Central",
            pollingUnits: [
              "PU 089 - Aisegba Central Market",
              "PU 090 - Aisegba Central Primary School",
              "PU 091 - Aisegba Central Community Hall",
              "PU 092 - Aisegba Central Health Center",
              "PU 093 - Aisegba Central Mosque",
              "PU 094 - Aisegba Central Post Office",
              "PU 095 - Aisegba Central Police Station",
              "PU 096 - Aisegba Central Fire Station"
            ]
          }
        }
      },
      "efon": {
        name: "Efon",
        wards: {
          "efon-central": {
            name: "Efon Central",
            pollingUnits: [
              "PU 097 - Efon Central Market",
              "PU 098 - Efon Central Primary School",
              "PU 099 - Efon Central Community Hall",
              "PU 100 - Efon Central Health Center",
              "PU 101 - Efon Central Mosque",
              "PU 102 - Efon Central Post Office",
              "PU 103 - Efon Central Police Station",
              "PU 104 - Efon Central Fire Station"
            ]
          }
        }
      },
      "irepodun-ifelodun": {
        name: "Irepodun Ifelodun",
        wards: {
          "irepodun-ifelodun-central": {
            name: "Irepodun Ifelodun Central",
            pollingUnits: [
              "PU 105 - Irepodun Ifelodun Central Market",
              "PU 106 - Irepodun Ifelodun Central Primary School",
              "PU 107 - Irepodun Ifelodun Central Community Hall",
              "PU 108 - Irepodun Ifelodun Central Health Center",
              "PU 109 - Irepodun Ifelodun Central Mosque",
              "PU 110 - Irepodun Ifelodun Central Post Office",
              "PU 111 - Irepodun Ifelodun Central Police Station",
              "PU 112 - Irepodun Ifelodun Central Fire Station"
            ]
          }
        }
      },
      "ekiti-south-west": {
        name: "Ekiti South West",
        wards: {
          "ekiti-south-west-central": {
            name: "Ekiti South West Central",
            pollingUnits: [
              "PU 113 - Ekiti South West Central Market",
              "PU 114 - Ekiti South West Central Primary School",
              "PU 115 - Ekiti South West Central Community Hall",
              "PU 116 - Ekiti South West Central Health Center",
              "PU 117 - Ekiti South West Central Mosque",
              "PU 118 - Ekiti South West Central Post Office",
              "PU 119 - Ekiti South West Central Police Station",
              "PU 120 - Ekiti South West Central Fire Station"
            ]
          }
        }
      }
    }
  },
  enugu: {
    name: "Enugu",
    lgas: {
      "enugu-north": {
        name: "Enugu North",
        wards: {
          "enugu-north-central": {
            name: "Enugu North Central",
            pollingUnits: [
              "PU 001 - Enugu North Central Market",
              "PU 002 - Enugu North Central Primary School",
              "PU 003 - Enugu North Central Community Hall",
              "PU 004 - Enugu North Central Health Center",
              "PU 005 - Enugu North Central Mosque",
              "PU 006 - Enugu North Central Post Office",
              "PU 007 - Enugu North Central Police Station",
              "PU 008 - Enugu North Central Fire Station"
            ]
          }
        }
      },
      "enugu-south": {
        name: "Enugu South",
        wards: {
          "enugu-south-central": {
            name: "Enugu South Central",
            pollingUnits: [
              "PU 009 - Enugu South Central Market",
              "PU 010 - Enugu South Central Primary School",
              "PU 011 - Enugu South Central Community Hall",
              "PU 012 - Enugu South Central Health Center",
              "PU 013 - Enugu South Central Mosque",
              "PU 014 - Enugu South Central Post Office",
              "PU 015 - Enugu South Central Police Station",
              "PU 016 - Enugu South Central Fire Station"
            ]
          }
        }
      },
      "enugu-east": {
        name: "Enugu East",
        wards: {
          "enugu-east-central": {
            name: "Enugu East Central",
            pollingUnits: [
              "PU 017 - Enugu East Central Market",
              "PU 018 - Enugu East Central Primary School",
              "PU 019 - Enugu East Central Community Hall",
              "PU 020 - Enugu East Central Health Center",
              "PU 021 - Enugu East Central Mosque",
              "PU 022 - Enugu East Central Post Office",
              "PU 023 - Enugu East Central Police Station",
              "PU 024 - Enugu East Central Fire Station"
            ]
          }
        }
      },
      "nsukka": {
        name: "Nsukka",
        wards: {
          "nsukka-central": {
            name: "Nsukka Central",
            pollingUnits: [
              "PU 025 - Nsukka Central Market",
              "PU 026 - Nsukka Central Primary School",
              "PU 027 - Nsukka Central Community Hall",
              "PU 028 - Nsukka Central Health Center",
              "PU 029 - Nsukka Central Mosque",
              "PU 030 - Nsukka Central Post Office",
              "PU 031 - Nsukka Central Police Station",
              "PU 032 - Nsukka Central Fire Station"
            ]
          }
        }
      },
      "udi": {
        name: "Udi",
        wards: {
          "udi-central": {
            name: "Udi Central",
            pollingUnits: [
              "PU 033 - Udi Central Market",
              "PU 034 - Udi Central Primary School",
              "PU 035 - Udi Central Community Hall",
              "PU 036 - Udi Central Health Center",
              "PU 037 - Udi Central Mosque",
              "PU 038 - Udi Central Post Office",
              "PU 039 - Udi Central Police Station",
              "PU 040 - Udi Central Fire Station"
            ]
          }
        }
      },
      "ezeagu": {
        name: "Ezeagu",
        wards: {
          "ezeagu-central": {
            name: "Ezeagu Central",
            pollingUnits: [
              "PU 041 - Ezeagu Central Market",
              "PU 042 - Ezeagu Central Primary School",
              "PU 043 - Ezeagu Central Community Hall",
              "PU 044 - Ezeagu Central Health Center",
              "PU 045 - Ezeagu Central Mosque",
              "PU 046 - Ezeagu Central Post Office",
              "PU 047 - Ezeagu Central Police Station",
              "PU 048 - Ezeagu Central Fire Station"
            ]
          }
        }
      },
      "oji-river": {
        name: "Oji River",
        wards: {
          "oji-river-central": {
            name: "Oji River Central",
            pollingUnits: [
              "PU 049 - Oji River Central Market",
              "PU 050 - Oji River Central Primary School",
              "PU 051 - Oji River Central Community Hall",
              "PU 052 - Oji River Central Health Center",
              "PU 053 - Oji River Central Mosque",
              "PU 054 - Oji River Central Post Office",
              "PU 055 - Oji River Central Police Station",
              "PU 056 - Oji River Central Fire Station"
            ]
          }
        }
      },
      "awgu": {
        name: "Awgu",
        wards: {
          "awgu-central": {
            name: "Awgu Central",
            pollingUnits: [
              "PU 057 - Awgu Central Market",
              "PU 058 - Awgu Central Primary School",
              "PU 059 - Awgu Central Community Hall",
              "PU 060 - Awgu Central Health Center",
              "PU 061 - Awgu Central Mosque",
              "PU 062 - Awgu Central Post Office",
              "PU 063 - Awgu Central Police Station",
              "PU 064 - Awgu Central Fire Station"
            ]
          }
        }
      },
      "aniri": {
        name: "Aniri",
        wards: {
          "aniri-central": {
            name: "Aniri Central",
            pollingUnits: [
              "PU 065 - Aniri Central Market",
              "PU 066 - Aniri Central Primary School",
              "PU 067 - Aniri Central Community Hall",
              "PU 068 - Aniri Central Health Center",
              "PU 069 - Aniri Central Mosque",
              "PU 070 - Aniri Central Post Office",
              "PU 071 - Aniri Central Police Station",
              "PU 072 - Aniri Central Fire Station"
            ]
          }
        }
      },
      "nkanu-east": {
        name: "Nkanu East",
        wards: {
          "nkanu-east-central": {
            name: "Nkanu East Central",
            pollingUnits: [
              "PU 073 - Nkanu East Central Market",
              "PU 074 - Nkanu East Central Primary School",
              "PU 075 - Nkanu East Central Community Hall",
              "PU 076 - Nkanu East Central Health Center",
              "PU 077 - Nkanu East Central Mosque",
              "PU 078 - Nkanu East Central Post Office",
              "PU 079 - Nkanu East Central Police Station",
              "PU 080 - Nkanu East Central Fire Station"
            ]
          }
        }
      },
      "nkanu-west": {
        name: "Nkanu West",
        wards: {
          "nkanu-west-central": {
            name: "Nkanu West Central",
            pollingUnits: [
              "PU 081 - Nkanu West Central Market",
              "PU 082 - Nkanu West Central Primary School",
              "PU 083 - Nkanu West Central Community Hall",
              "PU 084 - Nkanu West Central Health Center",
              "PU 085 - Nkanu West Central Mosque",
              "PU 086 - Nkanu West Central Post Office",
              "PU 087 - Nkanu West Central Police Station",
              "PU 088 - Nkanu West Central Fire Station"
            ]
          }
        }
      },
      "igbo-etiti": {
        name: "Igbo Etiti",
        wards: {
          "igbo-etiti-central": {
            name: "Igbo Etiti Central",
            pollingUnits: [
              "PU 089 - Igbo Etiti Central Market",
              "PU 090 - Igbo Etiti Central Primary School",
              "PU 091 - Igbo Etiti Central Community Hall",
              "PU 092 - Igbo Etiti Central Health Center",
              "PU 093 - Igbo Etiti Central Mosque",
              "PU 094 - Igbo Etiti Central Post Office",
              "PU 095 - Igbo Etiti Central Police Station",
              "PU 096 - Igbo Etiti Central Fire Station"
            ]
          }
        }
      },
      "igbo-eze-north": {
        name: "Igbo Eze North",
        wards: {
          "igbo-eze-north-central": {
            name: "Igbo Eze North Central",
            pollingUnits: [
              "PU 097 - Igbo Eze North Central Market",
              "PU 098 - Igbo Eze North Central Primary School",
              "PU 099 - Igbo Eze North Central Community Hall",
              "PU 100 - Igbo Eze North Central Health Center",
              "PU 101 - Igbo Eze North Central Mosque",
              "PU 102 - Igbo Eze North Central Post Office",
              "PU 103 - Igbo Eze North Central Police Station",
              "PU 104 - Igbo Eze North Central Fire Station"
            ]
          }
        }
      },
      "igbo-eze-south": {
        name: "Igbo Eze South",
        wards: {
          "igbo-eze-south-central": {
            name: "Igbo Eze South Central",
            pollingUnits: [
              "PU 105 - Igbo Eze South Central Market",
              "PU 106 - Igbo Eze South Central Primary School",
              "PU 107 - Igbo Eze South Central Community Hall",
              "PU 108 - Igbo Eze South Central Health Center",
              "PU 109 - Igbo Eze South Central Mosque",
              "PU 110 - Igbo Eze South Central Post Office",
              "PU 111 - Igbo Eze South Central Police Station",
              "PU 112 - Igbo Eze South Central Fire Station"
            ]
          }
        }
      },
      "is-uzo": {
        name: "Isi Uzo",
        wards: {
          "is-uzo-central": {
            name: "Isi Uzo Central",
            pollingUnits: [
              "PU 113 - Isi Uzo Central Market",
              "PU 114 - Isi Uzo Central Primary School",
              "PU 115 - Isi Uzo Central Community Hall",
              "PU 116 - Isi Uzo Central Health Center",
              "PU 117 - Isi Uzo Central Mosque",
              "PU 118 - Isi Uzo Central Post Office",
              "PU 119 - Isi Uzo Central Police Station",
              "PU 120 - Isi Uzo Central Fire Station"
            ]
          }
        }
      }
    }
  },
  "fct": {
    name: "FCT Abuja",
    lgas: {
      "abuja-municipal": {
        name: "Abuja Municipal",
        wards: {
          "central-business-district": {
            name: "Central Business District",
            pollingUnits: [
              "PU 001 - National Assembly Complex",
              "PU 002 - Presidential Villa",
              "PU 003 - Central Bank of Nigeria",
              "PU 004 - Ministry of Finance",
              "PU 005 - Eagle Square",
              "PU 006 - Federal Secretariat",
              "PU 007 - Supreme Court",
              "PU 008 - National Library"
            ]
          },
          "garki": {
            name: "Garki",
            pollingUnits: [
              "PU 009 - Garki Model Primary School",
              "PU 010 - Garki International Market",
              "PU 011 - Garki Community Hall",
              "PU 012 - Garki Health Center",
              "PU 013 - Garki Central Mosque",
              "PU 014 - Garki Post Office",
              "PU 015 - Garki Police Station",
              "PU 016 - Garki Fire Station"
            ]
          },
          "wuse": {
            name: "Wuse",
            pollingUnits: [
              "PU 017 - Wuse Model Primary School",
              "PU 018 - Wuse Market",
              "PU 019 - Wuse Community Hall",
              "PU 020 - Wuse Health Center",
              "PU 021 - Wuse Central Mosque",
              "PU 022 - Wuse Post Office",
              "PU 023 - Wuse Police Station",
              "PU 024 - Wuse Fire Station"
            ]
          }
        }
      },
      "gwagwalada": {
        name: "Gwagwalada",
        wards: {
          "gwagwalada-central": {
            name: "Gwagwalada Central",
            pollingUnits: [
              "PU 025 - Gwagwalada Central Market",
              "PU 026 - Gwagwalada Central Primary School",
              "PU 027 - Gwagwalada Central Community Hall",
              "PU 028 - Gwagwalada Central Health Center",
              "PU 029 - Gwagwalada Central Mosque",
              "PU 030 - Gwagwalada Central Post Office",
              "PU 031 - Gwagwalada Central Police Station",
              "PU 032 - Gwagwalada Central Fire Station"
            ]
          },
          "dobi": {
            name: "Dobi",
            pollingUnits: [
              "PU 033 - Dobi Primary School",
              "PU 034 - Dobi Market",
              "PU 035 - Dobi Community Hall",
              "PU 036 - Dobi Health Center",
              "PU 037 - Dobi Mosque",
              "PU 038 - Dobi Post Office",
              "PU 039 - Dobi Police Station",
              "PU 040 - Dobi Fire Station"
            ]
          },
          "kutunku": {
            name: "Kutunku",
            pollingUnits: [
              "PU 041 - Kutunku Primary School",
              "PU 042 - Kutunku Market",
              "PU 043 - Kutunku Community Hall",
              "PU 044 - Kutunku Health Center",
              "PU 045 - Kutunku Mosque",
              "PU 046 - Kutunku Post Office",
              "PU 047 - Kutunku Police Station",
              "PU 048 - Kutunku Fire Station"
            ]
          },
          "paiko": {
            name: "Paiko",
            pollingUnits: [
              "PU 049 - Paiko Primary School",
              "PU 050 - Paiko Market",
              "PU 051 - Paiko Community Hall",
              "PU 052 - Paiko Health Center",
              "PU 053 - Paiko Mosque",
              "PU 054 - Paiko Post Office",
              "PU 055 - Paiko Police Station",
              "PU 056 - Paiko Fire Station"
            ]
          }
        }
      },
      "kuje": {
        name: "Kuje",
        wards: {
          "kuje-central": {
            name: "Kuje Central",
            pollingUnits: [
              "PU 057 - Kuje Central Primary School",
              "PU 058 - Kuje Central Market",
              "PU 059 - Kuje Central Community Hall",
              "PU 060 - Kuje Central Health Center",
              "PU 061 - Kuje Central Mosque",
              "PU 062 - Kuje Central Post Office",
              "PU 063 - Kuje Central Police Station",
              "PU 064 - Kuje Central Fire Station"
            ]
          },
          "kuje-north": {
            name: "Kuje North",
            pollingUnits: [
              "PU 065 - Kuje North Primary School",
              "PU 066 - Kuje North Market",
              "PU 067 - Kuje North Community Hall",
              "PU 068 - Kuje North Health Center",
              "PU 069 - Kuje North Mosque",
              "PU 070 - Kuje North Post Office",
              "PU 071 - Kuje North Police Station",
              "PU 072 - Kuje North Fire Station"
            ]
          },
          "kuje-south": {
            name: "Kuje South",
            pollingUnits: [
              "PU 073 - Kuje South Primary School",
              "PU 074 - Kuje South Market",
              "PU 075 - Kuje South Community Hall",
              "PU 076 - Kuje South Health Center",
              "PU 077 - Kuje South Mosque",
              "PU 078 - Kuje South Post Office",
              "PU 079 - Kuje South Police Station",
              "PU 080 - Kuje South Fire Station"
            ]
          }
        }
      },
      "abaji": {
        name: "Abaji",
        wards: {
          "abaji-central": {
            name: "Abaji Central",
            pollingUnits: [
              "PU 081 - Abaji Central Primary School",
              "PU 082 - Abaji Central Market",
              "PU 083 - Abaji Central Community Hall",
              "PU 084 - Abaji Central Health Center",
              "PU 085 - Abaji Central Mosque",
              "PU 086 - Abaji Central Post Office",
              "PU 087 - Abaji Central Police Station",
              "PU 088 - Abaji Central Fire Station"
            ]
          },
          "abaji-north": {
            name: "Abaji North",
            pollingUnits: [
              "PU 089 - Abaji North Primary School",
              "PU 090 - Abaji North Market",
              "PU 091 - Abaji North Community Hall",
              "PU 092 - Abaji North Health Center",
              "PU 093 - Abaji North Mosque",
              "PU 094 - Abaji North Post Office",
              "PU 095 - Abaji North Police Station",
              "PU 096 - Abaji North Fire Station"
            ]
          },
          "abaji-south": {
            name: "Abaji South",
            pollingUnits: [
              "PU 097 - Abaji South Primary School",
              "PU 098 - Abaji South Market",
              "PU 099 - Abaji South Community Hall",
              "PU 100 - Abaji South Health Center",
              "PU 101 - Abaji South Mosque",
              "PU 102 - Abaji South Post Office",
              "PU 103 - Abaji South Police Station",
              "PU 104 - Abaji South Fire Station"
            ]
          }
        }
      }
    }
  },
  gombe: {
    name: "Gombe",
    lgas: {
      "gombe": {
        name: "Gombe",
        wards: {
          "gombe-central": {
            name: "Gombe Central",
            pollingUnits: [
              "PU 001 - Gombe Central Market",
              "PU 002 - Gombe Central Primary School",
              "PU 003 - Gombe Central Community Hall",
              "PU 004 - Gombe Central Health Center",
              "PU 005 - Gombe Central Mosque",
              "PU 006 - Gombe Central Post Office",
              "PU 007 - Gombe Central Police Station",
              "PU 008 - Gombe Central Fire Station"
            ]
          }
        }
      },
      "akko": {
        name: "Akko",
        wards: {
          "akko-central": {
            name: "Akko Central",
            pollingUnits: [
              "PU 009 - Akko Central Market",
              "PU 010 - Akko Central Primary School",
              "PU 011 - Akko Central Community Hall",
              "PU 012 - Akko Central Health Center",
              "PU 013 - Akko Central Mosque",
              "PU 014 - Akko Central Post Office",
              "PU 015 - Akko Central Police Station",
              "PU 016 - Akko Central Fire Station"
            ]
          }
        }
      },
      "balanga": {
        name: "Balanga",
        wards: {
          "balanga-central": {
            name: "Balanga Central",
            pollingUnits: [
              "PU 017 - Balanga Central Market",
              "PU 018 - Balanga Central Primary School",
              "PU 019 - Balanga Central Community Hall",
              "PU 020 - Balanga Central Health Center",
              "PU 021 - Balanga Central Mosque",
              "PU 022 - Balanga Central Post Office",
              "PU 023 - Balanga Central Police Station",
              "PU 024 - Balanga Central Fire Station"
            ]
          }
        }
      },
      "billiri": {
        name: "Billiri",
        wards: {
          "billiri-central": {
            name: "Billiri Central",
            pollingUnits: [
              "PU 025 - Billiri Central Market",
              "PU 026 - Billiri Central Primary School",
              "PU 027 - Billiri Central Community Hall",
              "PU 028 - Billiri Central Health Center",
              "PU 029 - Billiri Central Mosque",
              "PU 030 - Billiri Central Post Office",
              "PU 031 - Billiri Central Police Station",
              "PU 032 - Billiri Central Fire Station"
            ]
          }
        }
      },
      "dukku": {
        name: "Dukku",
        wards: {
          "dukku-central": {
            name: "Dukku Central",
            pollingUnits: [
              "PU 033 - Dukku Central Market",
              "PU 034 - Dukku Central Primary School",
              "PU 035 - Dukku Central Community Hall",
              "PU 036 - Dukku Central Health Center",
              "PU 037 - Dukku Central Mosque",
              "PU 038 - Dukku Central Post Office",
              "PU 039 - Dukku Central Police Station",
              "PU 040 - Dukku Central Fire Station"
            ]
          }
        }
      },
      "funakaye": {
        name: "Funakaye",
        wards: {
          "funakaye-central": {
            name: "Funakaye Central",
            pollingUnits: [
              "PU 041 - Funakaye Central Market",
              "PU 042 - Funakaye Central Primary School",
              "PU 043 - Funakaye Central Community Hall",
              "PU 044 - Funakaye Central Health Center",
              "PU 045 - Funakaye Central Mosque",
              "PU 046 - Funakaye Central Post Office",
              "PU 047 - Funakaye Central Police Station",
              "PU 048 - Funakaye Central Fire Station"
            ]
          }
        }
      },
      "kaltungo": {
        name: "Kaltungo",
        wards: {
          "kaltungo-central": {
            name: "Kaltungo Central",
            pollingUnits: [
              "PU 049 - Kaltungo Central Market",
              "PU 050 - Kaltungo Central Primary School",
              "PU 051 - Kaltungo Central Community Hall",
              "PU 052 - Kaltungo Central Health Center",
              "PU 053 - Kaltungo Central Mosque",
              "PU 054 - Kaltungo Central Post Office",
              "PU 055 - Kaltungo Central Police Station",
              "PU 056 - Kaltungo Central Fire Station"
            ]
          }
        }
      },
      "kwami": {
        name: "Kwami",
        wards: {
          "kwami-central": {
            name: "Kwami Central",
            pollingUnits: [
              "PU 057 - Kwami Central Market",
              "PU 058 - Kwami Central Primary School",
              "PU 059 - Kwami Central Community Hall",
              "PU 060 - Kwami Central Health Center",
              "PU 061 - Kwami Central Mosque",
              "PU 062 - Kwami Central Post Office",
              "PU 063 - Kwami Central Police Station",
              "PU 064 - Kwami Central Fire Station"
            ]
          }
        }
      },
      "nasarawa": {
        name: "Nasarawa",
        wards: {
          "nasarawa-central": {
            name: "Nasarawa Central",
            pollingUnits: [
              "PU 065 - Nasarawa Central Market",
              "PU 066 - Nasarawa Central Primary School",
              "PU 067 - Nasarawa Central Community Hall",
              "PU 068 - Nasarawa Central Health Center",
              "PU 069 - Nasarawa Central Mosque",
              "PU 070 - Nasarawa Central Post Office",
              "PU 071 - Nasarawa Central Police Station",
              "PU 072 - Nasarawa Central Fire Station"
            ]
          }
        }
      },
      "shongom": {
        name: "Shongom",
        wards: {
          "shongom-central": {
            name: "Shongom Central",
            pollingUnits: [
              "PU 073 - Shongom Central Market",
              "PU 074 - Shongom Central Primary School",
              "PU 075 - Shongom Central Community Hall",
              "PU 076 - Shongom Central Health Center",
              "PU 077 - Shongom Central Mosque",
              "PU 078 - Shongom Central Post Office",
              "PU 079 - Shongom Central Police Station",
              "PU 080 - Shongom Central Fire Station"
            ]
          }
        }
      },
      "yamaltu-deba": {
        name: "Yamaltu Deba",
        wards: {
          "yamaltu-deba-central": {
            name: "Yamaltu Deba Central",
            pollingUnits: [
              "PU 081 - Yamaltu Deba Central Market",
              "PU 082 - Yamaltu Deba Central Primary School",
              "PU 083 - Yamaltu Deba Central Community Hall",
              "PU 084 - Yamaltu Deba Central Health Center",
              "PU 085 - Yamaltu Deba Central Mosque",
              "PU 086 - Yamaltu Deba Central Post Office",
              "PU 087 - Yamaltu Deba Central Police Station",
              "PU 088 - Yamaltu Deba Central Fire Station"
            ]
          }
        }
      }
    }
  },
  imo: {
    name: "Imo",
    lgas: {
      "owerri-municipal": {
        name: "Owerri Municipal",
        wards: {
          "owerri-central": {
            name: "Owerri Central",
            pollingUnits: [
              "PU 001 - Owerri Central Market",
              "PU 002 - Owerri Central Primary School",
              "PU 003 - Owerri Central Community Hall",
              "PU 004 - Owerri Central Health Center",
              "PU 005 - Owerri Central Mosque",
              "PU 006 - Owerri Central Post Office",
              "PU 007 - Owerri Central Police Station",
              "PU 008 - Owerri Central Fire Station"
            ]
          }
        }
      },
      "okigwe": {
        name: "Okigwe",
        wards: {
          "okigwe-central": {
            name: "Okigwe Central",
            pollingUnits: [
              "PU 009 - Okigwe Central Market",
              "PU 010 - Okigwe Central Primary School",
              "PU 011 - Okigwe Central Community Hall",
              "PU 012 - Okigwe Central Health Center",
              "PU 013 - Okigwe Central Mosque",
              "PU 014 - Okigwe Central Post Office",
              "PU 015 - Okigwe Central Police Station",
              "PU 016 - Okigwe Central Fire Station"
            ]
          }
        }
      },
      "orlu": {
        name: "Orlu",
        wards: {
          "orlu-central": {
            name: "Orlu Central",
            pollingUnits: [
              "PU 017 - Orlu Central Market",
              "PU 018 - Orlu Central Primary School",
              "PU 019 - Orlu Central Community Hall",
              "PU 020 - Orlu Central Health Center",
              "PU 021 - Orlu Central Mosque",
              "PU 022 - Orlu Central Post Office",
              "PU 023 - Orlu Central Police Station",
              "PU 024 - Orlu Central Fire Station"
            ]
          }
        }
      },
      "owerri-north": {
        name: "Owerri North",
        wards: {
          "owerri-north-central": {
            name: "Owerri North Central",
            pollingUnits: [
              "PU 025 - Owerri North Central Market",
              "PU 026 - Owerri North Central Primary School",
              "PU 027 - Owerri North Central Community Hall",
              "PU 028 - Owerri North Central Health Center",
              "PU 029 - Owerri North Central Mosque",
              "PU 030 - Owerri North Central Post Office",
              "PU 031 - Owerri North Central Police Station",
              "PU 032 - Owerri North Central Fire Station"
            ]
          }
        }
      },
      "owerri-west": {
        name: "Owerri West",
        wards: {
          "owerri-west-central": {
            name: "Owerri West Central",
            pollingUnits: [
              "PU 033 - Owerri West Central Market",
              "PU 034 - Owerri West Central Primary School",
              "PU 035 - Owerri West Central Community Hall",
              "PU 036 - Owerri West Central Health Center",
              "PU 037 - Owerri West Central Mosque",
              "PU 038 - Owerri West Central Post Office",
              "PU 039 - Owerri West Central Police Station",
              "PU 040 - Owerri West Central Fire Station"
            ]
          }
        }
      },
      "ehime-mbano": {
        name: "Ehime Mbano",
        wards: {
          "ehime-mbano-central": {
            name: "Ehime Mbano Central",
            pollingUnits: [
              "PU 041 - Ehime Mbano Central Market",
              "PU 042 - Ehime Mbano Central Primary School",
              "PU 043 - Ehime Mbano Central Community Hall",
              "PU 044 - Ehime Mbano Central Health Center",
              "PU 045 - Ehime Mbano Central Mosque",
              "PU 046 - Ehime Mbano Central Post Office",
              "PU 047 - Ehime Mbano Central Police Station",
              "PU 048 - Ehime Mbano Central Fire Station"
            ]
          }
        }
      },
      "ihitte-uboma": {
        name: "Ihitte Uboma",
        wards: {
          "ihitte-uboma-central": {
            name: "Ihitte Uboma Central",
            pollingUnits: [
              "PU 049 - Ihitte Uboma Central Market",
              "PU 050 - Ihitte Uboma Central Primary School",
              "PU 051 - Ihitte Uboma Central Community Hall",
              "PU 052 - Ihitte Uboma Central Health Center",
              "PU 053 - Ihitte Uboma Central Mosque",
              "PU 054 - Ihitte Uboma Central Post Office",
              "PU 055 - Ihitte Uboma Central Police Station",
              "PU 056 - Ihitte Uboma Central Fire Station"
            ]
          }
        }
      },
      "obowo": {
        name: "Obowo",
        wards: {
          "obowo-central": {
            name: "Obowo Central",
            pollingUnits: [
              "PU 057 - Obowo Central Market",
              "PU 058 - Obowo Central Primary School",
              "PU 059 - Obowo Central Community Hall",
              "PU 060 - Obowo Central Health Center",
              "PU 061 - Obowo Central Mosque",
              "PU 062 - Obowo Central Post Office",
              "PU 063 - Obowo Central Police Station",
              "PU 064 - Obowo Central Fire Station"
            ]
          }
        }
      },
      "mbaitoli": {
        name: "Mbaitoli",
        wards: {
          "mbaitoli-central": {
            name: "Mbaitoli Central",
            pollingUnits: [
              "PU 065 - Mbaitoli Central Market",
              "PU 066 - Mbaitoli Central Primary School",
              "PU 067 - Mbaitoli Central Community Hall",
              "PU 068 - Mbaitoli Central Health Center",
              "PU 069 - Mbaitoli Central Mosque",
              "PU 070 - Mbaitoli Central Post Office",
              "PU 071 - Mbaitoli Central Police Station",
              "PU 072 - Mbaitoli Central Fire Station"
            ]
          }
        }
      },
      "nwangele": {
        name: "Nwangele",
        wards: {
          "nwangele-central": {
            name: "Nwangele Central",
            pollingUnits: [
              "PU 073 - Nwangele Central Market",
              "PU 074 - Nwangele Central Primary School",
              "PU 075 - Nwangele Central Community Hall",
              "PU 076 - Nwangele Central Health Center",
              "PU 077 - Nwangele Central Mosque",
              "PU 078 - Nwangele Central Post Office",
              "PU 079 - Nwangele Central Police Station",
              "PU 080 - Nwangele Central Fire Station"
            ]
          }
        }
      },
      "njaba": {
        name: "Njaba",
        wards: {
          "njaba-central": {
            name: "Njaba Central",
            pollingUnits: [
              "PU 081 - Njaba Central Market",
              "PU 082 - Njaba Central Primary School",
              "PU 083 - Njaba Central Community Hall",
              "PU 084 - Njaba Central Health Center",
              "PU 085 - Njaba Central Mosque",
              "PU 086 - Njaba Central Post Office",
              "PU 087 - Njaba Central Police Station",
              "PU 088 - Njaba Central Fire Station"
            ]
          }
        }
      },
      "nkwere": {
        name: "Nkwerre",
        wards: {
          "nkwere-central": {
            name: "Nkwerre Central",
            pollingUnits: [
              "PU 089 - Nkwerre Central Market",
              "PU 090 - Nkwerre Central Primary School",
              "PU 091 - Nkwerre Central Community Hall",
              "PU 092 - Nkwerre Central Health Center",
              "PU 093 - Nkwerre Central Mosque",
              "PU 094 - Nkwerre Central Post Office",
              "PU 095 - Nkwerre Central Police Station",
              "PU 096 - Nkwerre Central Fire Station"
            ]
          }
        }
      },
      "isiala-mbano": {
        name: "Isiala Mbano",
        wards: {
          "isiala-mbano-central": {
            name: "Isiala Mbano Central",
            pollingUnits: [
              "PU 097 - Isiala Mbano Central Market",
              "PU 098 - Isiala Mbano Central Primary School",
              "PU 099 - Isiala Mbano Central Community Hall",
              "PU 100 - Isiala Mbano Central Health Center",
              "PU 101 - Isiala Mbano Central Mosque",
              "PU 102 - Isiala Mbano Central Post Office",
              "PU 103 - Isiala Mbano Central Police Station",
              "PU 104 - Isiala Mbano Central Fire Station"
            ]
          }
        }
      },
      "oguta": {
        name: "Oguta",
        wards: {
          "oguta-central": {
            name: "Oguta Central",
            pollingUnits: [
              "PU 105 - Oguta Central Market",
              "PU 106 - Oguta Central Primary School",
              "PU 107 - Oguta Central Community Hall",
              "PU 108 - Oguta Central Health Center",
              "PU 109 - Oguta Central Mosque",
              "PU 110 - Oguta Central Post Office",
              "PU 111 - Oguta Central Police Station",
              "PU 112 - Oguta Central Fire Station"
            ]
          }
        }
      },
      "ohaji-egbema": {
        name: "Ohaji Egbema",
        wards: {
          "ohaji-egbema-central": {
            name: "Ohaji Egbema Central",
            pollingUnits: [
              "PU 113 - Ohaji Egbema Central Market",
              "PU 114 - Ohaji Egbema Central Primary School",
              "PU 115 - Ohaji Egbema Central Community Hall",
              "PU 116 - Ohaji Egbema Central Health Center",
              "PU 117 - Ohaji Egbema Central Mosque",
              "PU 118 - Ohaji Egbema Central Post Office",
              "PU 119 - Ohaji Egbema Central Police Station",
              "PU 120 - Ohaji Egbema Central Fire Station"
            ]
          }
        }
      },
      "oru-east": {
        name: "Oru East",
        wards: {
          "oru-east-central": {
            name: "Oru East Central",
            pollingUnits: [
              "PU 121 - Oru East Central Market",
              "PU 122 - Oru East Central Primary School",
              "PU 123 - Oru East Central Community Hall",
              "PU 124 - Oru East Central Health Center",
              "PU 125 - Oru East Central Mosque",
              "PU 126 - Oru East Central Post Office",
              "PU 127 - Oru East Central Police Station",
              "PU 128 - Oru East Central Fire Station"
            ]
          }
        }
      },
      "oru-west": {
        name: "Oru West",
        wards: {
          "oru-west-central": {
            name: "Oru West Central",
            pollingUnits: [
              "PU 129 - Oru West Central Market",
              "PU 130 - Oru West Central Primary School",
              "PU 131 - Oru West Central Community Hall",
              "PU 132 - Oru West Central Health Center",
              "PU 133 - Oru West Central Mosque",
              "PU 134 - Oru West Central Post Office",
              "PU 135 - Oru West Central Police Station",
              "PU 136 - Oru West Central Fire Station"
            ]
          }
        }
      },
      "ideato-north": {
        name: "Ideato North",
        wards: {
          "ideato-north-central": {
            name: "Ideato North Central",
            pollingUnits: [
              "PU 137 - Ideato North Central Market",
              "PU 138 - Ideato North Central Primary School",
              "PU 139 - Ideato North Central Community Hall",
              "PU 140 - Ideato North Central Health Center",
              "PU 141 - Ideato North Central Mosque",
              "PU 142 - Ideato North Central Post Office",
              "PU 143 - Ideato North Central Police Station",
              "PU 144 - Ideato North Central Fire Station"
            ]
          }
        }
      },
      "ideato-south": {
        name: "Ideato South",
        wards: {
          "ideato-south-central": {
            name: "Ideato South Central",
            pollingUnits: [
              "PU 145 - Ideato South Central Market",
              "PU 146 - Ideato South Central Primary School",
              "PU 147 - Ideato South Central Community Hall",
              "PU 148 - Ideato South Central Health Center",
              "PU 149 - Ideato South South Central Mosque",
              "PU 150 - Ideato South Central Post Office",
              "PU 151 - Ideato South Central Police Station",
              "PU 152 - Ideato South Central Fire Station"
            ]
          }
        }
      },
      "aboh-mbaise": {
        name: "Aboh Mbaise",
        wards: {
          "aboh-mbaise-central": {
            name: "Aboh Mbaise Central",
            pollingUnits: [
              "PU 153 - Aboh Mbaise Central Market",
              "PU 154 - Aboh Mbaise Central Primary School",
              "PU 155 - Aboh Mbaise Central Community Hall",
              "PU 156 - Aboh Mbaise Central Health Center",
              "PU 157 - Aboh Mbaise Central Mosque",
              "PU 158 - Aboh Mbaise Central Post Office",
              "PU 159 - Aboh Mbaise Central Police Station",
              "PU 160 - Aboh Mbaise Central Fire Station"
            ]
          }
        }
      },
      "ahiazu-mbaise": {
        name: "Ahiazu Mbaise",
        wards: {
          "ahiazu-mbaise-central": {
            name: "Ahiazu Mbaise Central",
            pollingUnits: [
              "PU 161 - Ahiazu Mbaise Central Market",
              "PU 162 - Ahiazu Mbaise Central Primary School",
              "PU 163 - Ahiazu Mbaise Central Community Hall",
              "PU 164 - Ahiazu Mbaise Central Health Center",
              "PU 165 - Ahiazu Mbaise Central Mosque",
              "PU 166 - Ahiazu Mbaise Central Post Office",
              "PU 167 - Ahiazu Mbaise Central Police Station",
              "PU 168 - Ahiazu Mbaise Central Fire Station"
            ]
          }
        }
      },
      "ezinihitte": {
        name: "Ezinihitte",
        wards: {
          "ezinihitte-central": {
            name: "Ezinihitte Central",
            pollingUnits: [
              "PU 169 - Ezinihitte Central Market",
              "PU 170 - Ezinihitte Central Primary School",
              "PU 171 - Ezinihitte Central Community Hall",
              "PU 172 - Ezinihitte Central Health Center",
              "PU 173 - Ezinihitte Central Mosque",
              "PU 174 - Ezinihitte Central Post Office",
              "PU 175 - Ezinihitte Central Police Station",
              "PU 176 - Ezinihitte Central Fire Station"
            ]
          }
        }
      }
    }
  },
  jigawa: {
    name: "Jigawa",
    lgas: {
      "dutse": {
        name: "Dutse",
        wards: {
          "dutse-central": {
            name: "Dutse Central",
            pollingUnits: [
              "PU 001 - Dutse Central Market",
              "PU 002 - Dutse Central Primary School",
              "PU 003 - Dutse Central Community Hall",
              "PU 004 - Dutse Central Health Center",
              "PU 005 - Dutse Central Mosque",
              "PU 006 - Dutse Central Post Office",
              "PU 007 - Dutse Central Police Station",
              "PU 008 - Dutse Central Fire Station"
            ]
          }
        }
      },
      "hadejia": {
        name: "Hadejia",
        wards: {
          "hadejia-central": {
            name: "Hadejia Central",
            pollingUnits: [
              "PU 009 - Hadejia Central Market",
              "PU 010 - Hadejia Central Primary School",
              "PU 011 - Hadejia Central Community Hall",
              "PU 012 - Hadejia Central Health Center",
              "PU 013 - Hadejia Central Mosque",
              "PU 014 - Hadejia Central Post Office",
              "PU 015 - Hadejia Central Police Station",
              "PU 016 - Hadejia Central Fire Station"
            ]
          }
        }
      },
      "kazaure": {
        name: "Kazaure",
        wards: {
          "kazaure-central": {
            name: "Kazaure Central",
            pollingUnits: [
              "PU 017 - Kazaure Central Market",
              "PU 018 - Kazaure Central Primary School",
              "PU 019 - Kazaure Central Community Hall",
              "PU 020 - Kazaure Central Health Center",
              "PU 021 - Kazaure Central Mosque",
              "PU 022 - Kazaure Central Post Office",
              "PU 023 - Kazaure Central Police Station",
              "PU 024 - Kazaure Central Fire Station"
            ]
          }
        }
      },
      "ringim": {
        name: "Ringim",
        wards: {
          "ringim-central": {
            name: "Ringim Central",
            pollingUnits: [
              "PU 025 - Ringim Central Market",
              "PU 026 - Ringim Central Primary School",
              "PU 027 - Ringim Central Community Hall",
              "PU 028 - Ringim Central Health Center",
              "PU 029 - Ringim Central Mosque",
              "PU 030 - Ringim Central Post Office",
              "PU 031 - Ringim Central Police Station",
              "PU 032 - Ringim Central Fire Station"
            ]
          }
        }
      },
      "taura": {
        name: "Taura",
        wards: {
          "taura-central": {
            name: "Taura Central",
            pollingUnits: [
              "PU 033 - Taura Central Market",
              "PU 034 - Taura Central Primary School",
              "PU 035 - Taura Central Community Hall",
              "PU 036 - Taura Central Health Center",
              "PU 037 - Taura Central Mosque",
              "PU 038 - Taura Central Post Office",
              "PU 039 - Taura Central Police Station",
              "PU 040 - Taura Central Fire Station"
            ]
          }
        }
      },
      "gumel": {
        name: "Gumel",
        wards: {
          "gumel-central": {
            name: "Gumel Central",
            pollingUnits: [
              "PU 041 - Gumel Central Market",
              "PU 042 - Gumel Central Primary School",
              "PU 043 - Gumel Central Community Hall",
              "PU 044 - Gumel Central Health Center",
              "PU 045 - Gumel Central Mosque",
              "PU 046 - Gumel Central Post Office",
              "PU 047 - Gumel Central Police Station",
              "PU 048 - Gumel Central Fire Station"
            ]
          }
        }
      },
      "sule-tankarkar": {
        name: "Sule Tankarkar",
        wards: {
          "sule-tankarkar-central": {
            name: "Sule Tankarkar Central",
            pollingUnits: [
              "PU 049 - Sule Tankarkar Central Market",
              "PU 050 - Sule Tankarkar Central Primary School",
              "PU 051 - Sule Tankarkar Central Community Hall",
              "PU 052 - Sule Tankarkar Central Health Center",
              "PU 053 - Sule Tankarkar Central Mosque",
              "PU 054 - Sule Tankarkar Central Post Office",
              "PU 055 - Sule Tankarkar Central Police Station",
              "PU 056 - Sule Tankarkar Central Fire Station"
            ]
          }
        }
      },
      "gagarawa": {
        name: "Gagarawa",
        wards: {
          "gagarawa-central": {
            name: "Gagarawa Central",
            pollingUnits: [
              "PU 057 - Gagarawa Central Market",
              "PU 058 - Gagarawa Central Primary School",
              "PU 059 - Gagarawa Central Community Hall",
              "PU 060 - Gagarawa Central Health Center",
              "PU 061 - Gagarawa Central Mosque",
              "PU 062 - Gagarawa Central Post Office",
              "PU 063 - Gagarawa Central Police Station",
              "PU 064 - Gagarawa Central Fire Station"
            ]
          }
        }
      },
      "buji": {
        name: "Buji",
        wards: {
          "buji-central": {
            name: "Buji Central",
            pollingUnits: [
              "PU 065 - Buji Central Market",
              "PU 066 - Buji Central Primary School",
              "PU 067 - Buji Central Community Hall",
              "PU 068 - Buji Central Health Center",
              "PU 069 - Buji Central Mosque",
              "PU 070 - Buji Central Post Office",
              "PU 071 - Buji Central Police Station",
              "PU 072 - Buji Central Fire Station"
            ]
          }
        }
      },
      "kiri-kasama": {
        name: "Kiri Kasama",
        wards: {
          "kiri-kasama-central": {
            name: "Kiri Kasama Central",
            pollingUnits: [
              "PU 073 - Kiri Kasama Central Market",
              "PU 074 - Kiri Kasama Central Primary School",
              "PU 075 - Kiri Kasama Central Community Hall",
              "PU 076 - Kiri Kasama Central Health Center",
              "PU 077 - Kiri Kasama Central Mosque",
              "PU 078 - Kiri Kasama Central Post Office",
              "PU 079 - Kiri Kasama Central Police Station",
              "PU 080 - Kiri Kasama Central Fire Station"
            ]
          }
        }
      },
      "babura": {
        name: "Babura",
        wards: {
          "babura-central": {
            name: "Babura Central",
            pollingUnits: [
              "PU 081 - Babura Central Market",
              "PU 082 - Babura Central Primary School",
              "PU 083 - Babura Central Community Hall",
              "PU 084 - Babura Central Health Center",
              "PU 085 - Babura Central Mosque",
              "PU 086 - Babura Central Post Office",
              "PU 087 - Babura Central Police Station",
              "PU 088 - Babura Central Fire Station"
            ]
          }
        }
      },
      "garki": {
        name: "Garki",
        wards: {
          "garki-central": {
            name: "Garki Central",
            pollingUnits: [
              "PU 089 - Garki Central Market",
              "PU 090 - Garki Central Primary School",
              "PU 091 - Garki Central Community Hall",
              "PU 092 - Garki Central Health Center",
              "PU 093 - Garki Central Mosque",
              "PU 094 - Garki Central Post Office",
              "PU 095 - Garki Central Police Station",
              "PU 096 - Garki Central Fire Station"
            ]
          }
        }
      },
      "maigatari": {
        name: "Maigatari",
        wards: {
          "maigatari-central": {
            name: "Maigatari Central",
            pollingUnits: [
              "PU 097 - Maigatari Central Market",
              "PU 098 - Maigatari Central Primary School",
              "PU 099 - Maigatari Central Community Hall",
              "PU 100 - Maigatari Central Health Center",
              "PU 101 - Maigatari Central Mosque",
              "PU 102 - Maigatari Central Post Office",
              "PU 103 - Maigatari Central Police Station",
              "PU 104 - Maigatari Central Fire Station"
            ]
          }
        }
      },
      "miga": {
        name: "Miga",
        wards: {
          "miga-central": {
            name: "Miga Central",
            pollingUnits: [
              "PU 105 - Miga Central Market",
              "PU 106 - Miga Central Primary School",
              "PU 107 - Miga Central Community Hall",
              "PU 108 - Miga Central Health Center",
              "PU 109 - Miga Central Mosque",
              "PU 110 - Miga Central Post Office",
              "PU 111 - Miga Central Police Station",
              "PU 112 - Miga Central Fire Station"
            ]
          }
        }
      },
      "yankwashi": {
        name: "Yankwashi",
        wards: {
          "yankwashi-central": {
            name: "Yankwashi Central",
            pollingUnits: [
              "PU 113 - Yankwashi Central Market",
              "PU 114 - Yankwashi Central Primary School",
              "PU 115 - Yankwashi Central Community Hall",
              "PU 116 - Yankwashi Central Health Center",
              "PU 117 - Yankwashi Central Mosque",
              "PU 118 - Yankwashi Central Post Office",
              "PU 119 - Yankwashi Central Police Station",
              "PU 120 - Yankwashi Central Fire Station"
            ]
          }
        }
      },
      "kafin-hausa": {
        name: "Kafin Hausa",
        wards: {
          "kafin-hausa-central": {
            name: "Kafin Hausa Central",
            pollingUnits: [
              "PU 121 - Kafin Hausa Central Market",
              "PU 122 - Kafin Hausa Central Primary School",
              "PU 123 - Kafin Hausa Central Community Hall",
              "PU 124 - Kafin Hausa Central Health Center",
              "PU 125 - Kafin Hausa Central Mosque",
              "PU 126 - Kafin Hausa Central Post Office",
              "PU 127 - Kafin Hausa Central Police Station",
              "PU 128 - Kafin Hausa Central Fire Station"
            ]
          }
        }
      },
      "kaugama": {
        name: "Kaugama",
        wards: {
          "kaugama-central": {
            name: "Kaugama Central",
            pollingUnits: [
              "PU 129 - Kaugama Central Market",
              "PU 130 - Kaugama Central Primary School",
              "PU 131 - Kaugama Central Community Hall",
              "PU 132 - Kaugama Central Health Center",
              "PU 133 - Kaugama Central Mosque",
              "PU 134 - Kaugama Central Post Office",
              "PU 135 - Kaugama Central Police Station",
              "PU 136 - Kaugama Central Fire Station"
            ]
          }
        }
      },
      "mallam-madori": {
        name: "Mallam Madori",
        wards: {
          "mallam-madori-central": {
            name: "Mallam Madori Central",
            pollingUnits: [
              "PU 137 - Mallam Madori Central Market",
              "PU 138 - Mallam Madori Central Primary School",
              "PU 139 - Mallam Madori Central Community Hall",
              "PU 140 - Mallam Madori Central Health Center",
              "PU 141 - Mallam Madori Central Mosque",
              "PU 142 - Mallam Madori Central Post Office",
              "PU 143 - Mallam Madori Central Police Station",
              "PU 144 - Mallam Madori Central Fire Station"
            ]
          }
        }
      },
      "auyo": {
        name: "Auyo",
        wards: {
          "auyo-central": {
            name: "Auyo Central",
            pollingUnits: [
              "PU 145 - Auyo Central Market",
              "PU 146 - Auyo Central Primary School",
              "PU 147 - Auyo Central Community Hall",
              "PU 148 - Auyo Central Health Center",
              "PU 149 - Auyo Central Mosque",
              "PU 150 - Auyo Central Post Office",
              "PU 151 - Auyo Central Police Station",
              "PU 152 - Auyo Central Fire Station"
            ]
          }
        }
      },
      "birniwa": {
        name: "Birniwa",
        wards: {
          "birniwa-central": {
            name: "Birniwa Central",
            pollingUnits: [
              "PU 153 - Birniwa Central Market",
              "PU 154 - Birniwa Central Primary School",
              "PU 155 - Birniwa Central Community Hall",
              "PU 156 - Birniwa Central Health Center",
              "PU 157 - Birniwa Central Mosque",
              "PU 158 - Birniwa Central Post Office",
              "PU 159 - Birniwa Central Police Station",
              "PU 160 - Birniwa Central Fire Station"
            ]
          }
        }
      },
      "guri": {
        name: "Guri",
        wards: {
          "guri-central": {
            name: "Guri Central",
            pollingUnits: [
              "PU 161 - Guri Central Market",
              "PU 162 - Guri Central Primary School",
              "PU 163 - Guri Central Community Hall",
              "PU 164 - Guri Central Health Center",
              "PU 165 - Guri Central Mosque",
              "PU 166 - Guri Central Post Office",
              "PU 167 - Guri Central Police Station",
              "PU 168 - Guri Central Fire Station"
            ]
          }
        }
      }
    }
  },
  kaduna: {
    name: "Kaduna",
    lgas: {
      "kaduna-north": {
        name: "Kaduna North",
        wards: {
          "kaduna-north-central": {
            name: "Kaduna North Central",
            pollingUnits: [
              "PU 001 - Kaduna North Central Market",
              "PU 002 - Kaduna North Central Primary School",
              "PU 003 - Kaduna North Central Community Hall",
              "PU 004 - Kaduna North Central Health Center",
              "PU 005 - Kaduna North Central Mosque",
              "PU 006 - Kaduna North Central Post Office",
              "PU 007 - Kaduna North Central Police Station",
              "PU 008 - Kaduna North Central Fire Station"
            ]
          },
          "kaduna-north-east": {
            name: "Kaduna North East",
            pollingUnits: [
              "PU 009 - Kaduna North East Market",
              "PU 010 - Kaduna North East Primary School",
              "PU 011 - Kaduna North East Community Hall",
              "PU 012 - Kaduna North East Health Center",
              "PU 013 - Kaduna North East Mosque",
              "PU 014 - Kaduna North East Post Office",
              "PU 015 - Kaduna North East Police Station",
              "PU 016 - Kaduna North East Fire Station"
            ]
          },
          "kaduna-north-west": {
            name: "Kaduna North West",
            pollingUnits: [
              "PU 017 - Kaduna North West Market",
              "PU 018 - Kaduna North West Primary School",
              "PU 019 - Kaduna North West Community Hall",
              "PU 020 - Kaduna North West Health Center",
              "PU 021 - Kaduna North West Mosque",
              "PU 022 - Kaduna North West Post Office",
              "PU 023 - Kaduna North West Police Station",
              "PU 024 - Kaduna North West Fire Station"
            ]
          }
        }
      },
      "kaduna-south": {
        name: "Kaduna South",
        wards: {
          "kaduna-south-central": {
            name: "Kaduna South Central",
            pollingUnits: [
              "PU 025 - Kaduna South Central Market",
              "PU 026 - Kaduna South Central Primary School",
              "PU 027 - Kaduna South Central Community Hall",
              "PU 028 - Kaduna South Central Health Center",
              "PU 029 - Kaduna South Central Mosque",
              "PU 030 - Kaduna South Central Post Office",
              "PU 031 - Kaduna South Central Police Station",
              "PU 032 - Kaduna South Central Fire Station"
            ]
          },
          "kaduna-south-east": {
            name: "Kaduna South East",
            pollingUnits: [
              "PU 033 - Kaduna South East Market",
              "PU 034 - Kaduna South East Primary School",
              "PU 035 - Kaduna South East Community Hall",
              "PU 036 - Kaduna South East Health Center",
              "PU 037 - Kaduna South East Mosque",
              "PU 038 - Kaduna South East Post Office",
              "PU 039 - Kaduna South East Police Station",
              "PU 040 - Kaduna South East Fire Station"
            ]
          },
          "kaduna-south-west": {
            name: "Kaduna South West",
            pollingUnits: [
              "PU 041 - Kaduna South West Market",
              "PU 042 - Kaduna South West Primary School",
              "PU 043 - Kaduna South West Community Hall",
              "PU 044 - Kaduna South West Health Center",
              "PU 045 - Kaduna South West Mosque",
              "PU 046 - Kaduna South West Post Office",
              "PU 047 - Kaduna South West Police Station",
              "PU 048 - Kaduna South West Fire Station"
            ]
          }
        }
      },
      "zaria": {
        name: "Zaria",
        wards: {
          "zaria-central": {
            name: "Zaria Central",
            pollingUnits: [
              "PU 049 - Zaria Central Market",
              "PU 050 - Zaria Central Primary School",
              "PU 051 - Zaria Central Community Hall",
              "PU 052 - Zaria Central Health Center",
              "PU 053 - Zaria Central Mosque",
              "PU 054 - Zaria Central Post Office",
              "PU 055 - Zaria Central Police Station",
              "PU 056 - Zaria Central Fire Station"
            ]
          },
          "zaria-north": {
            name: "Zaria North",
            pollingUnits: [
              "PU 057 - Zaria North Market",
              "PU 058 - Zaria North Primary School",
              "PU 059 - Zaria North Community Hall",
              "PU 060 - Zaria North Health Center",
              "PU 061 - Zaria North Mosque",
              "PU 062 - Zaria North Post Office",
              "PU 063 - Zaria North Police Station",
              "PU 064 - Zaria North Fire Station"
            ]
          },
          "zaria-south": {
            name: "Zaria South",
            pollingUnits: [
              "PU 065 - Zaria South Market",
              "PU 066 - Zaria South Primary School",
              "PU 067 - Zaria South Community Hall",
              "PU 068 - Zaria South Health Center",
              "PU 069 - Zaria South Mosque",
              "PU 070 - Zaria South Post Office",
              "PU 071 - Zaria South Police Station",
              "PU 072 - Zaria South Fire Station"
            ]
          }
        }
      },
      "sabon-gari": {
        name: "Sabon Gari",
        wards: {
          "sabon-gari-central": {
            name: "Sabon Gari Central",
            pollingUnits: [
              "PU 073 - Sabon Gari Central Market",
              "PU 074 - Sabon Gari Central Primary School",
              "PU 075 - Sabon Gari Central Community Hall",
              "PU 076 - Sabon Gari Central Health Center",
              "PU 077 - Sabon Gari Central Mosque",
              "PU 078 - Sabon Gari Central Post Office",
              "PU 079 - Sabon Gari Central Police Station",
              "PU 080 - Sabon Gari Central Fire Station"
            ]
          },
          "sabon-gari-north": {
            name: "Sabon Gari North",
            pollingUnits: [
              "PU 081 - Sabon Gari North Market",
              "PU 082 - Sabon Gari North Primary School",
              "PU 083 - Sabon Gari North Community Hall",
              "PU 084 - Sabon Gari North Health Center",
              "PU 085 - Sabon Gari North Mosque",
              "PU 086 - Sabon Gari North Post Office",
              "PU 087 - Sabon Gari North Police Station",
              "PU 088 - Sabon Gari North Fire Station"
            ]
          },
          "sabon-gari-south": {
            name: "Sabon Gari South",
            pollingUnits: [
              "PU 089 - Sabon Gari South Market",
              "PU 090 - Sabon Gari South Primary School",
              "PU 091 - Sabon Gari South Community Hall",
              "PU 092 - Sabon Gari South Health Center",
              "PU 093 - Sabon Gari South Mosque",
              "PU 094 - Sabon Gari South Post Office",
              "PU 095 - Sabon Gari South Police Station",
              "PU 096 - Sabon Gari South Fire Station"
            ]
          }
        }
      },
      "igabi": {
        name: "Igabi",
        wards: {
          "igabi-central": {
            name: "Igabi Central",
            pollingUnits: [
              "PU 033 - Igabi Central Market",
              "PU 034 - Igabi Central Primary School",
              "PU 035 - Igabi Central Community Hall",
              "PU 036 - Igabi Central Health Center",
              "PU 037 - Igabi Central Mosque",
              "PU 038 - Igabi Central Post Office",
              "PU 039 - Igabi Central Police Station",
              "PU 040 - Igabi Central Fire Station"
            ]
          }
        }
      },
      "chikun": {
        name: "Chikun",
        wards: {
          "chikun-central": {
            name: "Chikun Central",
            pollingUnits: [
              "PU 041 - Chikun Central Market",
              "PU 042 - Chikun Central Primary School",
              "PU 043 - Chikun Central Community Hall",
              "PU 044 - Chikun Central Health Center",
              "PU 045 - Chikun Central Mosque",
              "PU 046 - Chikun Central Post Office",
              "PU 047 - Chikun Central Police Station",
              "PU 048 - Chikun Central Fire Station"
            ]
          }
        }
      },
      "kajuru": {
        name: "Kajuru",
        wards: {
          "kajuru-central": {
            name: "Kajuru Central",
            pollingUnits: [
              "PU 049 - Kajuru Central Market",
              "PU 050 - Kajuru Central Primary School",
              "PU 051 - Kajuru Central Community Hall",
              "PU 052 - Kajuru Central Health Center",
              "PU 053 - Kajuru Central Mosque",
              "PU 054 - Kajuru Central Post Office",
              "PU 055 - Kajuru Central Police Station",
              "PU 056 - Kajuru Central Fire Station"
            ]
          }
        }
      },
      "kachia": {
        name: "Kachia",
        wards: {
          "kachia-central": {
            name: "Kachia Central",
            pollingUnits: [
              "PU 057 - Kachia Central Market",
              "PU 058 - Kachia Central Primary School",
              "PU 059 - Kachia Central Community Hall",
              "PU 060 - Kachia Central Health Center",
              "PU 061 - Kachia Central Mosque",
              "PU 062 - Kachia Central Post Office",
              "PU 063 - Kachia Central Police Station",
              "PU 064 - Kachia Central Fire Station"
            ]
          }
        }
      },
      "kagarko": {
        name: "Kagarko",
        wards: {
          "kagarko-central": {
            name: "Kagarko Central",
            pollingUnits: [
              "PU 065 - Kagarko Central Market",
              "PU 066 - Kagarko Central Primary School",
              "PU 067 - Kagarko Central Community Hall",
              "PU 068 - Kagarko Central Health Center",
              "PU 069 - Kagarko Central Mosque",
              "PU 070 - Kagarko Central Post Office",
              "PU 071 - Kagarko Central Police Station",
              "PU 072 - Kagarko Central Fire Station"
            ]
          }
        }
      },
      "jaba": {
        name: "Jaba",
        wards: {
          "jaba-central": {
            name: "Jaba Central",
            pollingUnits: [
              "PU 073 - Jaba Central Market",
              "PU 074 - Jaba Central Primary School",
              "PU 075 - Jaba Central Community Hall",
              "PU 076 - Jaba Central Health Center",
              "PU 077 - Jaba Central Mosque",
              "PU 078 - Jaba Central Post Office",
              "PU 079 - Jaba Central Police Station",
              "PU 080 - Jaba Central Fire Station"
            ]
          }
        }
      },
      "sanga": {
        name: "Sanga",
        wards: {
          "sanga-central": {
            name: "Sanga Central",
            pollingUnits: [
              "PU 081 - Sanga Central Market",
              "PU 082 - Sanga Central Primary School",
              "PU 083 - Sanga Central Community Hall",
              "PU 084 - Sanga Central Health Center",
              "PU 085 - Sanga Central Mosque",
              "PU 086 - Sanga Central Post Office",
              "PU 087 - Sanga Central Police Station",
              "PU 088 - Sanga Central Fire Station"
            ]
          }
        }
      },
      "kudan": {
        name: "Kudan",
        wards: {
          "kudan-central": {
            name: "Kudan Central",
            pollingUnits: [
              "PU 089 - Kudan Central Market",
              "PU 090 - Kudan Central Primary School",
              "PU 091 - Kudan Central Community Hall",
              "PU 092 - Kudan Central Health Center",
              "PU 093 - Kudan Central Mosque",
              "PU 094 - Kudan Central Post Office",
              "PU 095 - Kudan Central Police Station",
              "PU 096 - Kudan Central Fire Station"
            ]
          }
        }
      },
      "makarfi": {
        name: "Makarfi",
        wards: {
          "makarfi-central": {
            name: "Makarfi Central",
            pollingUnits: [
              "PU 097 - Makarfi Central Market",
              "PU 098 - Makarfi Central Primary School",
              "PU 099 - Makarfi Central Community Hall",
              "PU 100 - Makarfi Central Health Center",
              "PU 101 - Makarfi Central Mosque",
              "PU 102 - Makarfi Central Post Office",
              "PU 103 - Makarfi Central Police Station",
              "PU 104 - Makarfi Central Fire Station"
            ]
          }
        }
      },
      "ikara": {
        name: "Ikara",
        wards: {
          "ikara-central": {
            name: "Ikara Central",
            pollingUnits: [
              "PU 105 - Ikara Central Market",
              "PU 106 - Ikara Central Primary School",
              "PU 107 - Ikara Central Community Hall",
              "PU 108 - Ikara Central Health Center",
              "PU 109 - Ikara Central Mosque",
              "PU 110 - Ikara Central Post Office",
              "PU 111 - Ikara Central Police Station",
              "PU 112 - Ikara Central Fire Station"
            ]
          }
        }
      },
      "kubau": {
        name: "Kubau",
        wards: {
          "kubau-central": {
            name: "Kubau Central",
            pollingUnits: [
              "PU 113 - Kubau Central Market",
              "PU 114 - Kubau Central Primary School",
              "PU 115 - Kubau Central Community Hall",
              "PU 116 - Kubau Central Health Center",
              "PU 117 - Kubau Central Mosque",
              "PU 118 - Kubau Central Post Office",
              "PU 119 - Kubau Central Police Station",
              "PU 120 - Kubau Central Fire Station"
            ]
          }
        }
      },
      "lere": {
        name: "Lere",
        wards: {
          "lere-central": {
            name: "Lere Central",
            pollingUnits: [
              "PU 121 - Lere Central Market",
              "PU 122 - Lere Central Primary School",
              "PU 123 - Lere Central Community Hall",
              "PU 124 - Lere Central Health Center",
              "PU 125 - Lere Central Mosque",
              "PU 126 - Lere Central Post Office",
              "PU 127 - Lere Central Police Station",
              "PU 128 - Lere Central Fire Station"
            ]
          }
        }
      },
      "birnin-gwari": {
        name: "Birnin Gwari",
        wards: {
          "birnin-gwari-central": {
            name: "Birnin Gwari Central",
            pollingUnits: [
              "PU 129 - Birnin Gwari Central Market",
              "PU 130 - Birnin Gwari Central Primary School",
              "PU 131 - Birnin Gwari Central Community Hall",
              "PU 132 - Birnin Gwari Central Health Center",
              "PU 133 - Birnin Gwari Central Mosque",
              "PU 134 - Birnin Gwari Central Post Office",
              "PU 135 - Birnin Gwari Central Police Station",
              "PU 136 - Birnin Gwari Central Fire Station"
            ]
          }
        }
      },
      "giwa": {
        name: "Giwa",
        wards: {
          "giwa-central": {
            name: "Giwa Central",
            pollingUnits: [
              "PU 137 - Giwa Central Market",
              "PU 138 - Giwa Central Primary School",
              "PU 139 - Giwa Central Community Hall",
              "PU 140 - Giwa Central Health Center",
              "PU 141 - Giwa Central Mosque",
              "PU 142 - Giwa Central Post Office",
              "PU 143 - Giwa Central Police Station",
              "PU 144 - Giwa Central Fire Station"
            ]
          }
        }
      }
    }
  },
  kano: {
    name: "Kano",
    lgas: {
      "kano-municipal": {
        name: "Kano Municipal",
        wards: {
          "fagge": {
            name: "Fagge",
            pollingUnits: [
              "PU 001 - Fagge Central Market",
              "PU 002 - Fagge Primary School",
              "PU 003 - Fagge Community Hall",
              "PU 004 - Fagge Health Center",
              "PU 005 - Fagge Central Mosque",
              "PU 006 - Fagge Post Office",
              "PU 007 - Fagge Police Station",
              "PU 008 - Fagge Fire Station"
            ]
          },
          "dala": {
            name: "Dala",
            pollingUnits: [
              "PU 009 - Dala Central Market",
              "PU 010 - Dala Primary School",
              "PU 011 - Dala Community Hall",
              "PU 012 - Dala Health Center",
              "PU 013 - Dala Central Mosque",
              "PU 014 - Dala Post Office",
              "PU 015 - Dala Police Station",
              "PU 016 - Dala Fire Station"
            ]
          },
          "gwale": {
            name: "Gwale",
            pollingUnits: [
              "PU 017 - Gwale Central Market",
              "PU 018 - Gwale Primary School",
              "PU 019 - Gwale Community Hall",
              "PU 020 - Gwale Health Center",
              "PU 021 - Gwale Central Mosque",
              "PU 022 - Gwale Post Office",
              "PU 023 - Gwale Police Station",
              "PU 024 - Gwale Fire Station"
            ]
          }
        }
      },
      "fagge": {
        name: "Fagge",
        wards: {
          "fagge-central": {
            name: "Fagge Central",
            pollingUnits: [
              "PU 025 - Fagge Central Market",
              "PU 026 - Fagge Central Primary School",
              "PU 027 - Fagge Central Community Hall",
              "PU 028 - Fagge Central Health Center",
              "PU 029 - Fagge Central Mosque",
              "PU 030 - Fagge Central Post Office",
              "PU 031 - Fagge Central Police Station",
              "PU 032 - Fagge Central Fire Station"
            ]
          },
          "fagge-north": {
            name: "Fagge North",
            pollingUnits: [
              "PU 033 - Fagge North Market",
              "PU 034 - Fagge North Primary School",
              "PU 035 - Fagge North Community Hall",
              "PU 036 - Fagge North Health Center",
              "PU 037 - Fagge North Mosque",
              "PU 038 - Fagge North Post Office",
              "PU 039 - Fagge North Police Station",
              "PU 040 - Fagge North Fire Station"
            ]
          },
          "fagge-south": {
            name: "Fagge South",
            pollingUnits: [
              "PU 041 - Fagge South Market",
              "PU 042 - Fagge South Primary School",
              "PU 043 - Fagge South Community Hall",
              "PU 044 - Fagge South Health Center",
              "PU 045 - Fagge South Mosque",
              "PU 046 - Fagge South Post Office",
              "PU 047 - Fagge South Police Station",
              "PU 048 - Fagge South Fire Station"
            ]
          }
        }
      },
      "tarauni": {
        name: "Tarauni",
        wards: {
          "tarauni-central": {
            name: "Tarauni Central",
            pollingUnits: [
              "PU 049 - Tarauni Central Market",
              "PU 050 - Tarauni Central Primary School",
              "PU 051 - Tarauni Central Community Hall",
              "PU 052 - Tarauni Central Health Center",
              "PU 053 - Tarauni Central Mosque",
              "PU 054 - Tarauni Central Post Office",
              "PU 055 - Tarauni Central Police Station",
              "PU 056 - Tarauni Central Fire Station"
            ]
          },
          "tarauni-north": {
            name: "Tarauni North",
            pollingUnits: [
              "PU 057 - Tarauni North Market",
              "PU 058 - Tarauni North Primary School",
              "PU 059 - Tarauni North Community Hall",
              "PU 060 - Tarauni North Health Center",
              "PU 061 - Tarauni North Mosque",
              "PU 062 - Tarauni North Post Office",
              "PU 063 - Tarauni North Police Station",
              "PU 064 - Tarauni North Fire Station"
            ]
          },
          "tarauni-south": {
            name: "Tarauni South",
            pollingUnits: [
              "PU 065 - Tarauni South Market",
              "PU 066 - Tarauni South Primary School",
              "PU 067 - Tarauni South Community Hall",
              "PU 068 - Tarauni South Health Center",
              "PU 069 - Tarauni South Mosque",
              "PU 070 - Tarauni South Post Office",
              "PU 071 - Tarauni South Police Station",
              "PU 072 - Tarauni South Fire Station"
            ]
          }
        }
      }
    }
  },
  katsina: {
    name: "Katsina",
    lgas: {
      "katsina": {
        name: "Katsina",
        wards: {
          "katsina-central": {
            name: "Katsina Central",
            pollingUnits: [
              "PU 001 - Katsina Central Market",
              "PU 002 - Katsina Central Primary School",
              "PU 003 - Katsina Central Community Hall",
              "PU 004 - Katsina Central Health Center",
              "PU 005 - Katsina Central Mosque",
              "PU 006 - Katsina Central Post Office",
              "PU 007 - Katsina Central Police Station",
              "PU 008 - Katsina Central Fire Station"
            ]
          }
        }
      },
      "daura": {
        name: "Daura",
        wards: {
          "daura-central": {
            name: "Daura Central",
            pollingUnits: [
              "PU 009 - Daura Central Market",
              "PU 010 - Daura Central Primary School",
              "PU 011 - Daura Central Community Hall",
              "PU 012 - Daura Central Health Center",
              "PU 013 - Daura Central Mosque",
              "PU 014 - Daura Central Post Office",
              "PU 015 - Daura Central Police Station",
              "PU 016 - Daura Central Fire Station"
            ]
          }
        }
      },
      "funtua": {
        name: "Funtua",
        wards: {
          "funtua-central": {
            name: "Funtua Central",
            pollingUnits: [
              "PU 017 - Funtua Central Market",
              "PU 018 - Funtua Central Primary School",
              "PU 019 - Funtua Central Community Hall",
              "PU 020 - Funtua Central Health Center",
              "PU 021 - Funtua Central Mosque",
              "PU 022 - Funtua Central Post Office",
              "PU 023 - Funtua Central Police Station",
              "PU 024 - Funtua Central Fire Station"
            ]
          }
        }
      },
      "malumfashi": {
        name: "Malumfashi",
        wards: {
          "malumfashi-central": {
            name: "Malumfashi Central",
            pollingUnits: [
              "PU 025 - Malumfashi Central Market",
              "PU 026 - Malumfashi Central Primary School",
              "PU 027 - Malumfashi Central Community Hall",
              "PU 028 - Malumfashi Central Health Center",
              "PU 029 - Malumfashi Central Mosque",
              "PU 030 - Malumfashi Central Post Office",
              "PU 031 - Malumfashi Central Police Station",
              "PU 032 - Malumfashi Central Fire Station"
            ]
          }
        }
      },
      "kankara": {
        name: "Kankara",
        wards: {
          "kankara-central": {
            name: "Kankara Central",
            pollingUnits: [
              "PU 033 - Kankara Central Market",
              "PU 034 - Kankara Central Primary School",
              "PU 035 - Kankara Central Community Hall",
              "PU 036 - Kankara Central Health Center",
              "PU 037 - Kankara Central Mosque",
              "PU 038 - Kankara Central Post Office",
              "PU 039 - Kankara Central Police Station",
              "PU 040 - Kankara Central Fire Station"
            ]
          }
        }
      },
      "bakori": {
        name: "Bakori",
        wards: {
          "bakori-central": {
            name: "Bakori Central",
            pollingUnits: [
              "PU 041 - Bakori Central Market",
              "PU 042 - Bakori Central Primary School",
              "PU 043 - Bakori Central Community Hall",
              "PU 044 - Bakori Central Health Center",
              "PU 045 - Bakori Central Mosque",
              "PU 046 - Bakori Central Post Office",
              "PU 047 - Bakori Central Police Station",
              "PU 048 - Bakori Central Fire Station"
            ]
          }
        }
      },
      "danja": {
        name: "Danja",
        wards: {
          "danja-central": {
            name: "Danja Central",
            pollingUnits: [
              "PU 049 - Danja Central Market",
              "PU 050 - Danja Central Primary School",
              "PU 051 - Danja Central Community Hall",
              "PU 052 - Danja Central Health Center",
              "PU 053 - Danja Central Mosque",
              "PU 054 - Danja Central Post Office",
              "PU 055 - Danja Central Police Station",
              "PU 056 - Danja Central Fire Station"
            ]
          }
        }
      },
      "jibia": {
        name: "Jibia",
        wards: {
          "jibia-central": {
            name: "Jibia Central",
            pollingUnits: [
              "PU 057 - Jibia Central Market",
              "PU 058 - Jibia Central Primary School",
              "PU 059 - Jibia Central Community Hall",
              "PU 060 - Jibia Central Health Center",
              "PU 061 - Jibia Central Mosque",
              "PU 062 - Jibia Central Post Office",
              "PU 063 - Jibia Central Police Station",
              "PU 064 - Jibia Central Fire Station"
            ]
          }
        }
      },
      "kaita": {
        name: "Kaita",
        wards: {
          "kaita-central": {
            name: "Kaita Central",
            pollingUnits: [
              "PU 065 - Kaita Central Market",
              "PU 066 - Kaita Central Primary School",
              "PU 067 - Kaita Central Community Hall",
              "PU 068 - Kaita Central Health Center",
              "PU 069 - Kaita Central Mosque",
              "PU 070 - Kaita Central Post Office",
              "PU 071 - Kaita Central Police Station",
              "PU 072 - Kaita Central Fire Station"
            ]
          }
        }
      },
      "sabuwa": {
        name: "Sabuwa",
        wards: {
          "sabuwa-central": {
            name: "Sabuwa Central",
            pollingUnits: [
              "PU 073 - Sabuwa Central Market",
              "PU 074 - Sabuwa Central Primary School",
              "PU 075 - Sabuwa Central Community Hall",
              "PU 076 - Sabuwa Central Health Center",
              "PU 077 - Sabuwa Central Mosque",
              "PU 078 - Sabuwa Central Post Office",
              "PU 079 - Sabuwa Central Police Station",
              "PU 080 - Sabuwa Central Fire Station"
            ]
          }
        }
      },
      "charanchi": {
        name: "Charanchi",
        wards: {
          "charanchi-central": {
            name: "Charanchi Central",
            pollingUnits: [
              "PU 081 - Charanchi Central Market",
              "PU 082 - Charanchi Central Primary School",
              "PU 083 - Charanchi Central Community Hall",
              "PU 084 - Charanchi Central Health Center",
              "PU 085 - Charanchi Central Mosque",
              "PU 086 - Charanchi Central Post Office",
              "PU 087 - Charanchi Central Police Station",
              "PU 088 - Charanchi Central Fire Station"
            ]
          }
        }
      },
      "rimi": {
        name: "Rimi",
        wards: {
          "rimi-central": {
            name: "Rimi Central",
            pollingUnits: [
              "PU 089 - Rimi Central Market",
              "PU 090 - Rimi Central Primary School",
              "PU 091 - Rimi Central Community Hall",
              "PU 092 - Rimi Central Health Center",
              "PU 093 - Rimi Central Mosque",
              "PU 094 - Rimi Central Post Office",
              "PU 095 - Rimi Central Police Station",
              "PU 096 - Rimi Central Fire Station"
            ]
          }
        }
      },
      "batagarawa": {
        name: "Batagarawa",
        wards: {
          "batagarawa-central": {
            name: "Batagarawa Central",
            pollingUnits: [
              "PU 097 - Batagarawa Central Market",
              "PU 098 - Batagarawa Central Primary School",
              "PU 099 - Batagarawa Central Community Hall",
              "PU 100 - Batagarawa Central Health Center",
              "PU 101 - Batagarawa Central Mosque",
              "PU 102 - Batagarawa Central Post Office",
              "PU 103 - Batagarawa Central Police Station",
              "PU 104 - Batagarawa Central Fire Station"
            ]
          }
        }
      },
      "batsari": {
        name: "Batsari",
        wards: {
          "batsari-central": {
            name: "Batsari Central",
            pollingUnits: [
              "PU 105 - Batsari Central Market",
              "PU 106 - Batsari Central Primary School",
              "PU 107 - Batsari Central Community Hall",
              "PU 108 - Batsari Central Health Center",
              "PU 109 - Batsari Central Mosque",
              "PU 110 - Batsari Central Post Office",
              "PU 111 - Batsari Central Police Station",
              "PU 112 - Batsari Central Fire Station"
            ]
          }
        }
      },
      "safana": {
        name: "Safana",
        wards: {
          "safana-central": {
            name: "Safana Central",
            pollingUnits: [
              "PU 113 - Safana Central Market",
              "PU 114 - Safana Central Primary School",
              "PU 115 - Safana Central Community Hall",
              "PU 116 - Safana Central Health Center",
              "PU 117 - Safana Central Mosque",
              "PU 118 - Safana Central Post Office",
              "PU 119 - Safana Central Police Station",
              "PU 120 - Safana Central Fire Station"
            ]
          }
        }
      },
      "musawa": {
        name: "Musawa",
        wards: {
          "musawa-central": {
            name: "Musawa Central",
            pollingUnits: [
              "PU 121 - Musawa Central Market",
              "PU 122 - Musawa Central Primary School",
              "PU 123 - Musawa Central Community Hall",
              "PU 124 - Musawa Central Health Center",
              "PU 125 - Musawa Central Mosque",
              "PU 126 - Musawa Central Post Office",
              "PU 127 - Musawa Central Police Station",
              "PU 128 - Musawa Central Fire Station"
            ]
          }
        }
      },
      "kafur": {
        name: "Kafur",
        wards: {
          "kafur-central": {
            name: "Kafur Central",
            pollingUnits: [
              "PU 129 - Kafur Central Market",
              "PU 130 - Kafur Central Primary School",
              "PU 131 - Kafur Central Community Hall",
              "PU 132 - Kafur Central Health Center",
              "PU 133 - Kafur Central Mosque",
              "PU 134 - Kafur Central Post Office",
              "PU 135 - Kafur Central Police Station",
              "PU 136 - Kafur Central Fire Station"
            ]
          }
        }
      },
      "dandume": {
        name: "Dandume",
        wards: {
          "dandume-central": {
            name: "Dandume Central",
            pollingUnits: [
              "PU 137 - Dandume Central Market",
              "PU 138 - Dandume Central Primary School",
              "PU 139 - Dandume Central Community Hall",
              "PU 140 - Dandume Central Health Center",
              "PU 141 - Dandume Central Mosque",
              "PU 142 - Dandume Central Post Office",
              "PU 143 - Dandume Central Police Station",
              "PU 144 - Dandume Central Fire Station"
            ]
          }
        }
      },
      "maiadua": {
        name: "Maiadua",
        wards: {
          "maiadua-central": {
            name: "Maiadua Central",
            pollingUnits: [
              "PU 145 - Maiadua Central Market",
              "PU 146 - Maiadua Central Primary School",
              "PU 147 - Maiadua Central Community Hall",
              "PU 148 - Maiadua Central Health Center",
              "PU 149 - Maiadua Central Mosque",
              "PU 150 - Maiadua Central Post Office",
              "PU 151 - Maiadua Central Police Station",
              "PU 152 - Maiadua Central Fire Station"
            ]
          }
        }
      },
      "dura": {
        name: "Dura",
        wards: {
          "dura-central": {
            name: "Dura Central",
            pollingUnits: [
              "PU 153 - Dura Central Market",
              "PU 154 - Dura Central Primary School",
              "PU 155 - Dura Central Community Hall",
              "PU 156 - Dura Central Health Center",
              "PU 157 - Dura Central Mosque",
              "PU 158 - Dura Central Post Office",
              "PU 159 - Dura Central Police Station",
              "PU 160 - Dura Central Fire Station"
            ]
          }
        }
      },
      "ingawa": {
        name: "Ingawa",
        wards: {
          "ingawa-central": {
            name: "Ingawa Central",
            pollingUnits: [
              "PU 161 - Ingawa Central Market",
              "PU 162 - Ingawa Central Primary School",
              "PU 163 - Ingawa Central Community Hall",
              "PU 164 - Ingawa Central Health Center",
              "PU 165 - Ingawa Central Mosque",
              "PU 166 - Ingawa Central Post Office",
              "PU 167 - Ingawa Central Police Station",
              "PU 168 - Ingawa Central Fire Station"
            ]
          }
        }
      },
      "kankia": {
        name: "Kankia",
        wards: {
          "kankia-central": {
            name: "Kankia Central",
            pollingUnits: [
              "PU 169 - Kankia Central Market",
              "PU 170 - Kankia Central Primary School",
              "PU 171 - Kankia Central Community Hall",
              "PU 172 - Kankia Central Health Center",
              "PU 173 - Kankia Central Mosque",
              "PU 174 - Kankia Central Post Office",
              "PU 175 - Kankia Central Police Station",
              "PU 176 - Kankia Central Fire Station"
            ]
          }
        }
      },
      "kudan": {
        name: "Kudan",
        wards: {
          "kudan-central": {
            name: "Kudan Central",
            pollingUnits: [
              "PU 177 - Kudan Central Market",
              "PU 178 - Kudan Central Primary School",
              "PU 179 - Kudan Central Community Hall",
              "PU 180 - Kudan Central Health Center",
              "PU 181 - Kudan Central Mosque",
              "PU 182 - Kudan Central Post Office",
              "PU 183 - Kudan Central Police Station",
              "PU 184 - Kudan Central Fire Station"
            ]
          }
        }
      },
      "zango": {
        name: "Zango",
        wards: {
          "zango-central": {
            name: "Zango Central",
            pollingUnits: [
              "PU 185 - Zango Central Market",
              "PU 186 - Zango Central Primary School",
              "PU 187 - Zango Central Community Hall",
              "PU 188 - Zango Central Health Center",
              "PU 189 - Zango Central Mosque",
              "PU 190 - Zango Central Post Office",
              "PU 191 - Zango Central Police Station",
              "PU 192 - Zango Central Fire Station"
            ]
          }
        }
      },
      "sandamu": {
        name: "Sandamu",
        wards: {
          "sandamu-central": {
            name: "Sandamu Central",
            pollingUnits: [
              "PU 193 - Sandamu Central Market",
              "PU 194 - Sandamu Central Primary School",
              "PU 195 - Sandamu Central Community Hall",
              "PU 196 - Sandamu Central Health Center",
              "PU 197 - Sandamu Central Mosque",
              "PU 198 - Sandamu Central Post Office",
              "PU 199 - Sandamu Central Police Station",
              "PU 200 - Sandamu Central Fire Station"
            ]
          }
        }
      },
      "mani": {
        name: "Mani",
        wards: {
          "mani-central": {
            name: "Mani Central",
            pollingUnits: [
              "PU 201 - Mani Central Market",
              "PU 202 - Mani Central Primary School",
              "PU 203 - Mani Central Community Hall",
              "PU 204 - Mani Central Health Center",
              "PU 205 - Mani Central Mosque",
              "PU 206 - Mani Central Post Office",
              "PU 207 - Mani Central Police Station",
              "PU 208 - Mani Central Fire Station"
            ]
          }
        }
      },
      "mashi": {
        name: "Mashi",
        wards: {
          "mashi-central": {
            name: "Mashi Central",
            pollingUnits: [
              "PU 209 - Mashi Central Market",
              "PU 210 - Mashi Central Primary School",
              "PU 211 - Mashi Central Community Hall",
              "PU 212 - Mashi Central Health Center",
              "PU 213 - Mashi Central Mosque",
              "PU 214 - Mashi Central Post Office",
              "PU 215 - Mashi Central Police Station",
              "PU 216 - Mashi Central Fire Station"
            ]
          }
        }
      },
      "dutsi": {
        name: "Dutsi",
        wards: {
          "dutsi-central": {
            name: "Dutsi Central",
            pollingUnits: [
              "PU 217 - Dutsi Central Market",
              "PU 218 - Dutsi Central Primary School",
              "PU 219 - Dutsi Central Community Hall",
              "PU 220 - Dutsi Central Health Center",
              "PU 221 - Dutsi Central Mosque",
              "PU 222 - Dutsi Central Post Office",
              "PU 223 - Dutsi Central Police Station",
              "PU 224 - Dutsi Central Fire Station"
            ]
          }
        }
      },
      "baure": {
        name: "Baure",
        wards: {
          "baure-central": {
            name: "Baure Central",
            pollingUnits: [
              "PU 225 - Baure Central Market",
              "PU 226 - Baure Central Primary School",
              "PU 227 - Baure Central Community Hall",
              "PU 228 - Baure Central Health Center",
              "PU 229 - Baure Central Mosque",
              "PU 230 - Baure Central Post Office",
              "PU 231 - Baure Central Police Station",
              "PU 232 - Baure Central Fire Station"
            ]
          }
        }
      },
      "bindawa": {
        name: "Bindawa",
        wards: {
          "bindawa-central": {
            name: "Bindawa Central",
            pollingUnits: [
              "PU 233 - Bindawa Central Market",
              "PU 234 - Bindawa Central Primary School",
              "PU 235 - Bindawa Central Community Hall",
              "PU 236 - Bindawa Central Health Center",
              "PU 237 - Bindawa Central Mosque",
              "PU 238 - Bindawa Central Post Office",
              "PU 239 - Bindawa Central Police Station",
              "PU 240 - Bindawa Central Fire Station"
            ]
          }
        }
      },

    }
  },
  kebbi: {
    name: "Kebbi",
    lgas: {
      "birnin-kebbi": {
        name: "Birnin Kebbi",
        wards: {
          "birnin-kebbi-central": {
            name: "Birnin Kebbi Central",
            pollingUnits: [
              "PU 001 - Birnin Kebbi Central Market",
              "PU 002 - Birnin Kebbi Central Primary School",
              "PU 003 - Birnin Kebbi Central Community Hall",
              "PU 004 - Birnin Kebbi Central Health Center",
              "PU 005 - Birnin Kebbi Central Mosque",
              "PU 006 - Birnin Kebbi Central Post Office",
              "PU 007 - Birnin Kebbi Central Police Station",
              "PU 008 - Birnin Kebbi Central Fire Station"
            ]
          }
        }
      },
      "gwandu": {
        name: "Gwandu",
        wards: {
          "gwandu-central": {
            name: "Gwandu Central",
            pollingUnits: [
              "PU 009 - Gwandu Central Market",
              "PU 010 - Gwandu Central Primary School",
              "PU 011 - Gwandu Central Community Hall",
              "PU 012 - Gwandu Central Health Center",
              "PU 013 - Gwandu Central Mosque",
              "PU 014 - Gwandu Central Post Office",
              "PU 015 - Gwandu Central Police Station",
              "PU 016 - Gwandu Central Fire Station"
            ]
          }
        }
      },
      "argungu": {
        name: "Argungu",
        wards: {
          "argungu-central": {
            name: "Argungu Central",
            pollingUnits: [
              "PU 017 - Argungu Central Market",
              "PU 018 - Argungu Central Primary School",
              "PU 019 - Argungu Central Community Hall",
              "PU 020 - Argungu Central Health Center",
              "PU 021 - Argungu Central Mosque",
              "PU 022 - Argungu Central Post Office",
              "PU 023 - Argungu Central Police Station",
              "PU 024 - Argungu Central Fire Station"
            ]
          }
        }
      },
      "yauri": {
        name: "Yauri",
        wards: {
          "yauri-central": {
            name: "Yauri Central",
            pollingUnits: [
              "PU 025 - Yauri Central Market",
              "PU 026 - Yauri Central Primary School",
              "PU 027 - Yauri Central Community Hall",
              "PU 028 - Yauri Central Health Center",
              "PU 029 - Yauri Central Mosque",
              "PU 030 - Yauri Central Post Office",
              "PU 031 - Yauri Central Police Station",
              "PU 032 - Yauri Central Fire Station"
            ]
          }
        }
      },
      "ngaski": {
        name: "Ngaski",
        wards: {
          "ngaski-central": {
            name: "Ngaski Central",
            pollingUnits: [
              "PU 033 - Ngaski Central Market",
              "PU 034 - Ngaski Central Primary School",
              "PU 035 - Ngaski Central Community Hall",
              "PU 036 - Ngaski Central Health Center",
              "PU 037 - Ngaski Central Mosque",
              "PU 038 - Ngaski Central Post Office",
              "PU 039 - Ngaski Central Police Station",
              "PU 040 - Ngaski Central Fire Station"
            ]
          }
        }
      },
      "shanga": {
        name: "Shanga",
        wards: {
          "shanga-central": {
            name: "Shanga Central",
            pollingUnits: [
              "PU 041 - Shanga Central Market",
              "PU 042 - Shanga Central Primary School",
              "PU 043 - Shanga Central Community Hall",
              "PU 044 - Shanga Central Health Center",
              "PU 045 - Shanga Central Mosque",
              "PU 046 - Shanga Central Post Office",
              "PU 047 - Shanga Central Police Station",
              "PU 048 - Shanga Central Fire Station"
            ]
          }
        }
      },
      "dandi": {
        name: "Dandi",
        wards: {
          "dandi-central": {
            name: "Dandi Central",
            pollingUnits: [
              "PU 049 - Dandi Central Market",
              "PU 050 - Dandi Central Primary School",
              "PU 051 - Dandi Central Community Hall",
              "PU 052 - Dandi Central Health Center",
              "PU 053 - Dandi Central Mosque",
              "PU 054 - Dandi Central Post Office",
              "PU 055 - Dandi Central Police Station",
              "PU 056 - Dandi Central Fire Station"
            ]
          }
        }
      },
      "aleiro": {
        name: "Aleiro",
        wards: {
          "aleiro-central": {
            name: "Aleiro Central",
            pollingUnits: [
              "PU 057 - Aleiro Central Market",
              "PU 058 - Aleiro Central Primary School",
              "PU 059 - Aleiro Central Community Hall",
              "PU 060 - Aleiro Central Health Center",
              "PU 061 - Aleiro Central Mosque",
              "PU 062 - Aleiro Central Post Office",
              "PU 063 - Aleiro Central Police Station",
              "PU 064 - Aleiro Central Fire Station"
            ]
          }
        }
      },
      "bunza": {
        name: "Bunza",
        wards: {
          "bunza-central": {
            name: "Bunza Central",
            pollingUnits: [
              "PU 065 - Bunza Central Market",
              "PU 066 - Bunza Central Primary School",
              "PU 067 - Bunza Central Community Hall",
              "PU 068 - Bunza Central Health Center",
              "PU 069 - Bunza Central Mosque",
              "PU 070 - Bunza Central Post Office",
              "PU 071 - Bunza Central Police Station",
              "PU 072 - Bunza Central Fire Station"
            ]
          }
        }
      },
      "kalgo": {
        name: "Kalgo",
        wards: {
          "kalgo-central": {
            name: "Kalgo Central",
            pollingUnits: [
              "PU 073 - Kalgo Central Market",
              "PU 074 - Kalgo Central Primary School",
              "PU 075 - Kalgo Central Community Hall",
              "PU 076 - Kalgo Central Health Center",
              "PU 077 - Kalgo Central Mosque",
              "PU 078 - Kalgo Central Post Office",
              "PU 079 - Kalgo Central Police Station",
              "PU 080 - Kalgo Central Fire Station"
            ]
          }
        }
      },
      "maiyama": {
        name: "Maiyama",
        wards: {
          "maiyama-central": {
            name: "Maiyama Central",
            pollingUnits: [
              "PU 081 - Maiyama Central Market",
              "PU 082 - Maiyama Central Primary School",
              "PU 083 - Maiyama Central Community Hall",
              "PU 084 - Maiyama Central Health Center",
              "PU 085 - Maiyama Central Mosque",
              "PU 086 - Maiyama Central Post Office",
              "PU 087 - Maiyama Central Police Station",
              "PU 088 - Maiyama Central Fire Station"
            ]
          }
        }
      },
      "suru": {
        name: "Suru",
        wards: {
          "suru-central": {
            name: "Suru Central",
            pollingUnits: [
              "PU 089 - Suru Central Market",
              "PU 090 - Suru Central Primary School",
              "PU 091 - Suru Central Community Hall",
              "PU 092 - Suru Central Health Center",
              "PU 093 - Suru Central Mosque",
              "PU 094 - Suru Central Post Office",
              "PU 095 - Suru Central Police Station",
              "PU 096 - Suru Central Fire Station"
            ]
          }
        }
      },
      "jega": {
        name: "Jega",
        wards: {
          "jega-central": {
            name: "Jega Central",
            pollingUnits: [
              "PU 097 - Jega Central Market",
              "PU 098 - Jega Central Primary School",
              "PU 099 - Jega Central Community Hall",
              "PU 100 - Jega Central Health Center",
              "PU 101 - Jega Central Mosque",
              "PU 102 - Jega Central Post Office",
              "PU 103 - Jega Central Police Station",
              "PU 104 - Jega Central Fire Station"
            ]
          }
        }
      },
      "koko-besse": {
        name: "Koko Besse",
        wards: {
          "koko-besse-central": {
            name: "Koko Besse Central",
            pollingUnits: [
              "PU 105 - Koko Besse Central Market",
              "PU 106 - Koko Besse Central Primary School",
              "PU 107 - Koko Besse Central Community Hall",
              "PU 108 - Koko Besse Central Health Center",
              "PU 109 - Koko Besse Central Mosque",
              "PU 110 - Koko Besse Central Post Office",
              "PU 111 - Koko Besse Central Police Station",
              "PU 112 - Koko Besse Central Fire Station"
            ]
          }
        }
      },
      "bagudo": {
        name: "Bagudo",
        wards: {
          "bagudo-central": {
            name: "Bagudo Central",
            pollingUnits: [
              "PU 113 - Bagudo Central Market",
              "PU 114 - Bagudo Central Primary School",
              "PU 115 - Bagudo Central Community Hall",
              "PU 116 - Bagudo Central Health Center",
              "PU 117 - Bagudo Central Mosque",
              "PU 118 - Bagudo Central Post Office",
              "PU 119 - Bagudo Central Police Station",
              "PU 120 - Bagudo Central Fire Station"
            ]
          }
        }
      },
      "fakai": {
        name: "Fakai",
        wards: {
          "fakai-central": {
            name: "Fakai Central",
            pollingUnits: [
              "PU 121 - Fakai Central Market",
              "PU 122 - Fakai Central Primary School",
              "PU 123 - Fakai Central Community Hall",
              "PU 124 - Fakai Central Health Center",
              "PU 125 - Fakai Central Mosque",
              "PU 126 - Fakai Central Post Office",
              "PU 127 - Fakai Central Police Station",
              "PU 128 - Fakai Central Fire Station"
            ]
          }
        }
      },
      "wasagu-danko": {
        name: "Wasagu Danko",
        wards: {
          "wasagu-danko-central": {
            name: "Wasagu Danko Central",
            pollingUnits: [
              "PU 129 - Wasagu Danko Central Market",
              "PU 130 - Wasagu Danko Central Primary School",
              "PU 131 - Wasagu Danko Central Community Hall",
              "PU 132 - Wasagu Danko Central Health Center",
              "PU 133 - Wasagu Danko Central Mosque",
              "PU 134 - Wasagu Danko Central Post Office",
              "PU 135 - Wasagu Danko Central Police Station",
              "PU 136 - Wasagu Danko Central Fire Station"
            ]
          }
        }
      },
      "zuru": {
        name: "Zuru",
        wards: {
          "zuru-central": {
            name: "Zuru Central",
            pollingUnits: [
              "PU 137 - Zuru Central Market",
              "PU 138 - Zuru Central Primary School",
              "PU 139 - Zuru Central Community Hall",
              "PU 140 - Zuru Central Health Center",
              "PU 141 - Zuru Central Mosque",
              "PU 142 - Zuru Central Post Office",
              "PU 143 - Zuru Central Police Station",
              "PU 144 - Zuru Central Fire Station"
            ]
          }
        }
      },
      "sakaba": {
        name: "Sakaba",
        wards: {
          "sakaba-central": {
            name: "Sakaba Central",
            pollingUnits: [
              "PU 145 - Sakaba Central Market",
              "PU 146 - Sakaba Central Primary School",
              "PU 147 - Sakaba Central Community Hall",
              "PU 148 - Sakaba Central Health Center",
              "PU 149 - Sakaba Central Mosque",
              "PU 150 - Sakaba Central Post Office",
              "PU 151 - Sakaba Central Police Station",
              "PU 152 - Sakaba Central Fire Station"
            ]
          }
        }
      },
      "danko": {
        name: "Danko",
        wards: {
          "danko-central": {
            name: "Danko Central",
            pollingUnits: [
              "PU 153 - Danko Central Market",
              "PU 154 - Danko Central Primary School",
              "PU 155 - Danko Central Community Hall",
              "PU 156 - Danko Central Health Center",
              "PU 157 - Danko Central Mosque",
              "PU 158 - Danko Central Post Office",
              "PU 159 - Danko Central Police Station",
              "PU 160 - Danko Central Fire Station"
            ]
          }
        }
      },
      "augie": {
        name: "Augie",
        wards: {
          "augie-central": {
            name: "Augie Central",
            pollingUnits: [
              "PU 161 - Augie Central Market",
              "PU 162 - Augie Central Primary School",
              "PU 163 - Augie Central Community Hall",
              "PU 164 - Augie Central Health Center",
              "PU 165 - Augie Central Mosque",
              "PU 166 - Augie Central Post Office",
              "PU 167 - Augie Central Police Station",
              "PU 168 - Augie Central Fire Station"
            ]
          }
        }
      },
      "arewa-dandi": {
        name: "Arewa Dandi",
        wards: {
          "arewa-dandi-central": {
            name: "Arewa Dandi Central",
            pollingUnits: [
              "PU 169 - Arewa Dandi Central Market",
              "PU 170 - Arewa Dandi Central Primary School",
              "PU 171 - Arewa Dandi Central Community Hall",
              "PU 172 - Arewa Dandi Central Health Center",
              "PU 173 - Arewa Dandi Central Mosque",
              "PU 174 - Arewa Dandi Central Post Office",
              "PU 175 - Arewa Dandi Central Police Station",
              "PU 176 - Arewa Dandi Central Fire Station"
            ]
          }
        }
      }
    }
  },
  kogi: {
    name: "Kogi",
    lgas: {
      "lokoja": {
        name: "Lokoja",
        wards: {
          "lokoja-central": {
            name: "Lokoja Central",
            pollingUnits: [
              "PU 001 - Lokoja Central Market",
              "PU 002 - Lokoja Central Primary School",
              "PU 003 - Lokoja Central Community Hall",
              "PU 004 - Lokoja Central Health Center",
              "PU 005 - Lokoja Central Mosque",
              "PU 006 - Lokoja Central Post Office",
              "PU 007 - Lokoja Central Police Station",
              "PU 008 - Lokoja Central Fire Station"
            ]
          },
          "lokoja-north": {
            name: "Lokoja North",
            pollingUnits: [
              "PU 009 - Lokoja North Market",
              "PU 010 - Lokoja North Primary School",
              "PU 011 - Lokoja North Community Hall",
              "PU 012 - Lokoja North Health Center",
              "PU 013 - Lokoja North Mosque",
              "PU 014 - Lokoja North Post Office",
              "PU 015 - Lokoja North Police Station",
              "PU 016 - Lokoja North Fire Station"
            ]
          },
          "lokoja-south": {
            name: "Lokoja South",
            pollingUnits: [
              "PU 017 - Lokoja South Market",
              "PU 018 - Lokoja South Primary School",
              "PU 019 - Lokoja South Community Hall",
              "PU 020 - Lokoja South Health Center",
              "PU 021 - Lokoja South Mosque",
              "PU 022 - Lokoja South Post Office",
              "PU 023 - Lokoja South Police Station",
              "PU 024 - Lokoja South Fire Station"
            ]
          }
        }
      },
      "okene": {
        name: "Okene",
        wards: {
          "okene-central": {
            name: "Okene Central",
            pollingUnits: [
              "PU 025 - Okene Central Market",
              "PU 026 - Okene Central Primary School",
              "PU 027 - Okene Central Community Hall",
              "PU 028 - Okene Central Health Center",
              "PU 029 - Okene Central Mosque",
              "PU 030 - Okene Central Post Office",
              "PU 031 - Okene Central Police Station",
              "PU 032 - Okene Central Fire Station"
            ]
          },
          "okene-north": {
            name: "Okene North",
            pollingUnits: [
              "PU 033 - Okene North Market",
              "PU 034 - Okene North Primary School",
              "PU 035 - Okene North Community Hall",
              "PU 036 - Okene North Health Center",
              "PU 037 - Okene North Mosque",
              "PU 038 - Okene North Post Office",
              "PU 039 - Okene North Police Station",
              "PU 040 - Okene North Fire Station"
            ]
          },
          "okene-south": {
            name: "Okene South",
            pollingUnits: [
              "PU 041 - Okene South Market",
              "PU 042 - Okene South Primary School",
              "PU 043 - Okene South Community Hall",
              "PU 044 - Okene South Health Center",
              "PU 045 - Okene South Mosque",
              "PU 046 - Okene South Post Office",
              "PU 047 - Okene South Police Station",
              "PU 048 - Okene South Fire Station"
            ]
          }
        }
      },
      "kabba-bunu": {
        name: "Kabba Bunu",
        wards: {
          "kabba-bunu-central": {
            name: "Kabba Bunu Central",
            pollingUnits: [
              "PU 049 - Kabba Bunu Central Market",
              "PU 050 - Kabba Bunu Central Primary School",
              "PU 051 - Kabba Bunu Central Community Hall",
              "PU 052 - Kabba Bunu Central Health Center",
              "PU 053 - Kabba Bunu Central Mosque",
              "PU 054 - Kabba Bunu Central Post Office",
              "PU 055 - Kabba Bunu Central Police Station",
              "PU 056 - Kabba Bunu Central Fire Station"
            ]
          },
          "kabba-bunu-north": {
            name: "Kabba Bunu North",
            pollingUnits: [
              "PU 057 - Kabba Bunu North Market",
              "PU 058 - Kabba Bunu North Primary School",
              "PU 059 - Kabba Bunu North Community Hall",
              "PU 060 - Kabba Bunu North Health Center",
              "PU 061 - Kabba Bunu North Mosque",
              "PU 062 - Kabba Bunu North Post Office",
              "PU 063 - Kabba Bunu North Police Station",
              "PU 064 - Kabba Bunu North Fire Station"
            ]
          },
          "kabba-bunu-south": {
            name: "Kabba Bunu South",
            pollingUnits: [
              "PU 065 - Kabba Bunu South Market",
              "PU 066 - Kabba Bunu South Primary School",
              "PU 067 - Kabba Bunu South Community Hall",
              "PU 068 - Kabba Bunu South Health Center",
              "PU 069 - Kabba Bunu South Mosque",
              "PU 070 - Kabba Bunu South Post Office",
              "PU 071 - Kabba Bunu South Police Station",
              "PU 072 - Kabba Bunu South Fire Station"
            ]
          }
        }
      },
      "ijumu": {
        name: "Ijumu",
        wards: {
          "ijumu-central": {
            name: "Ijumu Central",
            pollingUnits: [
              "PU 073 - Ijumu Central Market",
              "PU 074 - Ijumu Central Primary School",
              "PU 075 - Ijumu Central Community Hall",
              "PU 076 - Ijumu Central Health Center",
              "PU 077 - Ijumu Central Mosque",
              "PU 078 - Ijumu Central Post Office",
              "PU 079 - Ijumu Central Police Station",
              "PU 080 - Ijumu Central Fire Station"
            ]
          },
          "ijumu-north": {
            name: "Ijumu North",
            pollingUnits: [
              "PU 081 - Ijumu North Market",
              "PU 082 - Ijumu North Primary School",
              "PU 083 - Ijumu North Community Hall",
              "PU 084 - Ijumu North Health Center",
              "PU 085 - Ijumu North Mosque",
              "PU 086 - Ijumu North Post Office",
              "PU 087 - Ijumu North Police Station",
              "PU 088 - Ijumu North Fire Station"
            ]
          },
          "ijumu-south": {
            name: "Ijumu South",
            pollingUnits: [
              "PU 089 - Ijumu South Market",
              "PU 090 - Ijumu South Primary School",
              "PU 091 - Ijumu South Community Hall",
              "PU 092 - Ijumu South Health Center",
              "PU 093 - Ijumu South Mosque",
              "PU 094 - Ijumu South Post Office",
              "PU 095 - Ijumu South Police Station",
              "PU 096 - Ijumu South Fire Station"
            ]
          }
        }
      },
      "yagba-east": {
        name: "Yagba East",
        wards: {
          "yagba-east-central": {
            name: "Yagba East Central",
            pollingUnits: [
              "PU 097 - Yagba East Central Market",
              "PU 098 - Yagba East Central Primary School",
              "PU 099 - Yagba East Central Community Hall",
              "PU 100 - Yagba East Central Health Center",
              "PU 101 - Yagba East Central Mosque",
              "PU 102 - Yagba East Central Post Office",
              "PU 103 - Yagba East Central Police Station",
              "PU 104 - Yagba East Central Fire Station"
            ]
          },
          "yagba-east-north": {
            name: "Yagba East North",
            pollingUnits: [
              "PU 105 - Yagba East North Market",
              "PU 106 - Yagba East North Primary School",
              "PU 107 - Yagba East North Community Hall",
              "PU 108 - Yagba East North Health Center",
              "PU 109 - Yagba East North Mosque",
              "PU 110 - Yagba East North Post Office",
              "PU 111 - Yagba East North Police Station",
              "PU 112 - Yagba East North Fire Station"
            ]
          },
          "yagba-east-south": {
            name: "Yagba East South",
            pollingUnits: [
              "PU 113 - Yagba East South Market",
              "PU 114 - Yagba East South Primary School",
              "PU 115 - Yagba East South Community Hall",
              "PU 116 - Yagba East South Health Center",
              "PU 117 - Yagba East South Mosque",
              "PU 118 - Yagba East South Post Office",
              "PU 119 - Yagba East South Police Station",
              "PU 120 - Yagba East South Fire Station"
            ]
          }
        }
      },
      "yagba-west": {
        name: "Yagba West",
        wards: {
          "yagba-west-central": {
            name: "Yagba West Central",
            pollingUnits: [
              "PU 121 - Yagba West Central Market",
              "PU 122 - Yagba West Central Primary School",
              "PU 123 - Yagba West Central Community Hall",
              "PU 124 - Yagba West Central Health Center",
              "PU 125 - Yagba West Central Mosque",
              "PU 126 - Yagba West Central Post Office",
              "PU 127 - Yagba West Central Police Station",
              "PU 128 - Yagba West Central Fire Station"
            ]
          },
          "yagba-west-north": {
            name: "Yagba West North",
            pollingUnits: [
              "PU 129 - Yagba West North Market",
              "PU 130 - Yagba West North Primary School",
              "PU 131 - Yagba West North Community Hall",
              "PU 132 - Yagba West North Health Center",
              "PU 133 - Yagba West North Mosque",
              "PU 134 - Yagba West North Post Office",
              "PU 135 - Yagba West North Police Station",
              "PU 136 - Yagba West North Fire Station"
            ]
          },
          "yagba-west-south": {
            name: "Yagba West South",
            pollingUnits: [
              "PU 137 - Yagba West South Market",
              "PU 138 - Yagba West South Primary School",
              "PU 139 - Yagba West South Community Hall",
              "PU 140 - Yagba West South Health Center",
              "PU 141 - Yagba West South Mosque",
              "PU 142 - Yagba West South Post Office",
              "PU 143 - Yagba West South Police Station",
              "PU 144 - Yagba West South Fire Station"
            ]
          }
        }
      },
      "mopa-muro": {
        name: "Mopa Muro",
        wards: {
          "mopa-muro-central": {
            name: "Mopa Muro Central",
            pollingUnits: [
              "PU 145 - Mopa Muro Central Market",
              "PU 146 - Mopa Muro Central Primary School",
              "PU 147 - Mopa Muro Central Community Hall",
              "PU 148 - Mopa Muro Central Health Center",
              "PU 149 - Mopa Muro Central Mosque",
              "PU 150 - Mopa Muro Central Post Office",
              "PU 151 - Mopa Muro Central Police Station",
              "PU 152 - Mopa Muro Central Fire Station"
            ]
          },
          "mopa-muro-north": {
            name: "Mopa Muro North",
            pollingUnits: [
              "PU 153 - Mopa Muro North Market",
              "PU 154 - Mopa Muro North Primary School",
              "PU 155 - Mopa Muro North Community Hall",
              "PU 156 - Mopa Muro North Health Center",
              "PU 157 - Mopa Muro North Mosque",
              "PU 158 - Mopa Muro North Post Office",
              "PU 159 - Mopa Muro North Police Station",
              "PU 160 - Mopa Muro North Fire Station"
            ]
          },
          "mopa-muro-south": {
            name: "Mopa Muro South",
            pollingUnits: [
              "PU 161 - Mopa Muro South Market",
              "PU 162 - Mopa Muro South Primary School",
              "PU 163 - Mopa Muro South Community Hall",
              "PU 164 - Mopa Muro South Health Center",
              "PU 165 - Mopa Muro South Mosque",
              "PU 166 - Mopa Muro South Post Office",
              "PU 167 - Mopa Muro South Police Station",
              "PU 168 - Mopa Muro South Fire Station"
            ]
          }
        }
      },
      "deki": {
        name: "Deki",
        wards: {
          "deki-central": {
            name: "Deki Central",
            pollingUnits: [
              "PU 169 - Deki Central Market",
              "PU 170 - Deki Central Primary School",
              "PU 171 - Deki Central Community Hall",
              "PU 172 - Deki Central Health Center",
              "PU 173 - Deki Central Mosque",
              "PU 174 - Deki Central Post Office",
              "PU 175 - Deki Central Police Station",
              "PU 176 - Deki Central Fire Station"
            ]
          },
          "deki-north": {
            name: "Deki North",
            pollingUnits: [
              "PU 177 - Deki North Market",
              "PU 178 - Deki North Primary School",
              "PU 179 - Deki North Community Hall",
              "PU 180 - Deki North Health Center",
              "PU 181 - Deki North Mosque",
              "PU 182 - Deki North Post Office",
              "PU 183 - Deki North Police Station",
              "PU 184 - Deki North Fire Station"
            ]
          },
          "deki-south": {
            name: "Deki South",
            pollingUnits: [
              "PU 185 - Deki South Market",
              "PU 186 - Deki South Primary School",
              "PU 187 - Deki South Community Hall",
              "PU 188 - Deki South Health Center",
              "PU 189 - Deki South Mosque",
              "PU 190 - Deki South Post Office",
              "PU 191 - Deki South Police Station",
              "PU 192 - Deki South Fire Station"
            ]
          }
        }
      },
      "adavi": {
        name: "Adavi",
        wards: {
          "adavi-central": {
            name: "Adavi Central",
            pollingUnits: [
              "PU 193 - Adavi Central Market",
              "PU 194 - Adavi Central Primary School",
              "PU 195 - Adavi Central Community Hall",
              "PU 196 - Adavi Central Health Center",
              "PU 197 - Adavi Central Mosque",
              "PU 198 - Adavi Central Post Office",
              "PU 199 - Adavi Central Police Station",
              "PU 200 - Adavi Central Fire Station"
            ]
          },
          "adavi-north": {
            name: "Adavi North",
            pollingUnits: [
              "PU 201 - Adavi North Market",
              "PU 202 - Adavi North Primary School",
              "PU 203 - Adavi North Community Hall",
              "PU 204 - Adavi North Health Center",
              "PU 205 - Adavi North Mosque",
              "PU 206 - Adavi North Post Office",
              "PU 207 - Adavi North Police Station",
              "PU 208 - Adavi North Fire Station"
            ]
          },
          "adavi-south": {
            name: "Adavi South",
            pollingUnits: [
              "PU 209 - Adavi South Market",
              "PU 210 - Adavi South Primary School",
              "PU 211 - Adavi South Community Hall",
              "PU 212 - Adavi South Health Center",
              "PU 213 - Adavi South Mosque",
              "PU 214 - Adavi South Post Office",
              "PU 215 - Adavi South Police Station",
              "PU 216 - Adavi South Fire Station"
            ]
          }
        }
      },
      "ogorimagongo": {
        name: "Ogori Magongo",
        wards: {
          "ogori-magongo-central": {
            name: "Ogori Magongo Central",
            pollingUnits: [
              "PU 217 - Ogori Magongo Central Market",
              "PU 218 - Ogori Magongo Central Primary School",
              "PU 219 - Ogori Magongo Central Community Hall",
              "PU 220 - Ogori Magongo Central Health Center",
              "PU 221 - Ogori Magongo Central Mosque",
              "PU 222 - Ogori Magongo Central Post Office",
              "PU 223 - Ogori Magongo Central Police Station",
              "PU 224 - Ogori Magongo Central Fire Station"
            ]
          },
          "ogori-magongo-north": {
            name: "Ogori Magongo North",
            pollingUnits: [
              "PU 225 - Ogori Magongo North Market",
              "PU 226 - Ogori Magongo North Primary School",
              "PU 227 - Ogori Magongo North Community Hall",
              "PU 228 - Ogori Magongo North Health Center",
              "PU 229 - Ogori Magongo North Mosque",
              "PU 230 - Ogori Magongo North Post Office",
              "PU 231 - Ogori Magongo North Police Station",
              "PU 232 - Ogori Magongo North Fire Station"
            ]
          },
          "ogori-magongo-south": {
            name: "Ogori Magongo South",
            pollingUnits: [
              "PU 233 - Ogori Magongo South Market",
              "PU 234 - Ogori Magongo South Primary School",
              "PU 235 - Ogori Magongo South Community Hall",
              "PU 236 - Ogori Magongo South Health Center",
              "PU 237 - Ogori Magongo South Mosque",
              "PU 238 - Ogori Magongo South Post Office",
              "PU 239 - Ogori Magongo South Police Station",
              "PU 240 - Ogori Magongo South Fire Station"
            ]
          }
        }
      },

      "auchi": {
        name: "Auchi",
        wards: {
          "auchi-central": {
            name: "Auchi Central",
            pollingUnits: [
              "PU 089 - Auchi Central Market",
              "PU 090 - Auchi Central Primary School",
              "PU 091 - Auchi Central Community Hall",
              "PU 092 - Auchi Central Health Center",
              "PU 093 - Auchi Central Mosque",
              "PU 094 - Auchi Central Post Office",
              "PU 095 - Auchi Central Police Station",
              "PU 096 - Auchi Central Fire Station"
            ]
          }
        }
      },
      "esan-west": {
        name: "Esan West",
        wards: {
          "esan-west-central": {
            name: "Esan West Central",
            pollingUnits: [
              "PU 097 - Esan West Central Market",
              "PU 098 - Esan West Central Primary School",
              "PU 099 - Esan West Central Community Hall",
              "PU 100 - Esan West Central Health Center",
              "PU 101 - Esan West Central Mosque",
              "PU 102 - Esan West Central Post Office",
              "PU 103 - Esan West Central Police Station",
              "PU 104 - Esan West Central Fire Station"
            ]
          }
        }
      },
      "esan-central": {
        name: "Esan Central",
        wards: {
          "esan-central-central": {
            name: "Esan Central Central",
            pollingUnits: [
              "PU 105 - Esan Central Central Market",
              "PU 106 - Esan Central Central Primary School",
              "PU 107 - Esan Central Central Community Hall",
              "PU 108 - Esan Central Central Health Center",
              "PU 109 - Esan Central Central Mosque",
              "PU 110 - Esan Central Central Post Office",
              "PU 111 - Esan Central Central Police Station",
              "PU 112 - Esan Central Central Fire Station"
            ]
          }
        }
      },
      "esan-north-east": {
        name: "Esan North East",
        wards: {
          "esan-north-east-central": {
            name: "Esan North East Central",
            pollingUnits: [
              "PU 113 - Esan North East Central Market",
              "PU 114 - Esan North East Central Primary School",
              "PU 115 - Esan North East Central Community Hall",
              "PU 116 - Esan North East Central Health Center",
              "PU 117 - Esan North East Central Mosque",
              "PU 118 - Esan North East Central Post Office",
              "PU 119 - Esan North East Central Police Station",
              "PU 120 - Esan North East Central Fire Station"
            ]
          }
        }
      },
      "igbede": {
        name: "Igbede",
        wards: {
          "igbede-central": {
            name: "Igbede Central",
            pollingUnits: [
              "PU 121 - Igbede Central Market",
              "PU 122 - Igbede Central Primary School",
              "PU 123 - Igbede Central Community Hall",
              "PU 124 - Igbede Central Health Center",
              "PU 125 - Igbede Central Mosque",
              "PU 126 - Igbede Central Post Office",
              "PU 127 - Igbede Central Police Station",
              "PU 128 - Igbede Central Fire Station"
            ]
          }
        }
      },
      "etekpe": {
        name: "Etekpe",
        wards: {
          "etekpe-central": {
            name: "Etekpe Central",
            pollingUnits: [
              "PU 129 - Etekpe Central Market",
              "PU 130 - Etekpe Central Primary School",
              "PU 131 - Etekpe Central Community Hall",
              "PU 132 - Etekpe Central Health Center",
              "PU 133 - Etekpe Central Mosque",
              "PU 134 - Etekpe Central Post Office",
              "PU 135 - Etekpe Central Police Station",
              "PU 136 - Etekpe Central Fire Station"
            ]
          }
        }
      },
      "ohaukwu": {
        name: "Ohaukwu",
        wards: {
          "ohaukwu-central": {
            name: "Ohaukwu Central",
            pollingUnits: [
              "PU 137 - Ohaukwu Central Market",
              "PU 138 - Ohaukwu Central Primary School",
              "PU 139 - Ohaukwu Central Community Hall",
              "PU 140 - Ohaukwu Central Health Center",
              "PU 141 - Ohaukwu Central Mosque",
              "PU 142 - Ohaukwu Central Post Office",
              "PU 143 - Ohaukwu Central Police Station",
              "PU 144 - Ohaukwu Central Fire Station"
            ]
          }
        }
      },
      "abakaliki-north": {
        name: "Abakaliki North",
        wards: {
          "abakaliki-north-central": {
            name: "Abakaliki North Central",
            pollingUnits: [
              "PU 145 - Abakaliki North Central Market",
              "PU 146 - Abakaliki North Central Primary School",
              "PU 147 - Abakaliki North Central Community Hall",
              "PU 148 - Abakaliki North Central Health Center",
              "PU 149 - Abakaliki North Central Mosque",
              "PU 150 - Abakaliki North Central Post Office",
              "PU 151 - Abakaliki North Central Police Station",
              "PU 152 - Abakaliki North Central Fire Station"
            ]
          }
        }
      },
      "abakaliki-south": {
        name: "Abakaliki South",
        wards: {
          "abakaliki-south-central": {
            name: "Abakaliki South Central",
            pollingUnits: [
              "PU 153 - Abakaliki South Central Market",
              "PU 154 - Abakaliki South Central Primary School",
              "PU 155 - Abakaliki South Central Community Hall",
              "PU 156 - Abakaliki South Central Health Center",
              "PU 157 - Abakaliki South Central Mosque",
              "PU 158 - Abakaliki South Central Post Office",
              "PU 159 - Abakaliki South Central Police Station",
              "PU 160 - Abakaliki South Central Fire Station"
            ]
          }
        }
      }
    }
  },
  kwara: {
    name: "Kwara",
    lgas: {
      "ilorin-east": {
        name: "Ilorin East",
        wards: {
          "ilorin-east-central": {
            name: "Ilorin East Central",
            pollingUnits: [
              "PU 001 - Ilorin East Central Market",
              "PU 002 - Ilorin East Central Primary School",
              "PU 003 - Ilorin East Central Community Hall",
              "PU 004 - Ilorin East Central Health Center",
              "PU 005 - Ilorin East Central Mosque",
              "PU 006 - Ilorin East Central Post Office",
              "PU 007 - Ilorin East Central Police Station",
              "PU 008 - Ilorin East Central Fire Station"
            ]
          }
        }
      },
      "ilorin-west": {
        name: "Ilorin West",
        wards: {
          "ilorin-west-central": {
            name: "Ilorin West Central",
            pollingUnits: [
              "PU 009 - Ilorin West Central Market",
              "PU 010 - Ilorin West Central Primary School",
              "PU 011 - Ilorin West Central Community Hall",
              "PU 012 - Ilorin West Central Health Center",
              "PU 013 - Ilorin West Central Mosque",
              "PU 014 - Ilorin West Central Post Office",
              "PU 015 - Ilorin West Central Police Station",
              "PU 016 - Ilorin West Central Fire Station"
            ]
          }
        }
      },
      "ilorin-south": {
        name: "Ilorin South",
        wards: {
          "ilorin-south-central": {
            name: "Ilorin South Central",
            pollingUnits: [
              "PU 017 - Ilorin South Central Market",
              "PU 018 - Ilorin South Central Primary School",
              "PU 019 - Ilorin South Central Community Hall",
              "PU 020 - Ilorin South Central Health Center",
              "PU 021 - Ilorin South Central Mosque",
              "PU 022 - Ilorin South Central Post Office",
              "PU 023 - Ilorin South Central Police Station",
              "PU 024 - Ilorin South Central Fire Station"
            ]
          }
        }
      },
      "asa": {
        name: "Asa",
        wards: {
          "asa-central": {
            name: "Asa Central",
            pollingUnits: [
              "PU 025 - Asa Central Market",
              "PU 026 - Asa Central Primary School",
              "PU 027 - Asa Central Community Hall",
              "PU 028 - Asa Central Health Center",
              "PU 029 - Asa Central Mosque",
              "PU 030 - Asa Central Post Office",
              "PU 031 - Asa Central Police Station",
              "PU 032 - Asa Central Fire Station"
            ]
          }
        }
      },
      "baruten": {
        name: "Baruten",
        wards: {
          "baruten-central": {
            name: "Baruten Central",
            pollingUnits: [
              "PU 033 - Baruten Central Market",
              "PU 034 - Baruten Central Primary School",
              "PU 035 - Baruten Central Community Hall",
              "PU 036 - Baruten Central Health Center",
              "PU 037 - Baruten Central Mosque",
              "PU 038 - Baruten Central Post Office",
              "PU 039 - Baruten Central Police Station",
              "PU 040 - Baruten Central Fire Station"
            ]
          }
        }
      },
      "ekiti": {
        name: "Ekiti",
        wards: {
          "ekiti-central": {
            name: "Ekiti Central",
            pollingUnits: [
              "PU 041 - Ekiti Central Market",
              "PU 042 - Ekiti Central Primary School",
              "PU 043 - Ekiti Central Community Hall",
              "PU 044 - Ekiti Central Health Center",
              "PU 045 - Ekiti Central Mosque",
              "PU 046 - Ekiti Central Post Office",
              "PU 047 - Ekiti Central Police Station",
              "PU 048 - Ekiti Central Fire Station"
            ]
          }
        }
      },
      "ifelodun": {
        name: "Ifelodun",
        wards: {
          "ifelodun-central": {
            name: "Ifelodun Central",
            pollingUnits: [
              "PU 049 - Ifelodun Central Market",
              "PU 050 - Ifelodun Central Primary School",
              "PU 051 - Ifelodun Central Community Hall",
              "PU 052 - Ifelodun Central Health Center",
              "PU 053 - Ifelodun Central Mosque",
              "PU 054 - Ifelodun Central Post Office",
              "PU 055 - Ifelodun Central Police Station",
              "PU 056 - Ifelodun Central Fire Station"
            ]
          }
        }
      },
      "isim": {
        name: "Isim",
        wards: {
          "isim-central": {
            name: "Isim Central",
            pollingUnits: [
              "PU 057 - Isim Central Market",
              "PU 058 - Isim Central Primary School",
              "PU 059 - Isim Central Community Hall",
              "PU 060 - Isim Central Health Center",
              "PU 061 - Isim Central Mosque",
              "PU 062 - Isim Central Post Office",
              "PU 063 - Isim Central Police Station",
              "PU 064 - Isim Central Fire Station"
            ]
          }
        }
      },
      "kaiama": {
        name: "Kaiama",
        wards: {
          "kaiama-central": {
            name: "Kaiama Central",
            pollingUnits: [
              "PU 065 - Kaiama Central Market",
              "PU 066 - Kaiama Central Primary School",
              "PU 067 - Kaiama Central Community Hall",
              "PU 068 - Kaiama Central Health Center",
              "PU 069 - Kaiama Central Mosque",
              "PU 070 - Kaiama Central Post Office",
              "PU 071 - Kaiama Central Police Station",
              "PU 072 - Kaiama Central Fire Station"
            ]
          }
        }
      },
      "moro": {
        name: "Moro",
        wards: {
          "moro-central": {
            name: "Moro Central",
            pollingUnits: [
              "PU 073 - Moro Central Market",
              "PU 074 - Moro Central Primary School",
              "PU 075 - Moro Central Community Hall",
              "PU 076 - Moro Central Health Center",
              "PU 077 - Moro Central Mosque",
              "PU 078 - Moro Central Post Office",
              "PU 079 - Moro Central Police Station",
              "PU 080 - Moro Central Fire Station"
            ]
          }
        }
      },
      "offa": {
        name: "Offa",
        wards: {
          "offa-central": {
            name: "Offa Central",
            pollingUnits: [
              "PU 081 - Offa Central Market",
              "PU 082 - Offa Central Primary School",
              "PU 083 - Offa Central Community Hall",
              "PU 084 - Offa Central Health Center",
              "PU 085 - Offa Central Mosque",
              "PU 086 - Offa Central Post Office",
              "PU 087 - Offa Central Police Station",
              "PU 088 - Offa Central Fire Station"
            ]
          }
        }
      },
      "oke-ero": {
        name: "Oke Ero",
        wards: {
          "oke-ero-central": {
            name: "Oke Ero Central",
            pollingUnits: [
              "PU 089 - Oke Ero Central Market",
              "PU 090 - Oke Ero Central Primary School",
              "PU 091 - Oke Ero Central Community Hall",
              "PU 092 - Oke Ero Central Health Center",
              "PU 093 - Oke Ero Central Mosque",
              "PU 094 - Oke Ero Central Post Office",
              "PU 095 - Oke Ero Central Police Station",
              "PU 096 - Oke Ero Central Fire Station"
            ]
          }
        }
      },
      "oyun": {
        name: "Oyun",
        wards: {
          "oyun-central": {
            name: "Oyun Central",
            pollingUnits: [
              "PU 097 - Oyun Central Market",
              "PU 098 - Oyun Central Primary School",
              "PU 099 - Oyun Central Community Hall",
              "PU 100 - Oyun Central Health Center",
              "PU 101 - Oyun Central Mosque",
              "PU 102 - Oyun Central Post Office",
              "PU 103 - Oyun Central Police Station",
              "PU 104 - Oyun Central Fire Station"
            ]
          }
        }
      },
      "pategi": {
        name: "Pategi",
        wards: {
          "pategi-central": {
            name: "Pategi Central",
            pollingUnits: [
              "PU 105 - Pategi Central Market",
              "PU 106 - Pategi Central Primary School",
              "PU 107 - Pategi Central Community Hall",
              "PU 108 - Pategi Central Health Center",
              "PU 109 - Pategi Central Mosque",
              "PU 110 - Pategi Central Post Office",
              "PU 111 - Pategi Central Police Station",
              "PU 112 - Pategi Central Fire Station"
            ]
          }
        }
      }
    }
  },
  lagos: {
    name: "Lagos",
    lgas: {
      "ikeja": {
        name: "Ikeja",
        wards: {
          "alausa": {
            name: "Alausa",
            pollingUnits: [
              "PU 001 - Lagos State Secretariat",
              "PU 002 - Ikeja City Mall",
              "PU 003 - Alausa Primary School",
              "PU 004 - Ikeja GRA",
              "PU 005 - Allen Avenue",
              "PU 006 - Alausa Community Hall",
              "PU 007 - Alausa Health Center",
              "PU 008 - Alausa Police Station"
            ]
          },
          "oregun": {
            name: "Oregun",
            pollingUnits: [
              "PU 009 - Oregun Industrial Estate",
              "PU 010 - Oregun Market",
              "PU 011 - Oregun Primary School",
              "PU 012 - Oregun Community Hall",
              "PU 013 - Oregun Central Mosque",
              "PU 014 - Oregun Post Office",
              "PU 015 - Oregun Police Station",
              "PU 016 - Oregun Fire Station"
            ]
          },
          "agidingbi": {
            name: "Agidingbi",
            pollingUnits: [
              "PU 017 - Agidingbi Primary School",
              "PU 018 - Agidingbi Market",
              "PU 019 - Agidingbi Community Hall",
              "PU 020 - Agidingbi Health Center",
              "PU 021 - Agidingbi Central Mosque",
              "PU 022 - Agidingbi Post Office",
              "PU 023 - Agidingbi Police Station",
              "PU 024 - Agidingbi Fire Station"
            ]
          }
        }
      },
      "lagos-island": {
        name: "Lagos Island",
        wards: {
          "marina": {
            name: "Marina",
            pollingUnits: [
              "PU 025 - Marina Waterfront",
              "PU 026 - Lagos State House",
              "PU 027 - Marina Beach",
              "PU 028 - Marina Gardens",
              "PU 029 - Marina Business District",
              "PU 030 - Marina Community Hall",
              "PU 031 - Marina Health Center",
              "PU 032 - Marina Police Station"
            ]
          },
          "broad-street": {
            name: "Broad Street",
            pollingUnits: [
              "PU 033 - Broad Street Primary School",
              "PU 034 - Broad Street Market",
              "PU 035 - Broad Street Community Hall",
              "PU 036 - Broad Street Health Center",
              "PU 037 - Broad Street Central Mosque",
              "PU 038 - Broad Street Post Office",
              "PU 039 - Broad Street Police Station",
              "PU 040 - Broad Street Fire Station"
            ]
          },
          "ikoyi": {
            name: "Ikoyi",
            pollingUnits: [
              "PU 041 - Ikoyi Primary School",
              "PU 042 - Ikoyi Market",
              "PU 043 - Ikoyi Community Hall",
              "PU 044 - Ikoyi Health Center",
              "PU 045 - Ikoyi Central Mosque",
              "PU 046 - Ikoyi Post Office",
              "PU 047 - Ikoyi Police Station",
              "PU 048 - Ikoyi Fire Station"
            ]
          },
          "victoria-island": {
            name: "Victoria Island",
            pollingUnits: [
              "PU 049 - Victoria Island Primary School",
              "PU 050 - Victoria Island Market",
              "PU 051 - Victoria Island Community Hall",
              "PU 052 - Victoria Island Health Center",
              "PU 053 - Victoria Island Central Mosque",
              "PU 054 - Victoria Island Post Office",
              "PU 055 - Victoria Island Police Station",
              "PU 056 - Victoria Island Fire Station"
            ]
          }
        }
      },
      "surulere": {
        name: "Surulere",
        wards: {
          "aguda": {
            name: "Aguda",
            pollingUnits: [
              "PU 057 - Aguda Primary School",
              "PU 058 - Aguda Market",
              "PU 059 - Aguda Community Hall",
              "PU 060 - Aguda Health Center",
              "PU 061 - Aguda Central Mosque",
              "PU 062 - Aguda Post Office",
              "PU 063 - Aguda Police Station",
              "PU 064 - Aguda Fire Station"
            ]
          },
          "coker": {
            name: "Coker",
            pollingUnits: [
              "PU 065 - Coker Primary School",
              "PU 066 - Coker Market",
              "PU 067 - Coker Community Hall",
              "PU 068 - Coker Health Center",
              "PU 069 - Coker Central Mosque",
              "PU 070 - Coker Post Office",
              "PU 071 - Coker Police Station",
              "PU 072 - Coker Fire Station"
            ]
          },
          "itire": {
            name: "Itire",
            pollingUnits: [
              "PU 073 - Itire Primary School",
              "PU 074 - Itire Market",
              "PU 075 - Itire Community Hall",
              "PU 076 - Itire Health Center",
              "PU 077 - Itire Central Mosque",
              "PU 078 - Itire Post Office",
              "PU 079 - Itire Police Station",
              "PU 080 - Itire Fire Station"
            ]
          },
          "ikate": {
            name: "Ikate",
            pollingUnits: [
              "PU 081 - Ikate Primary School",
              "PU 082 - Ikate Market",
              "PU 083 - Ikate Community Hall",
              "PU 084 - Ikate Health Center",
              "PU 085 - Ikate Central Mosque",
              "PU 086 - Ikate Post Office",
              "PU 087 - Ikate Police Station",
              "PU 088 - Ikate Fire Station"
            ]
          }
        }
      },
      "alimosho": {
        name: "Alimosho",
        wards: {
          "alimosho-central": {
            name: "Alimosho Central",
            pollingUnits: [
              "PU 089 - Alimosho Central Primary School",
              "PU 090 - Alimosho Central Market",
              "PU 091 - Alimosho Central Community Hall",
              "PU 092 - Alimosho Central Health Center",
              "PU 093 - Alimosho Central Mosque",
              "PU 094 - Alimosho Central Post Office",
              "PU 095 - Alimosho Central Police Station",
              "PU 096 - Alimosho Central Fire Station"
            ]
          },
          "alimosho-north": {
            name: "Alimosho North",
            pollingUnits: [
              "PU 097 - Alimosho North Primary School",
              "PU 098 - Alimosho North Market",
              "PU 099 - Alimosho North Community Hall",
              "PU 100 - Alimosho North Health Center",
              "PU 101 - Alimosho North Mosque",
              "PU 102 - Alimosho North Post Office",
              "PU 103 - Alimosho North Police Station",
              "PU 104 - Alimosho North Fire Station"
            ]
          },
          "alimosho-south": {
            name: "Alimosho South",
            pollingUnits: [
              "PU 105 - Alimosho South Primary School",
              "PU 106 - Alimosho South Market",
              "PU 107 - Alimosho South Community Hall",
              "PU 108 - Alimosho South Health Center",
              "PU 109 - Alimosho South Mosque",
              "PU 110 - Alimosho South Post Office",
              "PU 111 - Alimosho South Police Station",
              "PU 112 - Alimosho South Fire Station"
            ]
          }
        }
      }
    }
  },
  nasarawa: {
    name: "Nasarawa",
    lgas: {
      "lafia": {
        name: "Lafia",
        wards: {
          "lafia-central": {
            name: "Lafia Central",
            pollingUnits: [
              "PU 001 - Lafia Central Market",
              "PU 002 - Lafia Central Primary School",
              "PU 003 - Lafia Central Community Hall",
              "PU 004 - Lafia Central Health Center",
              "PU 005 - Lafia Central Mosque",
              "PU 006 - Lafia Central Post Office",
              "PU 007 - Lafia Central Police Station",
              "PU 008 - Lafia Central Fire Station"
            ]
          }
        }
      },
      "ake": {
        name: "Ake",
        wards: {
          "ake-central": {
            name: "Ake Central",
            pollingUnits: [
              "PU 009 - Ake Central Market",
              "PU 010 - Ake Central Primary School",
              "PU 011 - Ake Central Community Hall",
              "PU 012 - Ake Central Health Center",
              "PU 013 - Ake Central Mosque",
              "PU 014 - Ake Central Post Office",
              "PU 015 - Ake Central Police Station",
              "PU 016 - Ake Central Fire Station"
            ]
          }
        }
      },
      "doma": {
        name: "Doma",
        wards: {
          "doma-central": {
            name: "Doma Central",
            pollingUnits: [
              "PU 017 - Doma Central Market",
              "PU 018 - Doma Central Primary School",
              "PU 019 - Doma Central Community Hall",
              "PU 020 - Doma Central Health Center",
              "PU 021 - Doma Central Mosque",
              "PU 022 - Doma Central Post Office",
              "PU 023 - Doma Central Police Station",
              "PU 024 - Doma Central Fire Station"
            ]
          }
        }
      },
      "karu": {
        name: "Karu",
        wards: {
          "karu-central": {
            name: "Karu Central",
            pollingUnits: [
              "PU 025 - Karu Central Market",
              "PU 026 - Karu Central Primary School",
              "PU 027 - Karu Central Community Hall",
              "PU 028 - Karu Central Health Center",
              "PU 029 - Karu Central Mosque",
              "PU 030 - Karu Central Post Office",
              "PU 031 - Karu Central Police Station",
              "PU 032 - Karu Central Fire Station"
            ]
          }
        }
      },
      "keana": {
        name: "Keana",
        wards: {
          "keana-central": {
            name: "Keana Central",
            pollingUnits: [
              "PU 033 - Keana Central Market",
              "PU 034 - Keana Central Primary School",
              "PU 035 - Keana Central Community Hall",
              "PU 036 - Keana Central Health Center",
              "PU 037 - Keana Central Mosque",
              "PU 038 - Keana Central Post Office",
              "PU 039 - Keana Central Police Station",
              "PU 040 - Keana Central Fire Station"
            ]
          }
        }
      },
      "keffi": {
        name: "Keffi",
        wards: {
          "keffi-central": {
            name: "Keffi Central",
            pollingUnits: [
              "PU 041 - Keffi Central Market",
              "PU 042 - Keffi Central Primary School",
              "PU 043 - Keffi Central Community Hall",
              "PU 044 - Keffi Central Health Center",
              "PU 045 - Keffi Central Mosque",
              "PU 046 - Keffi Central Post Office",
              "PU 047 - Keffi Central Police Station",
              "PU 048 - Keffi Central Fire Station"
            ]
          }
        }
      },
      "kokona": {
        name: "Kokona",
        wards: {
          "kokona-central": {
            name: "Kokona Central",
            pollingUnits: [
              "PU 049 - Kokona Central Market",
              "PU 050 - Kokona Central Primary School",
              "PU 051 - Kokona Central Community Hall",
              "PU 052 - Kokona Central Health Center",
              "PU 053 - Kokona Central Mosque",
              "PU 054 - Kokona Central Post Office",
              "PU 055 - Kokona Central Police Station",
              "PU 056 - Kokona Central Fire Station"
            ]
          }
        }
      },
      "nasarawa": {
        name: "Nasarawa",
        wards: {
          "nasarawa-central": {
            name: "Nasarawa Central",
            pollingUnits: [
              "PU 057 - Nasarawa Central Market",
              "PU 058 - Nasarawa Central Primary School",
              "PU 059 - Nasarawa Central Community Hall",
              "PU 060 - Nasarawa Central Health Center",
              "PU 061 - Nasarawa Central Mosque",
              "PU 062 - Nasarawa Central Post Office",
              "PU 063 - Nasarawa Central Police Station",
              "PU 064 - Nasarawa Central Fire Station"
            ]
          }
        }
      },
      "toto": {
        name: "Toto",
        wards: {
          "toto-central": {
            name: "Toto Central",
            pollingUnits: [
              "PU 065 - Toto Central Market",
              "PU 066 - Toto Central Primary School",
              "PU 067 - Toto Central Community Hall",
              "PU 068 - Toto Central Health Center",
              "PU 069 - Toto Central Mosque",
              "PU 070 - Toto Central Post Office",
              "PU 071 - Toto Central Police Station",
              "PU 072 - Toto Central Fire Station"
            ]
          }
        }
      },
      "wamba": {
        name: "Wamba",
        wards: {
          "wamba-central": {
            name: "Wamba Central",
            pollingUnits: [
              "PU 073 - Wamba Central Market",
              "PU 074 - Wamba Central Primary School",
              "PU 075 - Wamba Central Community Hall",
              "PU 076 - Wamba Central Health Center",
              "PU 077 - Wamba Central Mosque",
              "PU 078 - Wamba Central Post Office",
              "PU 079 - Wamba Central Police Station",
              "PU 080 - Wamba Central Fire Station"
            ]
          }
        }
      },
      "nasarawa-eggon": {
        name: "Nasarawa Eggon",
        wards: {
          "nasarawa-eggon-central": {
            name: "Nasarawa Eggon Central",
            pollingUnits: [
              "PU 081 - Nasarawa Eggon Central Market",
              "PU 082 - Nasarawa Eggon Central Primary School",
              "PU 083 - Nasarawa Eggon Central Community Hall",
              "PU 084 - Nasarawa Eggon Central Health Center",
              "PU 085 - Nasarawa Eggon Central Mosque",
              "PU 086 - Nasarawa Eggon Central Post Office",
              "PU 087 - Nasarawa Eggon Central Police Station",
              "PU 088 - Nasarawa Eggon Central Fire Station"
            ]
          }
        }
      },
      "obi": {
        name: "Obi",
        wards: {
          "obi-central": {
            name: "Obi Central",
            pollingUnits: [
              "PU 089 - Obi Central Market",
              "PU 090 - Obi Central Primary School",
              "PU 091 - Obi Central Community Hall",
              "PU 092 - Obi Central Health Center",
              "PU 093 - Obi Central Mosque",
              "PU 094 - Obi Central Post Office",
              "PU 095 - Obi Central Police Station",
              "PU 096 - Obi Central Fire Station"
            ]
          }
        }
      },
      "aweng": {
        name: "Aweng",
        wards: {
          "aweng-central": {
            name: "Aweng Central",
            pollingUnits: [
              "PU 097 - Aweng Central Market",
              "PU 098 - Aweng Central Primary School",
              "PU 099 - Aweng Central Community Hall",
              "PU 100 - Aweng Central Health Center",
              "PU 101 - Aweng Central Mosque",
              "PU 102 - Aweng Central Post Office",
              "PU 103 - Aweng Central Police Station",
              "PU 104 - Aweng Central Fire Station"
            ]
          }
        }
      }
    }
  },
  niger: {
    name: "Niger",
    lgas: {
      "minna": {
        name: "Minna",
        wards: {
          "minna-central": {
            name: "Minna Central",
            pollingUnits: [
              "PU 001 - Minna Central Market",
              "PU 002 - Minna Central Primary School",
              "PU 003 - Minna Central Community Hall",
              "PU 004 - Minna Central Health Center",
              "PU 005 - Minna Central Mosque",
              "PU 006 - Minna Central Post Office",
              "PU 007 - Minna Central Police Station",
              "PU 008 - Minna Central Fire Station"
            ]
          }
        }
      },
      "bida": {
        name: "Bida",
        wards: {
          "bida-central": {
            name: "Bida Central",
            pollingUnits: [
              "PU 009 - Bida Central Market",
              "PU 010 - Bida Central Primary School",
              "PU 011 - Bida Central Community Hall",
              "PU 012 - Bida Central Health Center",
              "PU 013 - Bida Central Mosque",
              "PU 014 - Bida Central Post Office",
              "PU 015 - Bida Central Police Station",
              "PU 016 - Bida Central Fire Station"
            ]
          }
        }
      },
      "kontagora": {
        name: "Kontagora",
        wards: {
          "kontagora-central": {
            name: "Kontagora Central",
            pollingUnits: [
              "PU 017 - Kontagora Central Market",
              "PU 018 - Kontagora Central Primary School",
              "PU 019 - Kontagora Central Community Hall",
              "PU 020 - Kontagora Central Health Center",
              "PU 021 - Kontagora Central Mosque",
              "PU 022 - Kontagora Central Post Office",
              "PU 023 - Kontagora Central Police Station",
              "PU 024 - Kontagora Central Fire Station"
            ]
          }
        }
      },
      "suleja": {
        name: "Suleja",
        wards: {
          "suleja-central": {
            name: "Suleja Central",
            pollingUnits: [
              "PU 025 - Suleja Central Market",
              "PU 026 - Suleja Central Primary School",
              "PU 027 - Suleja Central Community Hall",
              "PU 028 - Suleja Central Health Center",
              "PU 029 - Suleja Central Mosque",
              "PU 030 - Suleja Central Post Office",
              "PU 031 - Suleja Central Police Station",
              "PU 032 - Suleja Central Fire Station"
            ]
          }
        }
      },
      "lapai": {
        name: "Lapai",
        wards: {
          "lapai-central": {
            name: "Lapai Central",
            pollingUnits: [
              "PU 033 - Lapai Central Market",
              "PU 034 - Lapai Central Primary School",
              "PU 035 - Lapai Central Community Hall",
              "PU 036 - Lapai Central Health Center",
              "PU 037 - Lapai Central Mosque",
              "PU 038 - Lapai Central Post Office",
              "PU 039 - Lapai Central Police Station",
              "PU 040 - Lapai Central Fire Station"
            ]
          }
        }
      },
      "agwara": {
        name: "Agwara",
        wards: {
          "agwara-central": {
            name: "Agwara Central",
            pollingUnits: [
              "PU 041 - Agwara Central Market",
              "PU 042 - Agwara Central Primary School",
              "PU 043 - Agwara Central Community Hall",
              "PU 044 - Agwara Central Health Center",
              "PU 045 - Agwara Central Mosque",
              "PU 046 - Agwara Central Post Office",
              "PU 047 - Agwara Central Police Station",
              "PU 048 - Agwara Central Fire Station"
            ]
          }
        }
      },
      "bogoro": {
        name: "Bogoro",
        wards: {
          "bogoro-central": {
            name: "Bogoro Central",
            pollingUnits: [
              "PU 049 - Bogoro Central Market",
              "PU 050 - Bogoro Central Primary School",
              "PU 051 - Bogoro Central Community Hall",
              "PU 052 - Bogoro Central Health Center",
              "PU 053 - Bogoro Central Mosque",
              "PU 054 - Bogoro Central Post Office",
              "PU 055 - Bogoro Central Police Station",
              "PU 056 - Bogoro Central Fire Station"
            ]
          }
        }
      },
      "dass": {
        name: "Dass",
        wards: {
          "dass-central": {
            name: "Dass Central",
            pollingUnits: [
              "PU 057 - Dass Central Market",
              "PU 058 - Dass Central Primary School",
              "PU 059 - Dass Central Community Hall",
              "PU 060 - Dass Central Health Center",
              "PU 061 - Dass Central Mosque",
              "PU 062 - Dass Central Post Office",
              "PU 063 - Dass Central Police Station",
              "PU 064 - Dass Central Fire Station"
            ]
          }
        }
      },
      "gamawa": {
        name: "Gamawa",
        wards: {
          "gamawa-central": {
            name: "Gamawa Central",
            pollingUnits: [
              "PU 065 - Gamawa Central Market",
              "PU 066 - Gamawa Central Primary School",
              "PU 067 - Gamawa Central Community Hall",
              "PU 068 - Gamawa Central Health Center",
              "PU 069 - Gamawa Central Mosque",
              "PU 070 - Gamawa Central Post Office",
              "PU 071 - Gamawa Central Police Station",
              "PU 072 - Gamawa Central Fire Station"
            ]
          }
        }
      },
      "giade": {
        name: "Giade",
        wards: {
          "giade-central": {
            name: "Giade Central",
            pollingUnits: [
              "PU 073 - Giade Central Market",
              "PU 074 - Giade Central Primary School",
              "PU 075 - Giade Central Community Hall",
              "PU 076 - Giade Central Health Center",
              "PU 077 - Giade Central Mosque",
              "PU 078 - Giade Central Post Office",
              "PU 079 - Giade Central Police Station",
              "PU 080 - Giade Central Fire Station"
            ]
          }
        }
      },
      "itas-gadau": {
        name: "Itas Gadau",
        wards: {
          "itas-gadau-central": {
            name: "Itas Gadau Central",
            pollingUnits: [
              "PU 081 - Itas Gadau Central Market",
              "PU 082 - Itas Gadau Central Primary School",
              "PU 083 - Itas Gadau Central Community Hall",
              "PU 084 - Itas Gadau Central Health Center",
              "PU 085 - Itas Gadau Central Mosque",
              "PU 086 - Itas Gadau Central Post Office",
              "PU 087 - Itas Gadau Central Police Station",
              "PU 088 - Itas Gadau Central Fire Station"
            ]
          }
        }
      },
      "jamaare": {
        name: "Jamaare",
        wards: {
          "jamaare-central": {
            name: "Jamaare Central",
            pollingUnits: [
              "PU 089 - Jamaare Central Market",
              "PU 090 - Jamaare Central Primary School",
              "PU 091 - Jamaare Central Community Hall",
              "PU 092 - Jamaare Central Health Center",
              "PU 093 - Jamaare Central Mosque",
              "PU 094 - Jamaare Central Post Office",
              "PU 095 - Jamaare Central Police Station",
              "PU 096 - Jamaare Central Fire Station"
            ]
          }
        }
      },
      "katagum": {
        name: "Katagum",
        wards: {
          "katagum-central": {
            name: "Katagum Central",
            pollingUnits: [
              "PU 097 - Katagum Central Market",
              "PU 098 - Katagum Central Primary School",
              "PU 099 - Katagum Central Community Hall",
              "PU 100 - Katagum Central Health Center",
              "PU 101 - Katagum Central Mosque",
              "PU 102 - Katagum Central Post Office",
              "PU 103 - Katagum Central Police Station",
              "PU 104 - Katagum Central Fire Station"
            ]
          }
        }
      },
      "kirfi": {
        name: "Kirfi",
        wards: {
          "kirfi-central": {
            name: "Kirfi Central",
            pollingUnits: [
              "PU 105 - Kirfi Central Market",
              "PU 106 - Kirfi Central Primary School",
              "PU 107 - Kirfi Central Community Hall",
              "PU 108 - Kirfi Central Health Center",
              "PU 109 - Kirfi Central Mosque",
              "PU 110 - Kirfi Central Post Office",
              "PU 111 - Kirfi Central Police Station",
              "PU 112 - Kirfi Central Fire Station"
            ]
          }
        }
      },
      "misau": {
        name: "Misau",
        wards: {
          "misau-central": {
            name: "Misau Central",
            pollingUnits: [
              "PU 113 - Misau Central Market",
              "PU 114 - Misau Central Primary School",
              "PU 115 - Misau Central Community Hall",
              "PU 116 - Misau Central Health Center",
              "PU 117 - Misau Central Mosque",
              "PU 118 - Misau Central Post Office",
              "PU 119 - Misau Central Police Station",
              "PU 120 - Misau Central Fire Station"
            ]
          }
        }
      },
      "ningi": {
        name: "Ningi",
        wards: {
          "ningi-central": {
            name: "Ningi Central",
            pollingUnits: [
              "PU 121 - Ningi Central Market",
              "PU 122 - Ningi Central Primary School",
              "PU 123 - Ningi Central Community Hall",
              "PU 124 - Ningi Central Health Center",
              "PU 125 - Ningi Central Mosque",
              "PU 126 - Ningi Central Post Office",
              "PU 127 - Ningi Central Police Station",
              "PU 128 - Ningi Central Fire Station"
            ]
          }
        }
      },
      "shira": {
        name: "Shira",
        wards: {
          "shira-central": {
            name: "Shira Central",
            pollingUnits: [
              "PU 129 - Shira Central Market",
              "PU 130 - Shira Central Primary School",
              "PU 131 - Shira Central Community Hall",
              "PU 132 - Shira Central Health Center",
              "PU 133 - Shira Central Mosque",
              "PU 134 - Shira Central Post Office",
              "PU 135 - Shira Central Police Station",
              "PU 136 - Shira Central Fire Station"
            ]
          }
        }
      },
      "toro": {
        name: "Toro",
        wards: {
          "toro-central": {
            name: "Toro Central",
            pollingUnits: [
              "PU 137 - Toro Central Market",
              "PU 138 - Toro Central Primary School",
              "PU 139 - Toro Central Community Hall",
              "PU 140 - Toro Central Health Center",
              "PU 141 - Toro Central Mosque",
              "PU 142 - Toro Central Post Office",
              "PU 143 - Toro Central Police Station",
              "PU 144 - Toro Central Fire Station"
            ]
          }
        }
      },
      "warji": {
        name: "Warji",
        wards: {
          "warji-central": {
            name: "Warji Central",
            pollingUnits: [
              "PU 145 - Warji Central Market",
              "PU 146 - Warji Central Primary School",
              "PU 147 - Warji Central Community Hall",
              "PU 148 - Warji Central Health Center",
              "PU 149 - Warji Central Mosque",
              "PU 150 - Warji Central Post Office",
              "PU 151 - Warji Central Police Station",
              "PU 152 - Warji Central Fire Station"
            ]
          }
        }
      },
      "zaki": {
        name: "Zaki",
        wards: {
          "zaki-central": {
            name: "Zaki Central",
            pollingUnits: [
              "PU 153 - Zaki Central Market",
              "PU 154 - Zaki Central Primary School",
              "PU 155 - Zaki Central Primary School",
              "PU 156 - Zaki Central Health Center",
              "PU 157 - Zaki Central Mosque",
              "PU 158 - Zaki Central Post Office",
              "PU 159 - Zaki Central Police Station",
              "PU 160 - Zaki Central Fire Station"
            ]
          }
        }
      }
    }
  },
  ogun: {
    name: "Ogun",
    lgas: {
      "abeokuta-north": {
        name: "Abeokuta North",
        wards: {
          "abeokuta-north-central": {
            name: "Abeokuta North Central",
            pollingUnits: [
              "PU 001 - Abeokuta North Central Market",
              "PU 002 - Abeokuta North Central Primary School",
              "PU 003 - Abeokuta North Central Community Hall",
              "PU 004 - Abeokuta North Central Health Center",
              "PU 005 - Abeokuta North Central Mosque",
              "PU 006 - Abeokuta North Central Post Office",
              "PU 007 - Abeokuta North Central Police Station",
              "PU 008 - Abeokuta North Central Fire Station"
            ]
          }
        }
      },
      "abeokuta-south": {
        name: "Abeokuta South",
        wards: {
          "abeokuta-south-central": {
            name: "Abeokuta South Central",
            pollingUnits: [
              "PU 009 - Abeokuta South Central Market",
              "PU 010 - Abeokuta South Central Primary School",
              "PU 011 - Abeokuta South Central Community Hall",
              "PU 012 - Abeokuta South Central Health Center",
              "PU 013 - Abeokuta South Central Mosque",
              "PU 014 - Abeokuta South Central Post Office",
              "PU 015 - Abeokuta South Central Police Station",
              "PU 016 - Abeokuta South Central Fire Station"
            ]
          }
        }
      },
      "adoodo-ota": {
        name: "Adoodo Ota",
        wards: {
          "adoodo-ota-central": {
            name: "Adoodo Ota Central",
            pollingUnits: [
              "PU 017 - Adoodo Ota Central Market",
              "PU 018 - Adoodo Ota Central Primary School",
              "PU 019 - Adoodo Ota Central Community Hall",
              "PU 020 - Adoodo Ota Central Health Center",
              "PU 021 - Adoodo Ota Central Mosque",
              "PU 022 - Adoodo Ota Central Post Office",
              "PU 023 - Adoodo Ota Central Police Station",
              "PU 024 - Adoodo Ota Central Fire Station"
            ]
          }
        }
      },
      "ewekoro": {
        name: "Ewekoro",
        wards: {
          "ewekoro-central": {
            name: "Ewekoro Central",
            pollingUnits: [
              "PU 025 - Ewekoro Central Market",
              "PU 026 - Ewekoro Central Primary School",
              "PU 027 - Ewekoro Central Community Hall",
              "PU 028 - Ewekoro Central Health Center",
              "PU 029 - Ewekoro Central Mosque",
              "PU 030 - Ewekoro Central Post Office",
              "PU 031 - Ewekoro Central Police Station",
              "PU 032 - Ewekoro Central Fire Station"
            ]
          }
        }
      },
      "ifo": {
        name: "Ifo",
        wards: {
          "ifo-central": {
            name: "Ifo Central",
            pollingUnits: [
              "PU 033 - Ifo Central Market",
              "PU 034 - Ifo Central Primary School",
              "PU 035 - Ifo Central Community Hall",
              "PU 036 - Ifo Central Health Center",
              "PU 037 - Ifo Central Mosque",
              "PU 038 - Ifo Central Post Office",
              "PU 039 - Ifo Central Police Station",
              "PU 040 - Ifo Central Fire Station"
            ]
          }
        }
      },
      "ijebu-east": {
        name: "Ijebu East",
        wards: {
          "ijebu-east-central": {
            name: "Ijebu East Central",
            pollingUnits: [
              "PU 041 - Ijebu East Central Market",
              "PU 042 - Ijebu East Central Primary School",
              "PU 043 - Ijebu East Central Community Hall",
              "PU 044 - Ijebu East Central Health Center",
              "PU 045 - Ijebu East Central Mosque",
              "PU 046 - Ijebu East Central Post Office",
              "PU 047 - Ijebu East Central Police Station",
              "PU 048 - Ijebu East Central Fire Station"
            ]
          }
        }
      },
      "ijebu-north": {
        name: "Ijebu North",
        wards: {
          "ijebu-north-central": {
            name: "Ijebu North Central",
            pollingUnits: [
              "PU 049 - Ijebu North Central Market",
              "PU 050 - Ijebu North Central Primary School",
              "PU 051 - Ijebu North Central Community Hall",
              "PU 052 - Ijebu North Central Health Center",
              "PU 053 - Ijebu North Central Mosque",
              "PU 054 - Ijebu North Central Post Office",
              "PU 055 - Ijebu North Central Police Station",
              "PU 056 - Ijebu North Central Fire Station"
            ]
          }
        }
      },
      "ijebu-north-east": {
        name: "Ijebu North East",
        wards: {
          "ijebu-north-east-central": {
            name: "Ijebu North East Central",
            pollingUnits: [
              "PU 057 - Ijebu North East Central Market",
              "PU 058 - Ijebu North East Central Primary School",
              "PU 059 - Ijebu North East Central Community Hall",
              "PU 060 - Ijebu North East Central Health Center",
              "PU 061 - Ijebu North East Central Mosque",
              "PU 062 - Ijebu North East Central Post Office",
              "PU 063 - Ijebu North East Central Police Station",
              "PU 064 - Ijebu North East Central Fire Station"
            ]
          }
        }
      },
      "ijebu-ode": {
        name: "Ijebu Ode",
        wards: {
          "ijebu-ode-central": {
            name: "Ijebu Ode Central",
            pollingUnits: [
              "PU 065 - Ijebu Ode Central Market",
              "PU 066 - Ijebu Ode Central Primary School",
              "PU 067 - Ijebu Ode Central Community Hall",
              "PU 068 - Ijebu Ode Central Health Center",
              "PU 069 - Ijebu Ode Central Mosque",
              "PU 070 - Ijebu Ode Central Post Office",
              "PU 071 - Ijebu Ode Central Police Station",
              "PU 072 - Ijebu Ode Central Fire Station"
            ]
          }
        }
      },
      "ikenne": {
        name: "Ikenne",
        wards: {
          "ikenne-central": {
            name: "Ikenne Central",
            pollingUnits: [
              "PU 073 - Ikenne Central Market",
              "PU 074 - Ikenne Central Primary School",
              "PU 075 - Ikenne Central Community Hall",
              "PU 076 - Ikenne Central Health Center",
              "PU 077 - Ikenne Central Mosque",
              "PU 078 - Ikenne Central Post Office",
              "PU 079 - Ikenne Central Police Station",
              "PU 080 - Ikenne Central Fire Station"
            ]
          }
        }
      },
      "imeko-afon": {
        name: "Imeko Afon",
        wards: {
          "imeko-afon-central": {
            name: "Imeko Afon Central",
            pollingUnits: [
              "PU 081 - Imeko Afon Central Market",
              "PU 082 - Imeko Afon Central Primary School",
              "PU 083 - Imeko Afon Central Community Hall",
              "PU 084 - Imeko Afon Central Health Center",
              "PU 085 - Imeko Afon Central Mosque",
              "PU 086 - Imeko Afon Central Post Office",
              "PU 087 - Imeko Afon Central Police Station",
              "PU 088 - Imeko Afon Central Fire Station"
            ]
          }
        }
      },
      "ipokia": {
        name: "Ipokia",
        wards: {
          "ipokia-central": {
            name: "Ipokia Central",
            pollingUnits: [
              "PU 089 - Ipokia Central Market",
              "PU 090 - Ipokia Central Primary School",
              "PU 091 - Ipokia Central Community Hall",
              "PU 092 - Ipokia Central Health Center",
              "PU 093 - Ipokia Central Mosque",
              "PU 094 - Ipokia Central Post Office",
              "PU 095 - Ipokia Central Police Station",
              "PU 096 - Ipokia Central Fire Station"
            ]
          }
        }
      },
      "obafemi-owode": {
        name: "Obafemi Owode",
        wards: {
          "obafemi-owode-central": {
            name: "Obafemi Owode Central",
            pollingUnits: [
              "PU 097 - Obafemi Owode Central Market",
              "PU 098 - Obafemi Owode Central Primary School",
              "PU 099 - Obafemi Owode Central Community Hall",
              "PU 100 - Obafemi Owode Central Health Center",
              "PU 101 - Obafemi Owode Central Mosque",
              "PU 102 - Obafemi Owode Central Post Office",
              "PU 103 - Obafemi Owode Central Police Station",
              "PU 104 - Obafemi Owode Central Fire Station"
            ]
          }
        }
      },
      "odeda": {
        name: "Odeda",
        wards: {
          "odeda-central": {
            name: "Odeda Central",
            pollingUnits: [
              "PU 105 - Odeda Central Market",
              "PU 106 - Odeda Central Primary School",
              "PU 107 - Odeda Central Community Hall",
              "PU 108 - Odeda Central Health Center",
              "PU 109 - Odeda Central Mosque",
              "PU 110 - Odeda Central Post Office",
              "PU 111 - Odeda Central Police Station",
              "PU 112 - Odeda Central Fire Station"
            ]
          }
        }
      },
      "odogbolu": {
        name: "Odogbolu",
        wards: {
          "odogbolu-central": {
            name: "Odogbolu Central",
            pollingUnits: [
              "PU 113 - Odogbolu Central Market",
              "PU 114 - Odogbolu Central Primary School",
              "PU 115 - Odogbolu Central Community Hall",
              "PU 116 - Odogbolu Central Health Center",
              "PU 117 - Odogbolu Central Mosque",
              "PU 118 - Odogbolu Central Post Office",
              "PU 119 - Odogbolu Central Police Station",
              "PU 120 - Odogbolu Central Fire Station"
            ]
          }
        }
      },
      "remo-north": {
        name: "Remo North",
        wards: {
          "remo-north-central": {
            name: "Remo North Central",
            pollingUnits: [
              "PU 121 - Remo North Central Market",
              "PU 122 - Remo North Central Primary School",
              "PU 123 - Remo North Central Community Hall",
              "PU 124 - Remo North Central Health Center",
              "PU 125 - Remo North Central Mosque",
              "PU 126 - Remo North Central Post Office",
              "PU 127 - Remo North Central Police Station",
              "PU 128 - Remo North Central Fire Station"
            ]
          }
        }
      },
      "shagamu": {
        name: "Shagamu",
        wards: {
          "shagamu-central": {
            name: "Shagamu Central",
            pollingUnits: [
              "PU 129 - Shagamu Central Market",
              "PU 130 - Shagamu Central Primary School",
              "PU 131 - Shagamu Central Community Hall",
              "PU 132 - Shagamu Central Health Center",
              "PU 133 - Shagamu Central Mosque",
              "PU 134 - Shagamu Central Post Office",
              "PU 135 - Shagamu Central Police Station",
              "PU 136 - Shagamu Central Fire Station"
            ]
          }
        }
      },
      "yewa-north": {
        name: "Yewa North",
        wards: {
          "yewa-north-central": {
            name: "Yewa North Central",
            pollingUnits: [
              "PU 137 - Yewa North Central Market",
              "PU 138 - Yewa North Central Primary School",
              "PU 139 - Yewa North Central Community Hall",
              "PU 140 - Yewa North Central Health Center",
              "PU 141 - Yewa North Central Mosque",
              "PU 142 - Yewa North Central Post Office",
              "PU 143 - Yewa North Central Police Station",
              "PU 144 - Yewa North Central Fire Station"
            ]
          }
        }
      },
      "yewa-south": {
        name: "Yewa South",
        wards: {
          "yewa-south-central": {
            name: "Yewa South Central",
            pollingUnits: [
              "PU 145 - Yewa South Central Market",
              "PU 146 - Yewa South Central Primary School",
              "PU 147 - Yewa South Central Community Hall",
              "PU 148 - Yewa South Central Health Center",
              "PU 149 - Yewa South Central Mosque",
              "PU 150 - Yewa South Central Post Office",
              "PU 151 - Yewa South Central Police Station",
              "PU 152 - Yewa South Central Fire Station"
            ]
          }
        }
      }
    }
  },
  ondo: {
    name: "Ondo",
    lgas: {
      "akure-south": {
        name: "Akure South",
        wards: {
          "akure-south-central": {
            name: "Akure South Central",
            pollingUnits: [
              "PU 001 - Akure South Central Market",
              "PU 002 - Akure South Central Primary School",
              "PU 003 - Akure South Central Community Hall",
              "PU 004 - Akure South Central Health Center",
              "PU 005 - Akure South Central Mosque",
              "PU 006 - Akure South Central Post Office",
              "PU 007 - Akure South Central Police Station",
              "PU 008 - Akure South Central Fire Station"
            ]
          }
        }
      },
      "akure-north": {
        name: "Akure North",
        wards: {
          "akure-north-central": {
            name: "Akure North Central",
            pollingUnits: [
              "PU 009 - Akure North Central Market",
              "PU 010 - Akure North Central Primary School",
              "PU 011 - Akure North Central Community Hall",
              "PU 012 - Akure North Central Health Center",
              "PU 013 - Akure North Central Mosque",
              "PU 014 - Akure North Central Post Office",
              "PU 015 - Akure North Central Police Station",
              "PU 016 - Akure North Central Fire Station"
            ]
          }
        }
      },
      "ondo-west": {
        name: "Ondo West",
        wards: {
          "ondo-west-central": {
            name: "Ondo West Central",
            pollingUnits: [
              "PU 017 - Ondo West Central Market",
              "PU 018 - Ondo West Central Primary School",
              "PU 019 - Ondo West Central Community Hall",
              "PU 020 - Ondo West Central Health Center",
              "PU 021 - Ondo West Central Mosque",
              "PU 022 - Ondo West Central Post Office",
              "PU 023 - Ondo West Central Police Station",
              "PU 024 - Ondo West Central Fire Station"
            ]
          }
        }
      },
      "ondo-east": {
        name: "Ondo East",
        wards: {
          "ondo-east-central": {
            name: "Ondo East Central",
            pollingUnits: [
              "PU 025 - Ondo East Central Market",
              "PU 026 - Ondo East Central Primary School",
              "PU 027 - Ondo East Central Community Hall",
              "PU 028 - Ondo East Central Health Center",
              "PU 029 - Ondo East Central Mosque",
              "PU 030 - Ondo East Central Post Office",
              "PU 031 - Ondo East Central Police Station",
              "PU 032 - Ondo East Central Fire Station"
            ]
          }
        }
      },
      "ose": {
        name: "Ose",
        wards: {
          "ose-central": {
            name: "Ose Central",
            pollingUnits: [
              "PU 033 - Ose Central Market",
              "PU 034 - Ose Central Primary School",
              "PU 035 - Ose Central Community Hall",
              "PU 036 - Ose Central Health Center",
              "PU 037 - Ose Central Mosque",
              "PU 038 - Ose Central Post Office",
              "PU 039 - Ose Central Police Station",
              "PU 040 - Ose Central Fire Station"
            ]
          }
        }
      },
      "owo": {
        name: "Owo",
        wards: {
          "owo-central": {
            name: "Owo Central",
            pollingUnits: [
              "PU 041 - Owo Central Market",
              "PU 042 - Owo Central Primary School",
              "PU 043 - Owo Central Community Hall",
              "PU 044 - Owo Central Health Center",
              "PU 045 - Owo Central Mosque",
              "PU 046 - Owo Central Post Office",
              "PU 047 - Owo Central Police Station",
              "PU 048 - Owo Central Fire Station"
            ]
          }
        }
      },
      "idani": {
        name: "Idani",
        wards: {
          "idani-central": {
            name: "Idani Central",
            pollingUnits: [
              "PU 049 - Idani Central Market",
              "PU 050 - Idani Central Primary School",
              "PU 051 - Idani Central Community Hall",
              "PU 052 - Idani Central Health Center",
              "PU 053 - Idani Central Mosque",
              "PU 054 - Idani Central Post Office",
              "PU 055 - Idani Central Police Station",
              "PU 056 - Idani Central Fire Station"
            ]
          }
        }
      },
      "ifedore": {
        name: "Ifedore",
        wards: {
          "ifedore-central": {
            name: "Ifedore Central",
            pollingUnits: [
              "PU 057 - Ifedore Central Market",
              "PU 058 - Ifedore Central Primary School",
              "PU 059 - Ifedore Central Community Hall",
              "PU 060 - Ifedore Central Health Center",
              "PU 061 - Ifedore Central Mosque",
              "PU 062 - Ifedore Central Post Office",
              "PU 063 - Ifedore Central Police Station",
              "PU 064 - Ifedore Central Fire Station"
            ]
          }
        }
      },
      "ilaje": {
        name: "Ilaje",
        wards: {
          "ilaje-central": {
            name: "Ilaje Central",
            pollingUnits: [
              "PU 065 - Ilaje Central Market",
              "PU 066 - Ilaje Central Primary School",
              "PU 067 - Ilaje Central Community Hall",
              "PU 068 - Ilaje Central Health Center",
              "PU 069 - Ilaje Central Mosque",
              "PU 070 - Ilaje Central Post Office",
              "PU 071 - Ilaje Central Police Station",
              "PU 072 - Ilaje Central Fire Station"
            ]
          }
        }
      },
      "irele": {
        name: "Irele",
        wards: {
          "irele-central": {
            name: "Irele Central",
            pollingUnits: [
              "PU 073 - Irele Central Market",
              "PU 074 - Irele Central Primary School",
              "PU 075 - Irele Central Community Hall",
              "PU 076 - Irele Central Health Center",
              "PU 077 - Irele Central Mosque",
              "PU 078 - Irele Central Post Office",
              "PU 079 - Irele Central Police Station",
              "PU 080 - Irele Central Fire Station"
            ]
          }
        }
      },
      "okitipupa": {
        name: "Okitipupa",
        wards: {
          "okitipupa-central": {
            name: "Okitipupa Central",
            pollingUnits: [
              "PU 081 - Okitipupa Central Market",
              "PU 082 - Okitipupa Central Primary School",
              "PU 083 - Okitipupa Central Community Hall",
              "PU 084 - Okitipupa Central Health Center",
              "PU 085 - Okitipupa Central Mosque",
              "PU 086 - Okitipupa Central Post Office",
              "PU 087 - Okitipupa Central Police Station",
              "PU 088 - Okitipupa Central Fire Station"
            ]
          }
        }
      },
      "akoko-north-east": {
        name: "Akoko North East",
        wards: {
          "akoko-north-east-central": {
            name: "Akoko North East Central",
            pollingUnits: [
              "PU 089 - Akoko North East Central Market",
              "PU 090 - Akoko North East Central Primary School",
              "PU 091 - Akoko North East Central Community Hall",
              "PU 092 - Akoko North East Central Health Center",
              "PU 093 - Akoko North East Central Mosque",
              "PU 094 - Akoko North East Central Post Office",
              "PU 095 - Akoko North East Central Police Station",
              "PU 096 - Akoko North East Central Fire Station"
            ]
          }
        }
      },
      "akoko-north-west": {
        name: "Akoko North West",
        wards: {
          "akoko-north-west-central": {
            name: "Akoko North West Central",
            pollingUnits: [
              "PU 097 - Akoko North West Central Market",
              "PU 098 - Akoko North West Central Primary School",
              "PU 099 - Akoko North West Central Community Hall",
              "PU 100 - Akoko North West Central Health Center",
              "PU 101 - Akoko North West Central Mosque",
              "PU 102 - Akoko North West Central Post Office",
              "PU 103 - Akoko North West Central Police Station",
              "PU 104 - Akoko North West Central Fire Station"
            ]
          }
        }
      },
      "akoko-south-east": {
        name: "Akoko South East",
        wards: {
          "akoko-south-east-central": {
            name: "Akoko South East Central",
            pollingUnits: [
              "PU 105 - Akoko South East Central Market",
              "PU 106 - Akoko South East Central Primary School",
              "PU 107 - Akoko South East Central Community Hall",
              "PU 108 - Akoko South East Central Health Center",
              "PU 109 - Akoko South East Central Mosque",
              "PU 110 - Akoko South East Central Post Office",
              "PU 111 - Akoko South East Central Police Station",
              "PU 112 - Akoko South East Central Fire Station"
            ]
          }
        }
      },
      "akoko-south-west": {
        name: "Akoko South West",
        wards: {
          "akoko-south-west-central": {
            name: "Akoko South West Central",
            pollingUnits: [
              "PU 113 - Akoko South West Central Market",
              "PU 114 - Akoko South West Central Primary School",
              "PU 115 - Akoko South West Central Community Hall",
              "PU 116 - Akoko South West Central Health Center",
              "PU 117 - Akoko South West Central Mosque",
              "PU 118 - Akoko South West Central Post Office",
              "PU 119 - Akoko South West Central Police Station",
              "PU 120 - Akoko South West Central Fire Station"
            ]
          }
        }
      },
      "odigbo": {
        name: "Odigbo",
        wards: {
          "odigbo-central": {
            name: "Odigbo Central",
            pollingUnits: [
              "PU 121 - Odigbo Central Market",
              "PU 122 - Odigbo Central Primary School",
              "PU 123 - Odigbo Central Community Hall",
              "PU 124 - Odigbo Central Health Center",
              "PU 125 - Odigbo Central Mosque",
              "PU 126 - Odigbo Central Post Office",
              "PU 127 - Odigbo Central Police Station",
              "PU 128 - Odigbo Central Fire Station"
            ]
          }
        }
      },
      "east-odo": {
        name: "East Odo",
        wards: {
          "east-odo-central": {
            name: "East Odo Central",
            pollingUnits: [
              "PU 129 - East Odo Central Market",
              "PU 130 - East Odo Central Primary School",
              "PU 131 - East Odo Central Community Hall",
              "PU 132 - East Odo Central Health Center",
              "PU 133 - East Odo Central Mosque",
              "PU 134 - East Odo Central Post Office",
              "PU 135 - East Odo Central Police Station",
              "PU 136 - East Odo Central Fire Station"
            ]
          }
        }
      }
    }
  },
  osun: {
    name: "Osun",
    lgas: {
      "osogbo": {
        name: "Osogbo",
        wards: {
          "osogbo-central": {
            name: "Osogbo Central",
            pollingUnits: [
              "PU 001 - Osogbo Central Market",
              "PU 002 - Osogbo Central Primary School",
              "PU 003 - Osogbo Central Community Hall",
              "PU 004 - Osogbo Central Health Center",
              "PU 005 - Osogbo Central Mosque",
              "PU 006 - Osogbo Central Post Office",
              "PU 007 - Osogbo Central Police Station",
              "PU 008 - Osogbo Central Fire Station"
            ]
          }
        }
      },
      "ife-central": {
        name: "Ife Central",
        wards: {
          "ife-central-central": {
            name: "Ife Central Central",
            pollingUnits: [
              "PU 009 - Ife Central Central Market",
              "PU 010 - Ife Central Central Primary School",
              "PU 011 - Ife Central Central Community Hall",
              "PU 012 - Ife Central Central Health Center",
              "PU 013 - Ife Central Central Mosque",
              "PU 014 - Ife Central Central Post Office",
              "PU 015 - Ife Central Central Police Station",
              "PU 016 - Ife Central Central Fire Station"
            ]
          }
        }
      },
      "ife-east": {
        name: "Ife East",
        wards: {
          "ife-east-central": {
            name: "Ife East Central",
            pollingUnits: [
              "PU 017 - Ife East Central Market",
              "PU 018 - Ife East Central Primary School",
              "PU 019 - Ife East Central Community Hall",
              "PU 020 - Ife East Central Health Center",
              "PU 021 - Ife East Central Mosque",
              "PU 022 - Ife East Central Post Office",
              "PU 023 - Ife East Central Police Station",
              "PU 024 - Ife East Central Fire Station"
            ]
          }
        }
      },
      "ife-north": {
        name: "Ife North",
        wards: {
          "ife-north-central": {
            name: "Ife North Central",
            pollingUnits: [
              "PU 025 - Ife North Central Market",
              "PU 026 - Ife North Central Primary School",
              "PU 027 - Ife North Central Community Hall",
              "PU 028 - Ife North Central Health Center",
              "PU 029 - Ife North Central Mosque",
              "PU 030 - Ife North Central Post Office",
              "PU 031 - Ife North Central Police Station",
              "PU 032 - Ife North Central Fire Station"
            ]
          }
        }
      },
      "ife-south": {
        name: "Ife South",
        wards: {
          "ife-south-central": {
            name: "Ife South Central",
            pollingUnits: [
              "PU 033 - Ife South Central Market",
              "PU 034 - Ife South Central Primary School",
              "PU 035 - Ife South Central Community Hall",
              "PU 036 - Ife South Central Health Center",
              "PU 037 - Ife South Central Mosque",
              "PU 038 - Ife South Central Post Office",
              "PU 039 - Ife South Central Police Station",
              "PU 040 - Ife South Central Fire Station"
            ]
          }
        }
      },
      "egbedore": {
        name: "Egbedore",
        wards: {
          "egbedore-central": {
            name: "Egbedore Central",
            pollingUnits: [
              "PU 041 - Egbedore Central Market",
              "PU 042 - Egbedore Central Primary School",
              "PU 043 - Egbedore Central Community Hall",
              "PU 044 - Egbedore Central Health Center",
              "PU 045 - Egbedore Central Mosque",
              "PU 046 - Egbedore Central Post Office",
              "PU 047 - Egbedore Central Police Station",
              "PU 048 - Egbedore Central Fire Station"
            ]
          }
        }
      },
      "ejigbo": {
        name: "Ejigbo",
        wards: {
          "ejigbo-central": {
            name: "Ejigbo Central",
            pollingUnits: [
              "PU 049 - Ejigbo Central Market",
              "PU 050 - Ejigbo Central Primary School",
              "PU 051 - Ejigbo Central Community Hall",
              "PU 052 - Ejigbo Central Health Center",
              "PU 053 - Ejigbo Central Mosque",
              "PU 054 - Ejigbo Central Post Office",
              "PU 055 - Ejigbo Central Police Station",
              "PU 056 - Ejigbo Central Fire Station"
            ]
          }
        }
      },
      "ayedaade": {
        name: "Ayedaade",
        wards: {
          "ayedaade-central": {
            name: "Ayedaade Central",
            pollingUnits: [
              "PU 057 - Ayedaade Central Market",
              "PU 058 - Ayedaade Central Primary School",
              "PU 059 - Ayedaade Central Community Hall",
              "PU 060 - Ayedaade Central Health Center",
              "PU 061 - Ayedaade Central Mosque",
              "PU 062 - Ayedaade Central Post Office",
              "PU 063 - Ayedaade Central Police Station",
              "PU 064 - Ayedaade Central Fire Station"
            ]
          }
        }
      },
      "irewole": {
        name: "Irewole",
        wards: {
          "irewole-central": {
            name: "Irewole Central",
            pollingUnits: [
              "PU 065 - Irewole Central Market",
              "PU 066 - Irewole Central Primary School",
              "PU 067 - Irewole Central Community Hall",
              "PU 068 - Irewole Central Health Center",
              "PU 069 - Irewole Central Mosque",
              "PU 070 - Irewole Central Post Office",
              "PU 071 - Irewole Central Police Station",
              "PU 072 - Irewole Central Fire Station"
            ]
          }
        }
      },
      "ola-oluwa": {
        name: "Ola Oluwa",
        wards: {
          "ola-oluwa-central": {
            name: "Ola Oluwa Central",
            pollingUnits: [
              "PU 073 - Ola Oluwa Central Market",
              "PU 074 - Ola Oluwa Central Primary School",
              "PU 075 - Ola Oluwa Central Community Hall",
              "PU 076 - Ola Oluwa Central Health Center",
              "PU 077 - Ola Oluwa Central Mosque",
              "PU 078 - Ola Oluwa Central Post Office",
              "PU 079 - Ola Oluwa Central Police Station",
              "PU 080 - Ola Oluwa Central Fire Station"
            ]
          }
        }
      },
      "boluwaduro": {
        name: "Boluwaduro",
        wards: {
          "boluwaduro-central": {
            name: "Boluwaduro Central",
            pollingUnits: [
              "PU 081 - Boluwaduro Central Market",
              "PU 082 - Boluwaduro Central Primary School",
              "PU 083 - Boluwaduro Central Community Hall",
              "PU 084 - Boluwaduro Central Health Center",
              "PU 085 - Boluwaduro Central Mosque",
              "PU 086 - Boluwaduro Central Post Office",
              "PU 087 - Boluwaduro Central Police Station",
              "PU 088 - Boluwaduro Central Fire Station"
            ]
          }
        }
      },
      "boripe": {
        name: "Boripe",
        wards: {
          "boripe-central": {
            name: "Boripe Central",
            pollingUnits: [
              "PU 089 - Boripe Central Market",
              "PU 090 - Boripe Central Primary School",
              "PU 091 - Boripe Central Community Hall",
              "PU 092 - Boripe Central Health Center",
              "PU 093 - Boripe Central Mosque",
              "PU 094 - Boripe Central Post Office",
              "PU 095 - Boripe Central Police Station",
              "PU 096 - Boripe Central Fire Station"
            ]
          }
        }
      },
      "atakumosa-east": {
        name: "Atakumosa East",
        wards: {
          "atakumosa-east-central": {
            name: "Atakumosa East Central",
            pollingUnits: [
              "PU 097 - Atakumosa East Central Market",
              "PU 098 - Atakumosa East Central Primary School",
              "PU 099 - Atakumosa East Central Community Hall",
              "PU 100 - Atakumosa East Central Health Center",
              "PU 101 - Atakumosa East Central Mosque",
              "PU 102 - Atakumosa East Central Post Office",
              "PU 103 - Atakumosa East Central Police Station",
              "PU 104 - Atakumosa East Central Fire Station"
            ]
          }
        }
      },
      "atakumosa-west": {
        name: "Atakumosa West",
        wards: {
          "atakumosa-west-central": {
            name: "Atakumosa West Central",
            pollingUnits: [
              "PU 105 - Atakumosa West Central Market",
              "PU 106 - Atakumosa West Central Primary School",
              "PU 107 - Atakumosa West Central Community Hall",
              "PU 108 - Atakumosa West Central Health Center",
              "PU 109 - Atakumosa West Central Mosque",
              "PU 110 - Atakumosa West Central Post Office",
              "PU 111 - Atakumosa West Central Police Station",
              "PU 112 - Atakumosa West Central Fire Station"
            ]
          }
        }
      },
      "obokun": {
        name: "Obokun",
        wards: {
          "obokun-central": {
            name: "Obokun Central",
            pollingUnits: [
              "PU 113 - Obokun Central Market",
              "PU 114 - Obokun Central Primary School",
              "PU 115 - Obokun Central Community Hall",
              "PU 116 - Obokun Central Health Center",
              "PU 117 - Obokun Central Mosque",
              "PU 118 - Obokun Central Post Office",
              "PU 119 - Obokun Central Police Station",
              "PU 120 - Obokun Central Fire Station"
            ]
          }
        }
      },
      "isokan": {
        name: "Isokan",
        wards: {
          "isokan-central": {
            name: "Isokan Central",
            pollingUnits: [
              "PU 121 - Isokan Central Market",
              "PU 122 - Isokan Central Primary School",
              "PU 123 - Isokan Central Community Hall",
              "PU 124 - Isokan Central Health Center",
              "PU 125 - Isokan Central Mosque",
              "PU 126 - Isokan Central Post Office",
              "PU 127 - Isokan Central Police Station",
              "PU 128 - Isokan Central Fire Station"
            ]
          }
        }
      },
      "ilesa-east": {
        name: "Ilesa East",
        wards: {
          "ilesa-east-central": {
            name: "Ilesa East Central",
            pollingUnits: [
              "PU 129 - Ilesa East Central Market",
              "PU 130 - Ilesa East Central Primary School",
              "PU 131 - Ilesa East Central Community Hall",
              "PU 132 - Ilesa East Central Health Center",
              "PU 133 - Ilesa East Central Mosque",
              "PU 134 - Ilesa East Central Post Office",
              "PU 135 - Ilesa East Central Police Station",
              "PU 136 - Ilesa East Central Fire Station"
            ]
          }
        }
      },
      "ilesa-west": {
        name: "Ilesa West",
        wards: {
          "ilesa-west-central": {
            name: "Ilesa West Central",
            pollingUnits: [
              "PU 137 - Ilesa West Central Market",
              "PU 138 - Ilesa West Central Primary School",
              "PU 139 - Ilesa West Central Community Hall",
              "PU 140 - Ilesa West Central Health Center",
              "PU 141 - Ilesa West Central Mosque",
              "PU 142 - Ilesa West Central Post Office",
              "PU 143 - Ilesa West Central Police Station",
              "PU 144 - Ilesa West Central Fire Station"
            ]
          }
        }
      }
    }
  },
  oyo: {
    name: "Oyo",
    lgas: {
      "ibadan-north": {
        name: "Ibadan North",
        wards: {
          "ibadan-north-central": {
            name: "Ibadan North Central",
            pollingUnits: [
              "PU 001 - Ibadan North Central Market",
              "PU 002 - Ibadan North Central Primary School",
              "PU 003 - Ibadan North Central Community Hall",
              "PU 004 - Ibadan North Central Health Center",
              "PU 005 - Ibadan North Central Mosque",
              "PU 006 - Ibadan North Central Post Office",
              "PU 007 - Ibadan North Central Police Station",
              "PU 008 - Ibadan North Central Fire Station"
            ]
          }
        }
      },
      "ibadan-north-east": {
        name: "Ibadan North East",
        wards: {
          "ibadan-north-east-central": {
            name: "Ibadan North East Central",
            pollingUnits: [
              "PU 009 - Ibadan North East Central Market",
              "PU 010 - Ibadan North East Central Primary School",
              "PU 011 - Ibadan North East Central Community Hall",
              "PU 012 - Ibadan North East Central Health Center",
              "PU 013 - Ibadan North East Central Mosque",
              "PU 014 - Ibadan North East Central Post Office",
              "PU 015 - Ibadan North East Central Police Station",
              "PU 016 - Ibadan North East Central Fire Station"
            ]
          }
        }
      },
      "ibadan-north-west": {
        name: "Ibadan North West",
        wards: {
          "ibadan-north-west-central": {
            name: "Ibadan North West Central",
            pollingUnits: [
              "PU 017 - Ibadan North West Central Market",
              "PU 018 - Ibadan North West Central Primary School",
              "PU 019 - Ibadan North West Central Community Hall",
              "PU 020 - Ibadan North West Central Health Center",
              "PU 021 - Ibadan North West Central Mosque",
              "PU 022 - Ibadan North West Central Post Office",
              "PU 023 - Ibadan North West Central Police Station",
              "PU 024 - Ibadan North West Central Fire Station"
            ]
          }
        }
      },
      "ibadan-south-east": {
        name: "Ibadan South East",
        wards: {
          "ibadan-south-east-central": {
            name: "Ibadan South East Central",
            pollingUnits: [
              "PU 025 - Ibadan South East Central Market",
              "PU 026 - Ibadan South East Central Primary School",
              "PU 027 - Ibadan South East Central Community Hall",
              "PU 028 - Ibadan South East Central Health Center",
              "PU 029 - Ibadan South East Central Mosque",
              "PU 030 - Ibadan South East Central Post Office",
              "PU 031 - Ibadan South East Central Police Station",
              "PU 032 - Ibadan South East Central Fire Station"
            ]
          }
        }
      },
      "ibadan-south-west": {
        name: "Ibadan South West",
        wards: {
          "ibadan-south-west-central": {
            name: "Ibadan South West Central",
            pollingUnits: [
              "PU 033 - Ibadan South West Central Market",
              "PU 034 - Ibadan South West Central Primary School",
              "PU 035 - Ibadan South West Central Community Hall",
              "PU 036 - Ibadan South West Central Health Center",
              "PU 037 - Ibadan South West Central Mosque",
              "PU 038 - Ibadan South West Central Post Office",
              "PU 039 - Ibadan South West Central Police Station",
              "PU 040 - Ibadan South West Central Fire Station"
            ]
          }
        }
      },
      "afijio": {
        name: "Afijio",
        wards: {
          "afijio-central": {
            name: "Afijio Central",
            pollingUnits: [
              "PU 041 - Afijio Central Market",
              "PU 042 - Afijio Central Primary School",
              "PU 043 - Afijio Central Community Hall",
              "PU 044 - Afijio Central Health Center",
              "PU 045 - Afijio Central Mosque",
              "PU 046 - Afijio Central Post Office",
              "PU 047 - Afijio Central Police Station",
              "PU 048 - Afijio Central Fire Station"
            ]
          }
        }
      },
      "akinyele": {
        name: "Akinyele",
        wards: {
          "akinyele-central": {
            name: "Akinyele Central",
            pollingUnits: [
              "PU 049 - Akinyele Central Market",
              "PU 050 - Akinyele Central Primary School",
              "PU 051 - Akinyele Central Community Hall",
              "PU 052 - Akinyele Central Health Center",
              "PU 053 - Akinyele Central Mosque",
              "PU 054 - Akinyele Central Post Office",
              "PU 055 - Akinyele Central Police Station",
              "PU 056 - Akinyele Central Fire Station"
            ]
          }
        }
      },
      "egbeda": {
        name: "Egbeda",
        wards: {
          "egbeda-central": {
            name: "Egbeda Central",
            pollingUnits: [
              "PU 057 - Egbeda Central Market",
              "PU 058 - Egbeda Central Primary School",
              "PU 059 - Egbeda Central Community Hall",
              "PU 060 - Egbeda Central Health Center",
              "PU 061 - Egbeda Central Mosque",
              "PU 062 - Egbeda Central Post Office",
              "PU 063 - Egbeda Central Police Station",
              "PU 064 - Egbeda Central Fire Station"
            ]
          }
        }
      },
      "lagelu": {
        name: "Lagelu",
        wards: {
          "lagelu-central": {
            name: "Lagelu Central",
            pollingUnits: [
              "PU 065 - Lagelu Central Market",
              "PU 066 - Lagelu Central Primary School",
              "PU 067 - Lagelu Central Community Hall",
              "PU 068 - Lagelu Central Health Center",
              "PU 069 - Lagelu Central Mosque",
              "PU 070 - Lagelu Central Post Office",
              "PU 071 - Lagelu Central Police Station",
              "PU 072 - Lagelu Central Fire Station"
            ]
          }
        }
      },
      "oyo-east": {
        name: "Oyo East",
        wards: {
          "oyo-east-central": {
            name: "Oyo East Central",
            pollingUnits: [
              "PU 073 - Oyo East Central Market",
              "PU 074 - Oyo East Central Primary School",
              "PU 075 - Oyo East Central Community Hall",
              "PU 076 - Oyo East Central Health Center",
              "PU 077 - Oyo East Central Mosque",
              "PU 078 - Oyo East Central Post Office",
              "PU 079 - Oyo East Central Police Station",
              "PU 080 - Oyo East Central Fire Station"
            ]
          }
        }
      },
      "oyo-west": {
        name: "Oyo West",
        wards: {
          "oyo-west-central": {
            name: "Oyo West Central",
            pollingUnits: [
              "PU 081 - Oyo West Central Market",
              "PU 082 - Oyo West Central Primary School",
              "PU 083 - Oyo West Central Community Hall",
              "PU 084 - Oyo West Central Health Center",
              "PU 085 - Oyo West Central Mosque",
              "PU 086 - Oyo West Central Post Office",
              "PU 087 - Oyo West Central Police Station",
              "PU 088 - Oyo West Central Fire Station"
            ]
          }
        }
      },
      "atiba": {
        name: "Atiba",
        wards: {
          "atiba-central": {
            name: "Atiba Central",
            pollingUnits: [
              "PU 089 - Atiba Central Market",
              "PU 090 - Atiba Central Primary School",
              "PU 091 - Atiba Central Community Hall",
              "PU 092 - Atiba Central Health Center",
              "PU 093 - Atiba Central Mosque",
              "PU 094 - Atiba Central Post Office",
              "PU 095 - Atiba Central Police Station",
              "PU 096 - Atiba Central Fire Station"
            ]
          }
        }
      },
      "saki-east": {
        name: "Saki East",
        wards: {
          "saki-east-central": {
            name: "Saki East Central",
            pollingUnits: [
              "PU 097 - Saki East Central Market",
              "PU 098 - Saki East Central Primary School",
              "PU 099 - Saki East Central Community Hall",
              "PU 100 - Saki East Central Health Center",
              "PU 101 - Saki East Central Mosque",
              "PU 102 - Saki East Central Post Office",
              "PU 103 - Saki East Central Police Station",
              "PU 104 - Saki East Central Fire Station"
            ]
          }
        }
      },
      "saki-west": {
        name: "Saki West",
        wards: {
          "saki-west-central": {
            name: "Saki West Central",
            pollingUnits: [
              "PU 105 - Saki West Central Market",
              "PU 106 - Saki West Central Primary School",
              "PU 107 - Saki West Central Community Hall",
              "PU 108 - Saki West Central Health Center",
              "PU 109 - Saki West Central Mosque",
              "PU 110 - Saki West Central Post Office",
              "PU 111 - Saki West Central Police Station",
              "PU 112 - Saki West Central Fire Station"
            ]
          }
        }
      },
      "itseiwaju": {
        name: "Itseiwaju",
        wards: {
          "itseiwaju-central": {
            name: "Itseiwaju Central",
            pollingUnits: [
              "PU 113 - Itseiwaju Central Market",
              "PU 114 - Itseiwaju Central Primary School",
              "PU 115 - Itseiwaju Central Community Hall",
              "PU 116 - Itseiwaju Central Health Center",
              "PU 117 - Itseiwaju Central Mosque",
              "PU 118 - Itseiwaju Central Post Office",
              "PU 119 - Itseiwaju Central Police Station",
              "PU 120 - Itseiwaju Central Fire Station"
            ]
          }
        }
      },
      "iwajowa": {
        name: "Iwajowa",
        wards: {
          "iwajowa-central": {
            name: "Iwajowa Central",
            pollingUnits: [
              "PU 121 - Iwajowa Central Market",
              "PU 122 - Iwajowa Central Primary School",
              "PU 123 - Iwajowa Central Community Hall",
              "PU 124 - Iwajowa Central Health Center",
              "PU 125 - Iwajowa Central Mosque",
              "PU 126 - Iwajowa Central Post Office",
              "PU 127 - Iwajowa Central Police Station",
              "PU 128 - Iwajowa Central Fire Station"
            ]
          }
        }
      },
      "kajola": {
        name: "Kajola",
        wards: {
          "kajola-central": {
            name: "Kajola Central",
            pollingUnits: [
              "PU 129 - Kajola Central Market",
              "PU 130 - Kajola Central Primary School",
              "PU 131 - Kajola Central Community Hall",
              "PU 132 - Kajola Central Health Center",
              "PU 133 - Kajola Central Mosque",
              "PU 134 - Kajola Central Post Office",
              "PU 135 - Kajola Central Police Station",
              "PU 136 - Kajola Central Fire Station"
            ]
          }
        }
      },
      "ogbomosho-north": {
        name: "Ogbomosho North",
        wards: {
          "ogbomosho-north-central": {
            name: "Ogbomosho North Central",
            pollingUnits: [
              "PU 137 - Ogbomosho North Central Market",
              "PU 138 - Ogbomosho North Central Primary School",
              "PU 139 - Ogbomosho North Central Community Hall",
              "PU 140 - Ogbomosho North Central Health Center",
              "PU 141 - Ogbomosho North Central Mosque",
              "PU 142 - Ogbomosho North Central Post Office",
              "PU 143 - Ogbomosho North Central Police Station",
              "PU 144 - Ogbomosho North Central Fire Station"
            ]
          }
        }
      },
      "ogbomosho-south": {
        name: "Ogbomosho South",
        wards: {
          "ogbomosho-south-central": {
            name: "Ogbomosho South Central",
            pollingUnits: [
              "PU 145 - Ogbomosho South Central Market",
              "PU 146 - Ogbomosho South Central Primary School",
              "PU 147 - Ogbomosho South Central Community Hall",
              "PU 148 - Ogbomosho South Central Health Center",
              "PU 149 - Ogbomosho South Central Mosque",
              "PU 150 - Ogbomosho South Central Post Office",
              "PU 151 - Ogbomosho South Central Police Station",
              "PU 152 - Ogbomosho South Central Fire Station"
            ]
          }
        }
      }
    }
  },
  plateau: {
    name: "Plateau",
    lgas: {
      "jos-north": {
        name: "Jos North",
        wards: {
          "jos-north-central": {
            name: "Jos North Central",
            pollingUnits: [
              "PU 001 - Jos North Central Market",
              "PU 002 - Jos North Central Primary School",
              "PU 003 - Jos North Central Community Hall",
              "PU 004 - Jos North Central Health Center",
              "PU 005 - Jos North Central Mosque",
              "PU 006 - Jos North Central Post Office",
              "PU 007 - Jos North Central Police Station",
              "PU 008 - Jos North Central Fire Station"
            ]
          }
        }
      },
      "jos-south": {
        name: "Jos South",
        wards: {
          "jos-south-central": {
            name: "Jos South Central",
            pollingUnits: [
              "PU 009 - Jos South Central Market",
              "PU 010 - Jos South Central Primary School",
              "PU 011 - Jos South Central Community Hall",
              "PU 012 - Jos South Central Health Center",
              "PU 013 - Jos South Central Mosque",
              "PU 014 - Jos South Central Post Office",
              "PU 015 - Jos South Central Police Station",
              "PU 016 - Jos South Central Fire Station"
            ]
          }
        }
      },
      "jos-east": {
        name: "Jos East",
        wards: {
          "jos-east-central": {
            name: "Jos East Central",
            pollingUnits: [
              "PU 017 - Jos East Central Market",
              "PU 018 - Jos East Central Primary School",
              "PU 019 - Jos East Central Community Hall",
              "PU 020 - Jos East Central Health Center",
              "PU 021 - Jos East Central Mosque",
              "PU 022 - Jos East Central Post Office",
              "PU 023 - Jos East Central Police Station",
              "PU 024 - Jos East Central Fire Station"
            ]
          }
        }
      },
      "kanam": {
        name: "Kanam",
        wards: {
          "kanam-central": {
            name: "Kanam Central",
            pollingUnits: [
              "PU 025 - Kanam Central Market",
              "PU 026 - Kanam Central Primary School",
              "PU 027 - Kanam Central Community Hall",
              "PU 028 - Kanam Central Health Center",
              "PU 029 - Kanam Central Mosque",
              "PU 030 - Kanam Central Post Office",
              "PU 031 - Kanam Central Police Station",
              "PU 032 - Kanam Central Fire Station"
            ]
          }
        }
      },
      "kanke": {
        name: "Kanke",
        wards: {
          "kanke-central": {
            name: "Kanke Central",
            pollingUnits: [
              "PU 033 - Kanke Central Market",
              "PU 034 - Kanke Central Primary School",
              "PU 035 - Kanke Central Community Hall",
              "PU 036 - Kanke Central Health Center",
              "PU 037 - Kanke Central Mosque",
              "PU 038 - Kanke Central Post Office",
              "PU 039 - Kanke Central Police Station",
              "PU 040 - Kanke Central Fire Station"
            ]
          }
        }
      },
      "langtang-north": {
        name: "Langtang North",
        wards: {
          "langtang-north-central": {
            name: "Langtang North Central",
            pollingUnits: [
              "PU 041 - Langtang North Central Market",
              "PU 042 - Langtang North Central Primary School",
              "PU 043 - Langtang North Central Community Hall",
              "PU 044 - Langtang North Central Health Center",
              "PU 045 - Langtang North Central Mosque",
              "PU 046 - Langtang North Central Post Office",
              "PU 047 - Langtang North Central Police Station",
              "PU 048 - Langtang North Central Fire Station"
            ]
          }
        }
      },
      "langtang-south": {
        name: "Langtang South",
        wards: {
          "langtang-south-central": {
            name: "Langtang South Central",
            pollingUnits: [
              "PU 049 - Langtang South Central Market",
              "PU 050 - Langtang South Central Primary School",
              "PU 051 - Langtang South Central Community Hall",
              "PU 052 - Langtang South Central Health Center",
              "PU 053 - Langtang South Central Mosque",
              "PU 054 - Langtang South Central Post Office",
              "PU 055 - Langtang South Central Police Station",
              "PU 056 - Langtang South Central Fire Station"
            ]
          }
        }
      },
      "mangu": {
        name: "Mangu",
        wards: {
          "mangu-central": {
            name: "Mangu Central",
            pollingUnits: [
              "PU 057 - Mangu Central Market",
              "PU 058 - Mangu Central Primary School",
              "PU 059 - Mangu Central Community Hall",
              "PU 060 - Mangu Central Health Center",
              "PU 061 - Mangu Central Mosque",
              "PU 062 - Mangu Central Post Office",
              "PU 063 - Mangu Central Police Station",
              "PU 064 - Mangu Central Fire Station"
            ]
          }
        }
      },
      "mikang": {
        name: "Mikang",
        wards: {
          "mikang-central": {
            name: "Mikang Central",
            pollingUnits: [
              "PU 065 - Mikang Central Market",
              "PU 066 - Mikang Central Primary School",
              "PU 067 - Mikang Central Community Hall",
              "PU 068 - Mikang Central Health Center",
              "PU 069 - Mikang Central Mosque",
              "PU 070 - Mikang Central Post Office",
              "PU 071 - Mikang Central Police Station",
              "PU 072 - Mikang Central Fire Station"
            ]
          }
        }
      },
      "pankshin": {
        name: "Pankshin",
        wards: {
          "pankshin-central": {
            name: "Pankshin Central",
            pollingUnits: [
              "PU 073 - Pankshin Central Market",
              "PU 074 - Pankshin Central Primary School",
              "PU 075 - Pankshin Central Community Hall",
              "PU 076 - Pankshin Central Health Center",
              "PU 077 - Pankshin Central Mosque",
              "PU 078 - Pankshin Central Post Office",
              "PU 079 - Pankshin Central Police Station",
              "PU 080 - Pankshin Central Fire Station"
            ]
          }
        }
      },
      "quan-pan": {
        name: "Quan Pan",
        wards: {
          "quan-pan-central": {
            name: "Quan Pan Central",
            pollingUnits: [
              "PU 081 - Quan Pan Central Market",
              "PU 082 - Quan Pan Central Primary School",
              "PU 083 - Quan Pan Central Community Hall",
              "PU 084 - Quan Pan Central Health Center",
              "PU 085 - Quan Pan Central Mosque",
              "PU 086 - Quan Pan Central Post Office",
              "PU 087 - Quan Pan Central Police Station",
              "PU 088 - Quan Pan Central Fire Station"
            ]
          }
        }
      },
      "ryom": {
        name: "Ryom",
        wards: {
          "ryom-central": {
            name: "Ryom Central",
            pollingUnits: [
              "PU 089 - Ryom Central Market",
              "PU 090 - Ryom Central Primary School",
              "PU 091 - Ryom Central Community Hall",
              "PU 092 - Ryom Central Health Center",
              "PU 093 - Ryom Central Mosque",
              "PU 094 - Ryom Central Post Office",
              "PU 095 - Ryom Central Police Station",
              "PU 096 - Ryom Central Fire Station"
            ]
          }
        }
      },
      "shendam": {
        name: "Shendam",
        wards: {
          "shendam-central": {
            name: "Shendam Central",
            pollingUnits: [
              "PU 097 - Shendam Central Market",
              "PU 098 - Shendam Central Primary School",
              "PU 099 - Shendam Central Community Hall",
              "PU 100 - Shendam Central Health Center",
              "PU 101 - Shendam Central Mosque",
              "PU 102 - Shendam Central Post Office",
              "PU 103 - Shendam Central Police Station",
              "PU 104 - Shendam Central Fire Station"
            ]
          }
        }
      },
      "wase": {
        name: "Wase",
        wards: {
          "wase-central": {
            name: "Wase Central",
            pollingUnits: [
              "PU 105 - Wase Central Market",
              "PU 106 - Wase Central Primary School",
              "PU 107 - Wase Central Community Hall",
              "PU 108 - Wase Central Health Center",
              "PU 109 - Wase Central Mosque",
              "PU 110 - Wase Central Post Office",
              "PU 111 - Wase Central Police Station",
              "PU 112 - Wase Central Fire Station"
            ]
          }
        }
      }
    }
  },
  rivers: {
    name: "Rivers",
    lgas: {
      "port-harcourt": {
        name: "Port Harcourt",
        wards: {
          "diobu": {
            name: "Diobu",
            pollingUnits: [
              "PU 001 - Diobu Central Market",
              "PU 002 - Diobu Primary School",
              "PU 003 - Diobu Community Hall",
              "PU 004 - Diobu Health Center",
              "PU 005 - Diobu Central Mosque",
              "PU 006 - Diobu Post Office",
              "PU 007 - Diobu Police Station",
              "PU 008 - Diobu Fire Station"
            ]
          },
          "old-gra": {
            name: "Old GRA",
            pollingUnits: [
              "PU 009 - Old GRA Primary School",
              "PU 010 - Old GRA Market",
              "PU 011 - Old GRA Community Hall",
              "PU 012 - Old GRA Health Center",
              "PU 013 - Old GRA Central Mosque",
              "PU 014 - Old GRA Post Office",
              "PU 015 - Old GRA Police Station",
              "PU 016 - Old GRA Fire Station"
            ]
          },
          "new-gra": {
            name: "New GRA",
            pollingUnits: [
              "PU 017 - New GRA Primary School",
              "PU 018 - New GRA Market",
              "PU 019 - New GRA Community Hall",
              "PU 020 - New GRA Health Center",
              "PU 021 - New GRA Central Mosque",
              "PU 022 - New GRA Post Office",
              "PU 023 - New GRA Police Station",
              "PU 024 - New GRA Fire Station"
            ]
          }
        }
      },
      "obio-akpor": {
        name: "Obio/Akpor",
        wards: {
          "rumueme": {
            name: "Rumueme",
            pollingUnits: [
              "PU 025 - Rumueme Primary School",
              "PU 026 - Rumueme Market",
              "PU 027 - Rumueme Community Hall",
              "PU 028 - Rumueme Health Center",
              "PU 029 - Rumueme Central Mosque",
              "PU 030 - Rumueme Post Office",
              "PU 031 - Rumueme Police Station",
              "PU 032 - Rumueme Fire Station"
            ]
          },
          "rumuigbo": {
            name: "Rumuigbo",
            pollingUnits: [
              "PU 033 - Rumuigbo Primary School",
              "PU 034 - Rumuigbo Market",
              "PU 035 - Rumuigbo Community Hall",
              "PU 036 - Rumuigbo Health Center",
              "PU 037 - Rumuigbo Central Mosque",
              "PU 038 - Rumuigbo Post Office",
              "PU 039 - Rumuigbo Police Station",
              "PU 040 - Rumuigbo Fire Station"
            ]
          }
        }
      }
    }
  },
  sokoto: {
    name: "Sokoto",
    lgas: {
      "sokoto-north": {
        name: "Sokoto North",
        wards: {
          "sokoto-north-central": {
            name: "Sokoto North Central",
            pollingUnits: [
              "PU 001 - Sokoto North Central Market",
              "PU 002 - Sokoto North Central Primary School",
              "PU 003 - Sokoto North Central Community Hall",
              "PU 004 - Sokoto North Central Health Center",
              "PU 005 - Sokoto North Central Mosque",
              "PU 006 - Sokoto North Central Post Office",
              "PU 007 - Sokoto North Central Police Station",
              "PU 008 - Sokoto North Central Fire Station"
            ]
          }
        }
      },
      "sokoto-south": {
        name: "Sokoto South",
        wards: {
          "sokoto-south-central": {
            name: "Sokoto South Central",
            pollingUnits: [
              "PU 009 - Sokoto South Central Market",
              "PU 010 - Sokoto South Central Primary School",
              "PU 011 - Sokoto South Central Community Hall",
              "PU 012 - Sokoto South Central Health Center",
              "PU 013 - Sokoto South Central Mosque",
              "PU 014 - Sokoto South Central Post Office",
              "PU 015 - Sokoto South Central Police Station",
              "PU 016 - Sokoto South Central Fire Station"
            ]
          }
        }
      },
      "binji": {
        name: "Binji",
        wards: {
          "binji-central": {
            name: "Binji Central",
            pollingUnits: [
              "PU 017 - Binji Central Market",
              "PU 018 - Binji Central Primary School",
              "PU 019 - Binji Central Community Hall",
              "PU 020 - Binji Central Health Center",
              "PU 021 - Binji Central Mosque",
              "PU 022 - Binji Central Post Office",
              "PU 023 - Binji Central Police Station",
              "PU 024 - Binji Central Fire Station"
            ]
          }
        }
      },
      "bodinga": {
        name: "Bodinga",
        wards: {
          "bodinga-central": {
            name: "Bodinga Central",
            pollingUnits: [
              "PU 025 - Bodinga Central Market",
              "PU 026 - Bodinga Central Primary School",
              "PU 027 - Bodinga Central Community Hall",
              "PU 028 - Bodinga Central Health Center",
              "PU 029 - Bodinga Central Mosque",
              "PU 030 - Bodinga Central Post Office",
              "PU 031 - Bodinga Central Police Station",
              "PU 032 - Bodinga Central Fire Station"
            ]
          }
        }
      },
      "dange-shuni": {
        name: "Dange Shuni",
        wards: {
          "dange-shuni-central": {
            name: "Dange Shuni Central",
            pollingUnits: [
              "PU 033 - Dange Shuni Central Market",
              "PU 034 - Dange Shuni Central Primary School",
              "PU 035 - Dange Shuni Central Community Hall",
              "PU 036 - Dange Shuni Central Health Center",
              "PU 037 - Dange Shuni Central Mosque",
              "PU 038 - Dange Shuni Central Post Office",
              "PU 039 - Dange Shuni Central Police Station",
              "PU 040 - Dange Shuni Central Fire Station"
            ]
          }
        }
      },
      "gada": {
        name: "Gada",
        wards: {
          "gada-central": {
            name: "Gada Central",
            pollingUnits: [
              "PU 041 - Gada Central Market",
              "PU 042 - Gada Central Primary School",
              "PU 043 - Gada Central Community Hall",
              "PU 044 - Gada Central Health Center",
              "PU 045 - Gada Central Mosque",
              "PU 046 - Gada Central Post Office",
              "PU 047 - Gada Central Police Station",
              "PU 048 - Gada Central Fire Station"
            ]
          }
        }
      },
      "goronyo": {
        name: "Goronyo",
        wards: {
          "goronyo-central": {
            name: "Goronyo Central",
            pollingUnits: [
              "PU 049 - Goronyo Central Market",
              "PU 050 - Goronyo Central Primary School",
              "PU 051 - Goronyo Central Community Hall",
              "PU 052 - Goronyo Central Health Center",
              "PU 053 - Goronyo Central Mosque",
              "PU 054 - Goronyo Central Post Office",
              "PU 055 - Goronyo Central Police Station",
              "PU 056 - Goronyo Central Fire Station"
            ]
          }
        }
      },
      "gudu": {
        name: "Gudu",
        wards: {
          "gudu-central": {
            name: "Gudu Central",
            pollingUnits: [
              "PU 057 - Gudu Central Market",
              "PU 058 - Gudu Central Primary School",
              "PU 059 - Gudu Central Community Hall",
              "PU 060 - Gudu Central Health Center",
              "PU 061 - Gudu Central Mosque",
              "PU 062 - Gudu Central Post Office",
              "PU 063 - Gudu Central Police Station",
              "PU 064 - Gudu Central Fire Station"
            ]
          }
        }
      },
      "gwadabawa": {
        name: "Gwadabawa",
        wards: {
          "gwadabawa-central": {
            name: "Gwadabawa Central",
            pollingUnits: [
              "PU 065 - Gwadabawa Central Market",
              "PU 066 - Gwadabawa Central Primary School",
              "PU 067 - Gwadabawa Central Community Hall",
              "PU 068 - Gwadabawa Central Health Center",
              "PU 069 - Gwadabawa Central Mosque",
              "PU 070 - Gwadabawa Central Post Office",
              "PU 071 - Gwadabawa Central Police Station",
              "PU 072 - Gwadabawa Central Fire Station"
            ]
          }
        }
      },
      "ilbira": {
        name: "Ilbira",
        wards: {
          "ilbira-central": {
            name: "Ilbira Central",
            pollingUnits: [
              "PU 073 - Ilbira Central Market",
              "PU 074 - Ilbira Central Primary School",
              "PU 075 - Ilbira Central Community Hall",
              "PU 076 - Ilbira Central Health Center",
              "PU 077 - Ilbira Central Mosque",
              "PU 078 - Ilbira Central Post Office",
              "PU 079 - Ilbira Central Police Station",
              "PU 080 - Ilbira Central Fire Station"
            ]
          }
        }
      },
      "isa": {
        name: "Isa",
        wards: {
          "isa-central": {
            name: "Isa Central",
            pollingUnits: [
              "PU 081 - Isa Central Market",
              "PU 082 - Isa Central Primary School",
              "PU 083 - Isa Central Community Hall",
              "PU 084 - Isa Central Health Center",
              "PU 085 - Isa Central Mosque",
              "PU 086 - Isa Central Post Office",
              "PU 087 - Isa Central Police Station",
              "PU 088 - Isa Central Fire Station"
            ]
          }
        }
      },
      "kebbe": {
        name: "Kebbe",
        wards: {
          "kebbe-central": {
            name: "Kebbe Central",
            pollingUnits: [
              "PU 089 - Kebbe Central Market",
              "PU 090 - Kebbe Central Primary School",
              "PU 091 - Kebbe Central Community Hall",
              "PU 092 - Kebbe Central Health Center",
              "PU 093 - Kebbe Central Mosque",
              "PU 094 - Kebbe Central Post Office",
              "PU 095 - Kebbe Central Police Station",
              "PU 096 - Kebbe Central Fire Station"
            ]
          }
        }
      },
      "kwara": {
        name: "Kwara",
        wards: {
          "kwara-central": {
            name: "Kwara Central",
            pollingUnits: [
              "PU 097 - Kwara Central Market",
              "PU 098 - Kwara Central Primary School",
              "PU 099 - Kwara Central Community Hall",
              "PU 100 - Kwara Central Health Center",
              "PU 101 - Kwara Central Mosque",
              "PU 102 - Kwara Central Post Office",
              "PU 103 - Kwara Central Police Station",
              "PU 104 - Kwara Central Fire Station"
            ]
          }
        }
      },
      "rabah": {
        name: "Rabah",
        wards: {
          "rabah-central": {
            name: "Rabah Central",
            pollingUnits: [
              "PU 105 - Rabah Central Market",
              "PU 106 - Rabah Central Primary School",
              "PU 107 - Rabah Central Community Hall",
              "PU 108 - Rabah Central Health Center",
              "PU 109 - Rabah Central Mosque",
              "PU 110 - Rabah Central Post Office",
              "PU 111 - Rabah Central Police Station",
              "PU 112 - Rabah Central Fire Station"
            ]
          }
        }
      },
      "sabon-birni": {
        name: "Sabon Birni",
        wards: {
          "sabon-birni-central": {
            name: "Sabon Birni Central",
            pollingUnits: [
              "PU 113 - Sabon Birni Central Market",
              "PU 114 - Sabon Birni Central Primary School",
              "PU 115 - Sabon Birni Central Community Hall",
              "PU 116 - Sabon Birni Central Health Center",
              "PU 117 - Sabon Birni Central Mosque",
              "PU 118 - Sabon Birni Central Post Office",
              "PU 119 - Sabon Birni Central Police Station",
              "PU 120 - Sabon Birni Central Fire Station"
            ]
          }
        }
      },
      "shagari": {
        name: "Shagari",
        wards: {
          "shagari-central": {
            name: "Shagari Central",
            pollingUnits: [
              "PU 121 - Shagari Central Market",
              "PU 122 - Shagari Central Primary School",
              "PU 123 - Shagari Central Community Hall",
              "PU 124 - Shagari Central Health Center",
              "PU 125 - Shagari Central Mosque",
              "PU 126 - Shagari Central Post Office",
              "PU 127 - Shagari Central Police Station",
              "PU 128 - Shagari Central Fire Station"
            ]
          }
        }
      },
      "silame": {
        name: "Silame",
        wards: {
          "silame-central": {
            name: "Silame Central",
            pollingUnits: [
              "PU 129 - Silame Central Market",
              "PU 130 - Silame Central Primary School",
              "PU 131 - Silame Central Community Hall",
              "PU 132 - Silame Central Health Center",
              "PU 133 - Silame Central Mosque",
              "PU 134 - Silame Central Post Office",
              "PU 135 - Silame Central Police Station",
              "PU 136 - Silame Central Fire Station"
            ]
          }
        }
      },
      "tambuwal": {
        name: "Tambuwal",
        wards: {
          "tambuwal-central": {
            name: "Tambuwal Central",
            pollingUnits: [
              "PU 137 - Tambuwal Central Market",
              "PU 138 - Tambuwal Central Primary School",
              "PU 139 - Tambuwal Central Community Hall",
              "PU 140 - Tambuwal Central Health Center",
              "PU 141 - Tambuwal Central Mosque",
              "PU 142 - Tambuwal Central Post Office",
              "PU 143 - Tambuwal Central Police Station",
              "PU 144 - Tambuwal Central Fire Station"
            ]
          }
        }
      },
      "tangaza": {
        name: "Tangaza",
        wards: {
          "tangaza-central": {
            name: "Tangaza Central",
            pollingUnits: [
              "PU 145 - Tangaza Central Market",
              "PU 146 - Tangaza Central Primary School",
              "PU 147 - Tangaza Central Community Hall",
              "PU 148 - Tangaza Central Health Center",
              "PU 149 - Tangaza Central Mosque",
              "PU 150 - Tangaza Central Post Office",
              "PU 151 - Tangaza Central Police Station",
              "PU 152 - Tangaza Central Fire Station"
            ]
          }
        }
      },
      "tureta": {
        name: "Tureta",
        wards: {
          "tureta-central": {
            name: "Tureta Central",
            pollingUnits: [
              "PU 153 - Tureta Central Market",
              "PU 154 - Tureta Central Primary School",
              "PU 155 - Tureta Central Community Hall",
              "PU 156 - Tureta Central Health Center",
              "PU 157 - Tureta Central Mosque",
              "PU 158 - Tureta Central Post Office",
              "PU 159 - Tureta Central Police Station",
              "PU 160 - Tureta Central Fire Station"
            ]
          }
        }
      },
      "wamako": {
        name: "Wamako",
        wards: {
          "wamako-central": {
            name: "Wamako Central",
            pollingUnits: [
              "PU 161 - Wamako Central Market",
              "PU 162 - Wamako Central Primary School",
              "PU 163 - Wamako Central Community Hall",
              "PU 164 - Wamako Central Health Center",
              "PU 165 - Wamako Central Mosque",
              "PU 166 - Wamako Central Post Office",
              "PU 167 - Wamako Central Police Station",
              "PU 168 - Wamako Central Fire Station"
            ]
          }
        }
      }
    }
  },
  taraba: {
    name: "Taraba",
    lgas: {
      "jalingo": {
        name: "Jalingo",
        wards: {
          "jalingo-central": {
            name: "Jalingo Central",
            pollingUnits: [
              "PU 001 - Jalingo Central Market",
              "PU 002 - Jalingo Central Primary School",
              "PU 003 - Jalingo Central Community Hall",
              "PU 004 - Jalingo Central Health Center",
              "PU 005 - Jalingo Central Mosque",
              "PU 006 - Jalingo Central Post Office",
              "PU 007 - Jalingo Central Police Station",
              "PU 008 - Jalingo Central Fire Station"
            ]
          }
        }
      },
      "ardo-kola": {
        name: "Ardo Kola",
        wards: {
          "ardo-kola-central": {
            name: "Ardo Kola Central",
            pollingUnits: [
              "PU 009 - Ardo Kola Central Market",
              "PU 010 - Ardo Kola Central Primary School",
              "PU 011 - Ardo Kola Central Community Hall",
              "PU 012 - Ardo Kola Central Health Center",
              "PU 013 - Ardo Kola Central Mosque",
              "PU 014 - Ardo Kola Central Post Office",
              "PU 015 - Ardo Kola Central Police Station",
              "PU 016 - Ardo Kola Central Fire Station"
            ]
          }
        }
      },
      "bali": {
        name: "Bali",
        wards: {
          "bali-central": {
            name: "Bali Central",
            pollingUnits: [
              "PU 017 - Bali Central Market",
              "PU 018 - Bali Central Primary School",
              "PU 019 - Bali Central Community Hall",
              "PU 020 - Bali Central Health Center",
              "PU 021 - Bali Central Mosque",
              "PU 022 - Bali Central Post Office",
              "PU 023 - Bali Central Police Station",
              "PU 024 - Bali Central Fire Station"
            ]
          }
        }
      },
      "donga": {
        name: "Donga",
        wards: {
          "donga-central": {
            name: "Donga Central",
            pollingUnits: [
              "PU 025 - Donga Central Market",
              "PU 026 - Donga Central Primary School",
              "PU 027 - Donga Central Community Hall",
              "PU 028 - Donga Central Health Center",
              "PU 029 - Donga Central Mosque",
              "PU 030 - Donga Central Post Office",
              "PU 031 - Donga Central Police Station",
              "PU 032 - Donga Central Fire Station"
            ]
          }
        }
      },
      "gashaka": {
        name: "Gashaka",
        wards: {
          "gashaka-central": {
            name: "Gashaka Central",
            pollingUnits: [
              "PU 033 - Gashaka Central Market",
              "PU 034 - Gashaka Central Primary School",
              "PU 035 - Gashaka Central Community Hall",
              "PU 036 - Gashaka Central Health Center",
              "PU 037 - Gashaka Central Mosque",
              "PU 038 - Gashaka Central Post Office",
              "PU 039 - Gashaka Central Police Station",
              "PU 040 - Gashaka Central Fire Station"
            ]
          }
        }
      },
      "gassol": {
        name: "Gassol",
        wards: {
          "gassol-central": {
            name: "Gassol Central",
            pollingUnits: [
              "PU 041 - Gassol Central Market",
              "PU 042 - Gassol Central Primary School",
              "PU 043 - Gassol Central Community Hall",
              "PU 044 - Gassol Central Health Center",
              "PU 045 - Gassol Central Mosque",
              "PU 046 - Gassol Central Post Office",
              "PU 047 - Gassol Central Police Station",
              "PU 048 - Gassol Central Fire Station"
            ]
          }
        }
      },
      "ibi": {
        name: "Ibi",
        wards: {
          "ibi-central": {
            name: "Ibi Central",
            pollingUnits: [
              "PU 049 - Ibi Central Market",
              "PU 050 - Ibi Central Primary School",
              "PU 051 - Ibi Central Community Hall",
              "PU 052 - Ibi Central Health Center",
              "PU 053 - Ibi Central Mosque",
              "PU 054 - Ibi Central Post Office",
              "PU 055 - Ibi Central Police Station",
              "PU 056 - Ibi Central Fire Station"
            ]
          }
        }
      },
      "karim-lamido": {
        name: "Karim Lamido",
        wards: {
          "karim-lamido-central": {
            name: "Karim Lamido Central",
            pollingUnits: [
              "PU 057 - Karim Lamido Central Market",
              "PU 058 - Karim Lamido Central Primary School",
              "PU 059 - Karim Lamido Central Community Hall",
              "PU 060 - Karim Lamido Central Health Center",
              "PU 061 - Karim Lamido Central Mosque",
              "PU 062 - Karim Lamido Central Post Office",
              "PU 063 - Karim Lamido Central Police Station",
              "PU 064 - Karim Lamido Central Fire Station"
            ]
          }
        }
      },
      "kurmi": {
        name: "Kurmi",
        wards: {
          "kurmi-central": {
            name: "Kurmi Central",
            pollingUnits: [
              "PU 065 - Kurmi Central Market",
              "PU 066 - Kurmi Central Primary School",
              "PU 067 - Kurmi Central Community Hall",
              "PU 068 - Kurmi Central Health Center",
              "PU 069 - Kurmi Central Mosque",
              "PU 070 - Kurmi Central Post Office",
              "PU 071 - Kurmi Central Police Station",
              "PU 072 - Kurmi Central Fire Station"
            ]
          }
        }
      },
      "lau": {
        name: "Lau",
        wards: {
          "lau-central": {
            name: "Lau Central",
            pollingUnits: [
              "PU 073 - Lau Central Market",
              "PU 074 - Lau Central Primary School",
              "PU 075 - Lau Central Community Hall",
              "PU 076 - Lau Central Health Center",
              "PU 077 - Lau Central Mosque",
              "PU 078 - Lau Central Post Office",
              "PU 079 - Lau Central Police Station",
              "PU 080 - Lau Central Fire Station"
            ]
          }
        }
      },
      "sardauna": {
        name: "Sardauna",
        wards: {
          "sardauna-central": {
            name: "Sardauna Central",
            pollingUnits: [
              "PU 081 - Sardauna Central Market",
              "PU 082 - Sardauna Central Primary School",
              "PU 083 - Sardauna Central Community Hall",
              "PU 084 - Sardauna Central Health Center",
              "PU 085 - Sardauna Central Mosque",
              "PU 086 - Sardauna Central Post Office",
              "PU 087 - Sardauna Central Police Station",
              "PU 088 - Sardauna Central Fire Station"
            ]
          }
        }
      },
      "takum": {
        name: "Takum",
        wards: {
          "takum-central": {
            name: "Takum Central",
            pollingUnits: [
              "PU 089 - Takum Central Market",
              "PU 090 - Takum Central Primary School",
              "PU 091 - Takum Central Community Hall",
              "PU 092 - Takum Central Health Center",
              "PU 093 - Takum Central Mosque",
              "PU 094 - Takum Central Post Office",
              "PU 095 - Takum Central Police Station",
              "PU 096 - Takum Central Fire Station"
            ]
          }
        }
      },
      "ussa": {
        name: "Ussa",
        wards: {
          "ussa-central": {
            name: "Ussa Central",
            pollingUnits: [
              "PU 097 - Ussa Central Market",
              "PU 098 - Ussa Central Primary School",
              "PU 099 - Ussa Central Community Hall",
              "PU 100 - Ussa Central Health Center",
              "PU 101 - Ussa Central Mosque",
              "PU 102 - Ussa Central Post Office",
              "PU 103 - Ussa Central Police Station",
              "PU 104 - Ussa Central Fire Station"
            ]
          }
        }
      },
      "wukari": {
        name: "Wukari",
        wards: {
          "wukari-central": {
            name: "Wukari Central",
            pollingUnits: [
              "PU 105 - Wukari Central Market",
              "PU 106 - Wukari Central Primary School",
              "PU 107 - Wukari Central Community Hall",
              "PU 108 - Wukari Central Health Center",
              "PU 109 - Wukari Central Mosque",
              "PU 110 - Wukari Central Post Office",
              "PU 111 - Wukari Central Police Station",
              "PU 112 - Wukari Central Fire Station"
            ]
          }
        }
      },
      "yorro": {
        name: "Yorro",
        wards: {
          "yorro-central": {
            name: "Yorro Central",
            pollingUnits: [
              "PU 113 - Yorro Central Market",
              "PU 114 - Yorro Central Primary School",
              "PU 115 - Yorro Central Community Hall",
              "PU 116 - Yorro Central Health Center",
              "PU 117 - Yorro Central Mosque",
              "PU 118 - Yorro Central Post Office",
              "PU 119 - Yorro Central Police Station",
              "PU 120 - Yorro Central Fire Station"
            ]
          }
        }
      },
      "zing": {
        name: "Zing",
        wards: {
          "zing-central": {
            name: "Zing Central",
            pollingUnits: [
              "PU 121 - Zing Central Market",
              "PU 122 - Zing Central Primary School",
              "PU 123 - Zing Central Community Hall",
              "PU 124 - Zing Central Health Center",
              "PU 125 - Zing Central Mosque",
              "PU 126 - Zing Central Post Office",
              "PU 127 - Zing Central Police Station",
              "PU 128 - Zing Central Fire Station"
            ]
          }
        }
      }
    }
  },
  yobe: {
    name: "Yobe",
    lgas: {
      "damaturu": {
        name: "Damaturu",
        wards: {
          "damaturu-central": {
            name: "Damaturu Central",
            pollingUnits: [
              "PU 001 - Damaturu Central Market",
              "PU 002 - Damaturu Central Primary School",
              "PU 003 - Damaturu Central Community Hall",
              "PU 004 - Damaturu Central Health Center",
              "PU 005 - Damaturu Central Mosque",
              "PU 006 - Damaturu Central Post Office",
              "PU 007 - Damaturu Central Police Station",
              "PU 008 - Damaturu Central Fire Station"
            ]
          }
        }
      },
      "potiskum": {
        name: "Potiskum",
        wards: {
          "potiskum-central": {
            name: "Potiskum Central",
            pollingUnits: [
              "PU 009 - Potiskum Central Market",
              "PU 010 - Potiskum Central Primary School",
              "PU 011 - Potiskum Central Community Hall",
              "PU 012 - Potiskum Central Health Center",
              "PU 013 - Potiskum Central Mosque",
              "PU 014 - Potiskum Central Post Office",
              "PU 015 - Potiskum Central Police Station",
              "PU 016 - Potiskum Central Fire Station"
            ]
          }
        }
      },
      "nguru": {
        name: "Nguru",
        wards: {
          "nguru-central": {
            name: "Nguru Central",
            pollingUnits: [
              "PU 017 - Nguru Central Market",
              "PU 018 - Nguru Central Primary School",
              "PU 019 - Nguru Central Community Hall",
              "PU 020 - Nguru Central Health Center",
              "PU 021 - Nguru Central Mosque",
              "PU 022 - Nguru Central Post Office",
              "PU 023 - Nguru Central Police Station",
              "PU 024 - Nguru Central Fire Station"
            ]
          }
        }
      },
      "geidam": {
        name: "Geidam",
        wards: {
          "geidam-central": {
            name: "Geidam Central",
            pollingUnits: [
              "PU 025 - Geidam Central Market",
              "PU 026 - Geidam Central Primary School",
              "PU 027 - Geidam Central Community Hall",
              "PU 028 - Geidam Central Health Center",
              "PU 029 - Geidam Central Mosque",
              "PU 030 - Geidam Central Post Office",
              "PU 031 - Geidam Central Police Station",
              "PU 032 - Geidam Central Fire Station"
            ]
          }
        }
      },
      "buni-yadi": {
        name: "Buni Yadi",
        wards: {
          "buni-yadi-central": {
            name: "Buni Yadi Central",
            pollingUnits: [
              "PU 033 - Buni Yadi Central Market",
              "PU 034 - Buni Yadi Central Primary School",
              "PU 035 - Buni Yadi Central Community Hall",
              "PU 036 - Buni Yadi Central Health Center",
              "PU 037 - Buni Yadi Central Mosque",
              "PU 038 - Buni Yadi Central Post Office",
              "PU 039 - Buni Yadi Central Police Station",
              "PU 040 - Buni Yadi Central Fire Station"
            ]
          }
        }
      },
      "gujba": {
        name: "Gujba",
        wards: {
          "gujba-central": {
            name: "Gujba Central",
            pollingUnits: [
              "PU 041 - Gujba Central Market",
              "PU 042 - Gujba Central Primary School",
              "PU 043 - Gujba Central Community Hall",
              "PU 044 - Gujba Central Health Center",
              "PU 045 - Gujba Central Mosque",
              "PU 046 - Gujba Central Post Office",
              "PU 047 - Gujba Central Police Station",
              "PU 048 - Gujba Central Fire Station"
            ]
          }
        }
      },
      "gulani": {
        name: "Gulani",
        wards: {
          "gulani-central": {
            name: "Gulani Central",
            pollingUnits: [
              "PU 049 - Gulani Central Market",
              "PU 050 - Gulani Central Primary School",
              "PU 051 - Gulani Central Community Hall",
              "PU 052 - Gulani Central Health Center",
              "PU 053 - Gulani Central Mosque",
              "PU 054 - Gulani Central Post Office",
              "PU 055 - Gulani Central Police Station",
              "PU 056 - Gulani Central Fire Station"
            ]
          }
        }
      },
      "jakusko": {
        name: "Jakusko",
        wards: {
          "jakusko-central": {
            name: "Jakusko Central",
            pollingUnits: [
              "PU 057 - Jakusko Central Market",
              "PU 058 - Jakusko Central Primary School",
              "PU 059 - Jakusko Central Community Hall",
              "PU 060 - Jakusko Central Health Center",
              "PU 061 - Jakusko Central Mosque",
              "PU 062 - Jakusko Central Post Office",
              "PU 063 - Jakusko Central Police Station",
              "PU 064 - Jakusko Central Fire Station"
            ]
          }
        }
      },
      "karasuwa": {
        name: "Karasuwa",
        wards: {
          "karasuwa-central": {
            name: "Karasuwa Central",
            pollingUnits: [
              "PU 065 - Karasuwa Central Market",
              "PU 066 - Karasuwa Central Primary School",
              "PU 067 - Karasuwa Central Community Hall",
              "PU 068 - Karasuwa Central Health Center",
              "PU 069 - Karasuwa Central Mosque",
              "PU 070 - Karasuwa Central Post Office",
              "PU 071 - Karasuwa Central Police Station",
              "PU 072 - Karasuwa Central Fire Station"
            ]
          }
        }
      },
      "machina": {
        name: "Machina",
        wards: {
          "machina-central": {
            name: "Machina Central",
            pollingUnits: [
              "PU 073 - Machina Central Market",
              "PU 074 - Machina Central Primary School",
              "PU 075 - Machina Central Community Hall",
              "PU 076 - Machina Central Health Center",
              "PU 077 - Machina Central Mosque",
              "PU 078 - Machina Central Post Office",
              "PU 079 - Machina Central Police Station",
              "PU 080 - Machina Central Fire Station"
            ]
          }
        }
      },
      "nangere": {
        name: "Nangere",
        wards: {
          "nangere-central": {
            name: "Nangere Central",
            pollingUnits: [
              "PU 081 - Nangere Central Market",
              "PU 082 - Nangere Central Primary School",
              "PU 083 - Nangere Central Community Hall",
              "PU 084 - Nangere Central Health Center",
              "PU 085 - Nangere Central Mosque",
              "PU 086 - Nangere Central Post Office",
              "PU 087 - Nangere Central Police Station",
              "PU 088 - Nangere Central Fire Station"
            ]
          }
        }
      },
      "tarmuwa": {
        name: "Tarmuwa",
        wards: {
          "tarmuwa-central": {
            name: "Tarmuwa Central",
            pollingUnits: [
              "PU 089 - Tarmuwa Central Market",
              "PU 090 - Tarmuwa Central Primary School",
              "PU 091 - Tarmuwa Central Community Hall",
              "PU 092 - Tarmuwa Central Health Center",
              "PU 093 - Tarmuwa Central Mosque",
              "PU 094 - Tarmuwa Central Post Office",
              "PU 095 - Tarmuwa Central Police Station",
              "PU 096 - Tarmuwa Central Fire Station"
            ]
          }
        }
      },
      "yunusari": {
        name: "Yunusari",
        wards: {
          "yunusari-central": {
            name: "Yunusari Central",
            pollingUnits: [
              "PU 097 - Yunusari Central Market",
              "PU 098 - Yunusari Central Primary School",
              "PU 099 - Yunusari Central Community Hall",
              "PU 100 - Yunusari Central Health Center",
              "PU 101 - Yunusari Central Mosque",
              "PU 102 - Yunusari Central Post Office",
              "PU 103 - Yunusari Central Police Station",
              "PU 104 - Yunusari Central Fire Station"
            ]
          }
        }
      }
    }
  },
  zamfara: {
    name: "Zamfara",
    lgas: {
      "gusau": {
        name: "Gusau",
        wards: {
          "gusau-central": {
            name: "Gusau Central",
            pollingUnits: [
              "PU 001 - Gusau Central Market",
              "PU 002 - Gusau Central Primary School",
              "PU 003 - Gusau Central Community Hall",
              "PU 004 - Gusau Central Health Center",
              "PU 005 - Gusau Central Mosque",
              "PU 006 - Gusau Central Post Office",
              "PU 007 - Gusau Central Police Station",
              "PU 008 - Gusau Central Fire Station"
            ]
          }
        }
      },
      "maradun": {
        name: "Maradun",
        wards: {
          "maradun-central": {
            name: "Maradun Central",
            pollingUnits: [
              "PU 009 - Maradun Central Market",
              "PU 010 - Maradun Central Primary School",
              "PU 011 - Maradun Central Community Hall",
              "PU 012 - Maradun Central Health Center",
              "PU 013 - Maradun Central Mosque",
              "PU 014 - Maradun Central Post Office",
              "PU 015 - Maradun Central Police Station",
              "PU 016 - Maradun Central Fire Station"
            ]
          }
        }
      },
      "shinkafi": {
        name: "Shinkafi",
        wards: {
          "shinkafi-central": {
            name: "Shinkafi Central",
            pollingUnits: [
              "PU 017 - Shinkafi Central Market",
              "PU 018 - Shinkafi Central Primary School",
              "PU 019 - Shinkafi Central Community Hall",
              "PU 020 - Shinkafi Central Health Center",
              "PU 021 - Shinkafi Central Mosque",
              "PU 022 - Shinkafi Central Post Office",
              "PU 023 - Shinkafi Central Police Station",
              "PU 024 - Shinkafi Central Fire Station"
            ]
          }
        }
      },
      "kaura-namoda": {
        name: "Kaura Namoda",
        wards: {
          "kaura-namoda-central": {
            name: "Kaura Namoda Central",
            pollingUnits: [
              "PU 025 - Kaura Namoda Central Market",
              "PU 026 - Kaura Namoda Central Primary School",
              "PU 027 - Kaura Namoda Central Community Hall",
              "PU 028 - Kaura Namoda Central Health Center",
              "PU 029 - Kaura Namoda Central Mosque",
              "PU 030 - Kaura Namoda Central Post Office",
              "PU 031 - Kaura Namoda Central Police Station",
              "PU 032 - Kaura Namoda Central Fire Station"
            ]
          }
        }
      },
      "tsafe": {
        name: "Tsafe",
        wards: {
          "tsafe-central": {
            name: "Tsafe Central",
            pollingUnits: [
              "PU 033 - Tsafe Central Market",
              "PU 034 - Tsafe Central Primary School",
              "PU 035 - Tsafe Central Community Hall",
              "PU 036 - Tsafe Central Health Center",
              "PU 037 - Tsafe Central Mosque",
              "PU 038 - Tsafe Central Post Office",
              "PU 039 - Tsafe Central Police Station",
              "PU 040 - Tsafe Central Fire Station"
            ]
          }
        }
      },
      "bakkura": {
        name: "Bakkura",
        wards: {
          "bakkura-central": {
            name: "Bakkura Central",
            pollingUnits: [
              "PU 041 - Bakkura Central Market",
              "PU 042 - Bakkura Central Primary School",
              "PU 043 - Bakkura Central Community Hall",
              "PU 044 - Bakkura Central Health Center",
              "PU 045 - Bakkura Central Mosque",
              "PU 046 - Bakkura Central Post Office",
              "PU 047 - Bakkura Central Police Station",
              "PU 048 - Bakkura Central Fire Station"
            ]
          }
        }
      },
      "birin-magaji": {
        name: "Birin Magaji",
        wards: {
          "birin-magaji-central": {
            name: "Birin Magaji Central",
            pollingUnits: [
              "PU 049 - Birin Magaji Central Market",
              "PU 050 - Birin Magaji Central Primary School",
              "PU 051 - Birin Magaji Central Community Hall",
              "PU 052 - Birin Magaji Central Health Center",
              "PU 053 - Birin Magaji Central Mosque",
              "PU 054 - Birin Magaji Central Post Office",
              "PU 055 - Birin Magaji Central Police Station",
              "PU 056 - Birin Magaji Central Fire Station"
            ]
          }
        }
      },
      "gummi": {
        name: "Gummi",
        wards: {
          "gummi-central": {
            name: "Gummi Central",
            pollingUnits: [
              "PU 057 - Gummi Central Market",
              "PU 058 - Gummi Central Primary School",
              "PU 059 - Gummi Central Community Hall",
              "PU 060 - Gummi Central Health Center",
              "PU 061 - Gummi Central Mosque",
              "PU 062 - Gummi Central Post Office",
              "PU 063 - Gummi Central Police Station",
              "PU 064 - Gummi Central Fire Station"
            ]
          }
        }
      },
      "talbata-mafara": {
        name: "Talata Mafara",
        wards: {
          "talata-mafara-central": {
            name: "Talata Mafara Central",
            pollingUnits: [
              "PU 065 - Talata Mafara Central Market",
              "PU 066 - Talata Mafara Central Primary School",
              "PU 067 - Talata Mafara Central Community Hall",
              "PU 068 - Talata Mafara Central Health Center",
              "PU 069 - Talata Mafara Central Mosque",
              "PU 070 - Talata Mafara Central Post Office",
              "PU 071 - Talata Mafara Central Police Station",
              "PU 072 - Talata Mafara Central Fire Station"
            ]
          }
        }
      },
      "anka": {
        name: "Anka",
        wards: {
          "anka-central": {
            name: "Anka Central",
            pollingUnits: [
              "PU 073 - Anka Central Market",
              "PU 074 - Anka Central Primary School",
              "PU 075 - Anka Central Community Hall",
              "PU 076 - Anka Central Health Center",
              "PU 077 - Anka Central Mosque",
              "PU 078 - Anka Central Post Office",
              "PU 079 - Anka Central Police Station",
              "PU 080 - Anka Central Fire Station"
            ]
          }
        }
      },
      "bukkuyum": {
        name: "Bukkuyum",
        wards: {
          "bukkuyum-central": {
            name: "Bukkuyum Central",
            pollingUnits: [
              "PU 081 - Bukkuyum Central Market",
              "PU 082 - Bukkuyum Central Primary School",
              "PU 083 - Bukkuyum Central Community Hall",
              "PU 084 - Bukkuyum Central Health Center",
              "PU 085 - Bukkuyum Central Mosque",
              "PU 086 - Bukkuyum Central Post Office",
              "PU 087 - Bukkuyum Central Police Station",
              "PU 088 - Bukkuyum Central Fire Station"
            ]
          }
        }
      },
      "bunge": {
        name: "Bunge",
        wards: {
          "bunge-central": {
            name: "Bunge Central",
            pollingUnits: [
              "PU 089 - Bunge Central Market",
              "PU 090 - Bunge Central Primary School",
              "PU 091 - Bunge Central Community Hall",
              "PU 092 - Bunge Central Health Center",
              "PU 093 - Bunge Central Mosque",
              "PU 094 - Bunge Central Post Office",
              "PU 095 - Bunge Central Police Station",
              "PU 096 - Bunge Central Fire Station"
            ]
          }
        }
      },
      "chafe": {
        name: "Chafe",
        wards: {
          "chafe-central": {
            name: "Chafe Central",
            pollingUnits: [
              "PU 097 - Chafe Central Market",
              "PU 098 - Chafe Central Primary School",
              "PU 099 - Chafe Central Community Hall",
              "PU 100 - Chafe Central Health Center",
              "PU 101 - Chafe Central Mosque",
              "PU 102 - Chafe Central Post Office",
              "PU 103 - Chafe Central Police Station",
              "PU 104 - Chafe Central Fire Station"
            ]
          }
        }
      },
      "dansadau": {
        name: "Dansadau",
        wards: {
          "dansadau-central": {
            name: "Dansadau Central",
            pollingUnits: [
              "PU 105 - Dansadau Central Market",
              "PU 106 - Dansadau Central Primary School",
              "PU 107 - Dansadau Central Community Hall",
              "PU 108 - Dansadau Central Health Center",
              "PU 109 - Dansadau Central Mosque",
              "PU 110 - Dansadau Central Post Office",
              "PU 111 - Dansadau Central Police Station",
              "PU 112 - Dansadau Central Fire Station"
            ]
          }
        }
      },
      "kaurani": {
        name: "Kaurani",
        wards: {
          "kaurani-central": {
            name: "Kaurani Central",
            pollingUnits: [
              "PU 113 - Kaurani Central Market",
              "PU 114 - Kaurani Central Primary School",
              "PU 115 - Kaurani Central Community Hall",
              "PU 116 - Kaurani Central Health Center",
              "PU 117 - Kaurani Central Mosque",
              "PU 118 - Kaurani Central Post Office",
              "PU 119 - Kaurani Central Police Station",
              "PU 120 - Kaurani Central Fire Station"
            ]
          }
        }
      },
      "maru": {
        name: "Maru",
        wards: {
          "maru-central": {
            name: "Maru Central",
            pollingUnits: [
              "PU 121 - Maru Central Market",
              "PU 122 - Maru Central Primary School",
              "PU 123 - Maru Central Community Hall",
              "PU 124 - Maru Central Health Center",
              "PU 125 - Maru Central Mosque",
              "PU 126 - Maru Central Post Office",
              "PU 127 - Maru Central Police Station",
              "PU 128 - Maru Central Fire Station"
            ]
          }
        }
      }
    }
  }
};

// Helper functions to get data
export const getStates = () => {
  return Object.entries(nigerianAdministrativeData).map(([key, state]) => ({
    key,
    name: state.name
  }));
};

export const getLGAsForState = (stateKey: string) => {
  const state = nigerianAdministrativeData[stateKey];
  if (!state) return [];
  
  return Object.entries(state.lgas).map(([key, lga]) => ({
    key,
    name: lga.name
  }));
};

export const getWardsForLGA = (stateKey: string, lgaKey: string) => {
  const state = nigerianAdministrativeData[stateKey];
  if (!state) return [];
  
  const lga = state.lgas[lgaKey];
  if (!lga) return [];
  
  return Object.entries(lga.wards).map(([key, ward]) => ({
    key,
    name: ward.name
  }));
};

export const getPollingUnitsForWard = (stateKey: string, lgaKey: string, wardKey: string) => {
  const state = nigerianAdministrativeData[stateKey];
  if (!state) return [];
  
  const lga = state.lgas[lgaKey];
  if (!lga) return [];
  
  const ward = lga.wards[wardKey];
  if (!ward) return [];
  
  return ward.pollingUnits;
};
