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
              "PU 005 - Umungasi Mosque"
            ]
          },
          "umungasi-central": {
            name: "Umungasi Central",
            pollingUnits: [
              "PU 006 - Umungasi Central Primary School",
              "PU 007 - Umungasi Central Market",
              "PU 008 - Umungasi Central Community Hall",
              "PU 009 - Umungasi Central Health Center",
              "PU 010 - Umungasi Central Mosque"
            ]
          },
          "umungasi-east": {
            name: "Umungasi East",
            pollingUnits: [
              "PU 011 - Umungasi East Primary School",
              "PU 012 - Umungasi East Market",
              "PU 013 - Umungasi East Community Hall",
              "PU 014 - Umungasi East Health Center",
              "PU 015 - Umungasi East Mosque"
            ]
          },
          "umungasi-west": {
            name: "Umungasi West",
            pollingUnits: [
              "PU 016 - Umungasi West Primary School",
              "PU 017 - Umungasi West Market",
              "PU 018 - Umungasi West Community Hall",
              "PU 019 - Umungasi West Health Center",
              "PU 020 - Umungasi West Mosque"
            ]
          },
          "umungasi-south": {
            name: "Umungasi South",
            pollingUnits: [
              "PU 021 - Umungasi South Primary School",
              "PU 022 - Umungasi South Market",
              "PU 023 - Umungasi South Community Hall",
              "PU 024 - Umungasi South Health Center",
              "PU 025 - Umungasi South Mosque"
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
              "PU 001 - Abaukwu Central Market",
              "PU 002 - Abaukwu Primary School",
              "PU 003 - Abaukwu Community Hall",
              "PU 004 - Abaukwu Health Center",
              "PU 005 - Abaukwu Mosque"
            ]
          },
          "abaukwu-central": {
            name: "Abaukwu Central",
            pollingUnits: [
              "PU 006 - Abaukwu Central Primary School",
              "PU 007 - Abaukwu Central Market",
              "PU 008 - Abaukwu Central Community Hall",
              "PU 009 - Abaukwu Central Health Center",
              "PU 010 - Abaukwu Central Mosque"
            ]
          },
          "abaukwu-east": {
            name: "Abaukwu East",
            pollingUnits: [
              "PU 011 - Abaukwu East Primary School",
              "PU 012 - Abaukwu East Market",
              "PU 013 - Abaukwu East Community Hall",
              "PU 014 - Abaukwu East Health Center",
              "PU 015 - Abaukwu East Mosque"
            ]
          },
          "abaukwu-west": {
            name: "Abaukwu West",
            pollingUnits: [
              "PU 016 - Abaukwu West Primary School",
              "PU 017 - Abaukwu West Market",
              "PU 018 - Abaukwu West Community Hall",
              "PU 019 - Abaukwu West Health Center",
              "PU 020 - Abaukwu West Mosque"
            ]
          },
          "abaukwu-south": {
            name: "Abaukwu South",
            pollingUnits: [
              "PU 021 - Abaukwu South Primary School",
              "PU 022 - Abaukwu South Market",
              "PU 023 - Abaukwu South Community Hall",
              "PU 024 - Abaukwu South Health Center",
              "PU 025 - Abaukwu South Mosque"
            ]
          }
        }
      },
      "arochukwu": { 
        name: "Arochukwu", 
        wards: {
          "arochukwu-central": {
            name: "Arochukwu Central",
            pollingUnits: [
              "PU 001 - Arochukwu Central Market",
              "PU 002 - Arochukwu Central Primary School",
              "PU 003 - Arochukwu Central Community Hall",
              "PU 004 - Arochukwu Central Health Center",
              "PU 005 - Arochukwu Central Church"
            ]
          },
          "arochukwu-east": {
            name: "Arochukwu East",
            pollingUnits: [
              "PU 006 - Arochukwu East Primary School",
              "PU 007 - Arochukwu East Market",
              "PU 008 - Arochukwu East Community Hall",
              "PU 009 - Arochukwu East Health Center",
              "PU 010 - Arochukwu East Church"
            ]
          },
          "arochukwu-west": {
            name: "Arochukwu West",
            pollingUnits: [
              "PU 011 - Arochukwu West Primary School",
              "PU 012 - Arochukwu West Market",
              "PU 013 - Arochukwu West Community Hall",
              "PU 014 - Arochukwu West Health Center",
              "PU 015 - Arochukwu West Church"
            ]
          },
          "arochukwu-north": {
            name: "Arochukwu North",
            pollingUnits: [
              "PU 016 - Arochukwu North Primary School",
              "PU 017 - Arochukwu North Market",
              "PU 018 - Arochukwu North Community Hall",
              "PU 019 - Arochukwu North Health Center",
              "PU 020 - Arochukwu North Church"
            ]
          },
          "arochukwu-south": {
            name: "Arochukwu South",
            pollingUnits: [
              "PU 021 - Arochukwu South Primary School",
              "PU 022 - Arochukwu South Market",
              "PU 023 - Arochukwu South Community Hall",
              "PU 024 - Arochukwu South Health Center",
              "PU 025 - Arochukwu South Church"
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
              "PU 001 - Bende Central Market",
              "PU 002 - Bende Central Primary School",
              "PU 003 - Bende Central Community Hall",
              "PU 004 - Bende Central Health Center",
              "PU 005 - Bende Central Church"
            ]
          },
          "bende-east": {
            name: "Bende East",
            pollingUnits: [
              "PU 006 - Bende East Primary School",
              "PU 007 - Bende East Market",
              "PU 008 - Bende East Community Hall",
              "PU 009 - Bende East Health Center",
              "PU 010 - Bende East Church"
            ]
          },
          "bende-west": {
            name: "Bende West",
            pollingUnits: [
              "PU 011 - Bende West Primary School",
              "PU 012 - Bende West Market",
              "PU 013 - Bende West Community Hall",
              "PU 014 - Bende West Health Center",
              "PU 015 - Bende West Church"
            ]
          },
          "bende-north": {
            name: "Bende North",
            pollingUnits: [
              "PU 016 - Bende North Primary School",
              "PU 017 - Bende North Market",
              "PU 018 - Bende North Community Hall",
              "PU 019 - Bende North Health Center",
              "PU 020 - Bende North Church"
            ]
          },
          "bende-south": {
            name: "Bende South",
            pollingUnits: [
              "PU 021 - Bende South Primary School",
              "PU 022 - Bende South Market",
              "PU 023 - Bende South Community Hall",
              "PU 024 - Bende South Health Center",
              "PU 025 - Bende South Church"
            ]
          }
        }
      },
      "ikwuano": { 
        name: "Ikwuano", 
        wards: {
          "ikwuano-central": {
            name: "Ikwuano Central",
            pollingUnits: [
              "PU 001 - Ikwuano Central Market",
              "PU 002 - Ikwuano Central Primary School",
              "PU 003 - Ikwuano Central Community Hall",
              "PU 004 - Ikwuano Central Health Center",
              "PU 005 - Ikwuano Central Church"
            ]
          },
          "ikwuano-east": {
            name: "Ikwuano East",
            pollingUnits: [
              "PU 006 - Ikwuano East Primary School",
              "PU 007 - Ikwuano East Market",
              "PU 008 - Ikwuano East Community Hall",
              "PU 009 - Ikwuano East Health Center",
              "PU 010 - Ikwuano East Church"
            ]
          },
          "ikwuano-west": {
            name: "Ikwuano West",
            pollingUnits: [
              "PU 011 - Ikwuano West Primary School",
              "PU 012 - Ikwuano West Market",
              "PU 013 - Ikwuano West Community Hall",
              "PU 014 - Ikwuano West Health Center",
              "PU 015 - Ikwuano West Church"
            ]
          },
          "ikwuano-north": {
            name: "Ikwuano North",
            pollingUnits: [
              "PU 016 - Ikwuano North Primary School",
              "PU 017 - Ikwuano North Market",
              "PU 018 - Ikwuano North Community Hall",
              "PU 019 - Ikwuano North Health Center",
              "PU 020 - Ikwuano North Church"
            ]
          },
          "ikwuano-south": {
            name: "Ikwuano South",
            pollingUnits: [
              "PU 021 - Ikwuano South Primary School",
              "PU 022 - Ikwuano South Market",
              "PU 023 - Ikwuano South Community Hall",
              "PU 024 - Ikwuano South Health Center",
              "PU 025 - Ikwuano South Church"
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
              "PU 001 - Isiala Ngwa North Central Market",
              "PU 002 - Isiala Ngwa North Central Primary School",
              "PU 003 - Isiala Ngwa North Central Community Hall",
              "PU 004 - Isiala Ngwa North Central Health Center",
              "PU 005 - Isiala Ngwa North Central Church"
            ]
          },
          "isiala-ngwa-north-east": {
            name: "Isiala Ngwa North East",
            pollingUnits: [
              "PU 006 - Isiala Ngwa North East Primary School",
              "PU 007 - Isiala Ngwa North East Market",
              "PU 008 - Isiala Ngwa North East Community Hall",
              "PU 009 - Isiala Ngwa North East Health Center",
              "PU 010 - Isiala Ngwa North East Church"
            ]
          },
          "isiala-ngwa-north-west": {
            name: "Isiala Ngwa North West",
            pollingUnits: [
              "PU 011 - Isiala Ngwa North West Primary School",
              "PU 012 - Isiala Ngwa North West Market",
              "PU 013 - Isiala Ngwa North West Community Hall",
              "PU 014 - Isiala Ngwa North West Health Center",
              "PU 015 - Isiala Ngwa North West Church"
            ]
          },
          "isiala-ngwa-north-north": {
            name: "Isiala Ngwa North North",
            pollingUnits: [
              "PU 016 - Isiala Ngwa North North Primary School",
              "PU 017 - Isiala Ngwa North North Market",
              "PU 018 - Isiala Ngwa North North Community Hall",
              "PU 019 - Isiala Ngwa North North Health Center",
              "PU 020 - Isiala Ngwa North North Church"
            ]
          },
          "isiala-ngwa-north-south": {
            name: "Isiala Ngwa North South",
            pollingUnits: [
              "PU 021 - Isiala Ngwa North South Primary School",
              "PU 022 - Isiala Ngwa North South Market",
              "PU 023 - Isiala Ngwa North South Community Hall",
              "PU 024 - Isiala Ngwa North South Health Center",
              "PU 025 - Isiala Ngwa North South Church"
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
              "PU 001 - Isiala Ngwa South Central Market",
              "PU 002 - Isiala Ngwa South Central Primary School",
              "PU 003 - Isiala Ngwa South Central Community Hall",
              "PU 004 - Isiala Ngwa South Central Health Center",
              "PU 005 - Isiala Ngwa South Central Church"
            ]
          },
          "isiala-ngwa-south-east": {
            name: "Isiala Ngwa South East",
            pollingUnits: [
              "PU 006 - Isiala Ngwa South East Primary School",
              "PU 007 - Isiala Ngwa South East Market",
              "PU 008 - Isiala Ngwa South East Community Hall",
              "PU 009 - Isiala Ngwa South East Health Center",
              "PU 010 - Isiala Ngwa South East Church"
            ]
          },
          "isiala-ngwa-south-west": {
            name: "Isiala Ngwa South West",
            pollingUnits: [
              "PU 011 - Isiala Ngwa South West Primary School",
              "PU 012 - Isiala Ngwa South West Market",
              "PU 013 - Isiala Ngwa South West Community Hall",
              "PU 014 - Isiala Ngwa South West Health Center",
              "PU 015 - Isiala Ngwa South West Church"
            ]
          },
          "isiala-ngwa-south-north": {
            name: "Isiala Ngwa South North",
            pollingUnits: [
              "PU 016 - Isiala Ngwa South North Primary School",
              "PU 017 - Isiala Ngwa South North Market",
              "PU 018 - Isiala Ngwa South North Community Hall",
              "PU 019 - Isiala Ngwa South North Health Center",
              "PU 020 - Isiala Ngwa South North Church"
            ]
          },
          "isiala-ngwa-south-south": {
            name: "Isiala Ngwa South South",
            pollingUnits: [
              "PU 021 - Isiala Ngwa South South Primary School",
              "PU 022 - Isiala Ngwa South South Market",
              "PU 023 - Isiala Ngwa South South Community Hall",
              "PU 024 - Isiala Ngwa South South Health Center",
              "PU 025 - Isiala Ngwa South South Church"
            ]
          }
        }
      },
      "isukwuato": { 
        name: "Isukwuato", 
        wards: {
          "isukwuato-central": {
            name: "Isukwuato Central",
            pollingUnits: [
              "PU 001 - Isukwuato Central Market",
              "PU 002 - Isukwuato Central Primary School",
              "PU 003 - Isukwuato Central Community Hall",
              "PU 004 - Isukwuato Central Health Center",
              "PU 005 - Isukwuato Central Church"
            ]
          },
          "isukwuato-east": {
            name: "Isukwuato East",
            pollingUnits: [
              "PU 006 - Isukwuato East Primary School",
              "PU 007 - Isukwuato East Market",
              "PU 008 - Isukwuato East Community Hall",
              "PU 009 - Isukwuato East Health Center",
              "PU 010 - Isukwuato East Church"
            ]
          },
          "isukwuato-west": {
            name: "Isukwuato West",
            pollingUnits: [
              "PU 011 - Isukwuato West Primary School",
              "PU 012 - Isukwuato West Market",
              "PU 013 - Isukwuato West Community Hall",
              "PU 014 - Isukwuato West Health Center",
              "PU 015 - Isukwuato West Church"
            ]
          },
          "isukwuato-north": {
            name: "Isukwuato North",
            pollingUnits: [
              "PU 016 - Isukwuato North Primary School",
              "PU 017 - Isukwuato North Market",
              "PU 018 - Isukwuato North Community Hall",
              "PU 019 - Isukwuato North Health Center",
              "PU 020 - Isukwuato North Church"
            ]
          },
          "isukwuato-south": {
            name: "Isukwuato South",
            pollingUnits: [
              "PU 021 - Isukwuato South Primary School",
              "PU 022 - Isukwuato South Market",
              "PU 023 - Isukwuato South Community Hall",
              "PU 024 - Isukwuato South Health Center",
              "PU 025 - Isukwuato South Church"
            ]
          }
        }
      },
      "obi-ngwa": { 
        name: "Obi Ngwa", 
        wards: {
          "obi-ngwa-central": {
            name: "Obi Ngwa Central",
            pollingUnits: [
              "PU 001 - Obi Ngwa Central Market",
              "PU 002 - Obi Ngwa Central Primary School",
              "PU 003 - Obi Ngwa Central Community Hall",
              "PU 004 - Obi Ngwa Central Health Center",
              "PU 005 - Obi Ngwa Central Church"
            ]
          },
          "obi-ngwa-east": {
            name: "Obi Ngwa East",
            pollingUnits: [
              "PU 006 - Obi Ngwa East Primary School",
              "PU 007 - Obi Ngwa East Market",
              "PU 008 - Obi Ngwa East Community Hall",
              "PU 009 - Obi Ngwa East Health Center",
              "PU 010 - Obi Ngwa East Church"
            ]
          },
          "obi-ngwa-west": {
            name: "Obi Ngwa West",
            pollingUnits: [
              "PU 011 - Obi Ngwa West Primary School",
              "PU 012 - Obi Ngwa West Market",
              "PU 013 - Obi Ngwa West Community Hall",
              "PU 014 - Obi Ngwa West Health Center",
              "PU 015 - Obi Ngwa West Church"
            ]
          },
          "obi-ngwa-north": {
            name: "Obi Ngwa North",
            pollingUnits: [
              "PU 016 - Obi Ngwa North Primary School",
              "PU 017 - Obi Ngwa North Market",
              "PU 018 - Obi Ngwa North Community Hall",
              "PU 019 - Obi Ngwa North Health Center",
              "PU 020 - Obi Ngwa North Church"
            ]
          },
          "obi-ngwa-south": {
            name: "Obi Ngwa South",
            pollingUnits: [
              "PU 021 - Obi Ngwa South Primary School",
              "PU 022 - Obi Ngwa South Market",
              "PU 023 - Obi Ngwa South Community Hall",
              "PU 024 - Obi Ngwa South Health Center",
              "PU 025 - Obi Ngwa South Church"
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
              "PU 001 - Ohafia Central Market",
              "PU 002 - Ohafia Central Primary School",
              "PU 003 - Ohafia Central Community Hall",
              "PU 004 - Ohafia Central Health Center",
              "PU 005 - Ohafia Central Church"
            ]
          },
          "ohafia-east": {
            name: "Ohafia East",
            pollingUnits: [
              "PU 006 - Ohafia East Primary School",
              "PU 007 - Ohafia East Market",
              "PU 008 - Ohafia East Community Hall",
              "PU 009 - Ohafia East Health Center",
              "PU 010 - Ohafia East Church"
            ]
          },
          "ohafia-west": {
            name: "Ohafia West",
            pollingUnits: [
              "PU 011 - Ohafia West Primary School",
              "PU 012 - Ohafia West Market",
              "PU 013 - Ohafia West Community Hall",
              "PU 014 - Ohafia West Health Center",
              "PU 015 - Ohafia West Church"
            ]
          },
          "ohafia-north": {
            name: "Ohafia North",
            pollingUnits: [
              "PU 016 - Ohafia North Primary School",
              "PU 017 - Ohafia North Market",
              "PU 018 - Ohafia North Community Hall",
              "PU 019 - Ohafia North Health Center",
              "PU 020 - Ohafia North Church"
            ]
          },
          "ohafia-south": {
            name: "Ohafia South",
            pollingUnits: [
              "PU 021 - Ohafia South Primary School",
              "PU 022 - Ohafia South Market",
              "PU 023 - Ohafia South Community Hall",
              "PU 024 - Ohafia South Health Center",
              "PU 025 - Ohafia South Church"
            ]
          }
        }
      },
      "osisioma-ngwa": { 
        name: "Osisioma Ngwa", 
        wards: {
          "osisioma-ngwa-central": {
            name: "Osisioma Ngwa Central",
            pollingUnits: [
              "PU 001 - Osisioma Ngwa Central Market",
              "PU 002 - Osisioma Ngwa Central Primary School",
              "PU 003 - Osisioma Ngwa Central Community Hall",
              "PU 004 - Osisioma Ngwa Central Health Center",
              "PU 005 - Osisioma Ngwa Central Church"
            ]
          },
          "osisioma-ngwa-east": {
            name: "Osisioma Ngwa East",
            pollingUnits: [
              "PU 006 - Osisioma Ngwa East Primary School",
              "PU 007 - Osisioma Ngwa East Market",
              "PU 008 - Osisioma Ngwa East Community Hall",
              "PU 009 - Osisioma Ngwa East Health Center",
              "PU 010 - Osisioma Ngwa East Church"
            ]
          },
          "osisioma-ngwa-west": {
            name: "Osisioma Ngwa West",
            pollingUnits: [
              "PU 011 - Osisioma Ngwa West Primary School",
              "PU 012 - Osisioma Ngwa West Market",
              "PU 013 - Osisioma Ngwa West Community Hall",
              "PU 014 - Osisioma Ngwa West Health Center",
              "PU 015 - Osisioma Ngwa West Church"
            ]
          },
          "osisioma-ngwa-north": {
            name: "Osisioma Ngwa North",
            pollingUnits: [
              "PU 016 - Osisioma Ngwa North Primary School",
              "PU 017 - Osisioma Ngwa North Market",
              "PU 018 - Osisioma Ngwa North Community Hall",
              "PU 019 - Osisioma Ngwa North Health Center",
              "PU 020 - Osisioma Ngwa North Church"
            ]
          },
          "osisioma-ngwa-south": {
            name: "Osisioma Ngwa South",
            pollingUnits: [
              "PU 021 - Osisioma Ngwa South Primary School",
              "PU 022 - Osisioma Ngwa South Market",
              "PU 023 - Osisioma Ngwa South Community Hall",
              "PU 024 - Osisioma Ngwa South Health Center",
              "PU 025 - Osisioma Ngwa South Church"
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
              "PU 001 - Ugwunagbo Central Market",
              "PU 002 - Ugwunagbo Central Primary School",
              "PU 003 - Ugwunagbo Central Community Hall",
              "PU 004 - Ugwunagbo Central Health Center",
              "PU 005 - Ugwunagbo Central Church"
            ]
          },
          "ugwunagbo-east": {
            name: "Ugwunagbo East",
            pollingUnits: [
              "PU 006 - Ugwunagbo East Primary School",
              "PU 007 - Ugwunagbo East Market",
              "PU 008 - Ugwunagbo East Community Hall",
              "PU 009 - Ugwunagbo East Health Center",
              "PU 010 - Ugwunagbo East Church"
            ]
          },
          "ugwunagbo-west": {
            name: "Ugwunagbo West",
            pollingUnits: [
              "PU 011 - Ugwunagbo West Primary School",
              "PU 012 - Ugwunagbo West Market",
              "PU 013 - Ugwunagbo West Community Hall",
              "PU 014 - Ugwunagbo West Health Center",
              "PU 015 - Ugwunagbo West Church"
            ]
          },
          "ugwunagbo-north": {
            name: "Ugwunagbo North",
            pollingUnits: [
              "PU 016 - Ugwunagbo North Primary School",
              "PU 017 - Ugwunagbo North Market",
              "PU 018 - Ugwunagbo North Community Hall",
              "PU 019 - Ugwunagbo North Health Center",
              "PU 020 - Ugwunagbo North Church"
            ]
          },
          "ugwunagbo-south": {
            name: "Ugwunagbo South",
            pollingUnits: [
              "PU 021 - Ugwunagbo South Primary School",
              "PU 022 - Ugwunagbo South Market",
              "PU 023 - Ugwunagbo South Community Hall",
              "PU 024 - Ugwunagbo South Health Center",
              "PU 025 - Ugwunagbo South Church"
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
              "PU 001 - Ukwa East Central Market",
              "PU 002 - Ukwa East Central Primary School",
              "PU 003 - Ukwa East Central Community Hall",
              "PU 004 - Ukwa East Central Health Center",
              "PU 005 - Ukwa East Central Church"
            ]
          },
          "ukwa-east-east": {
            name: "Ukwa East East",
            pollingUnits: [
              "PU 006 - Ukwa East East Primary School",
              "PU 007 - Ukwa East East Market",
              "PU 008 - Ukwa East East Community Hall",
              "PU 009 - Ukwa East East Health Center",
              "PU 010 - Ukwa East East Church"
            ]
          },
          "ukwa-east-west": {
            name: "Ukwa East West",
            pollingUnits: [
              "PU 011 - Ukwa East West Primary School",
              "PU 012 - Ukwa East West Market",
              "PU 013 - Ukwa East West Community Hall",
              "PU 014 - Ukwa East West Health Center",
              "PU 015 - Ukwa East West Church"
            ]
          },
          "ukwa-east-north": {
            name: "Ukwa East North",
            pollingUnits: [
              "PU 016 - Ukwa East North Primary School",
              "PU 017 - Ukwa East North Market",
              "PU 018 - Ukwa East North Community Hall",
              "PU 019 - Ukwa East North Health Center",
              "PU 020 - Ukwa East North Church"
            ]
          },
          "ukwa-east-south": {
            name: "Ukwa East South",
            pollingUnits: [
              "PU 021 - Ukwa East South Primary School",
              "PU 022 - Ukwa East South Market",
              "PU 023 - Ukwa East South Community Hall",
              "PU 024 - Ukwa East South Health Center",
              "PU 025 - Ukwa East South Church"
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
              "PU 001 - Ukwa West Central Market",
              "PU 002 - Ukwa West Central Primary School",
              "PU 003 - Ukwa West Central Community Hall",
              "PU 004 - Ukwa West Central Health Center",
              "PU 005 - Ukwa West Central Church"
            ]
          },
          "ukwa-west-east": {
            name: "Ukwa West East",
            pollingUnits: [
              "PU 006 - Ukwa West East Primary School",
              "PU 007 - Ukwa West East Market",
              "PU 008 - Ukwa West East Community Hall",
              "PU 009 - Ukwa West East Health Center",
              "PU 010 - Ukwa West East Church"
            ]
          },
          "ukwa-west-west": {
            name: "Ukwa West West",
            pollingUnits: [
              "PU 011 - Ukwa West West Primary School",
              "PU 012 - Ukwa West West Market",
              "PU 013 - Ukwa West West Community Hall",
              "PU 014 - Ukwa West West Health Center",
              "PU 015 - Ukwa West West Church"
            ]
          },
          "ukwa-west-north": {
            name: "Ukwa West North",
            pollingUnits: [
              "PU 016 - Ukwa West North Primary School",
              "PU 017 - Ukwa West North Market",
              "PU 018 - Ukwa West North Community Hall",
              "PU 019 - Ukwa West North Health Center",
              "PU 020 - Ukwa West North Church"
            ]
          },
          "ukwa-west-south": {
            name: "Ukwa West South",
            pollingUnits: [
              "PU 021 - Ukwa West South Primary School",
              "PU 022 - Ukwa West South Market",
              "PU 023 - Ukwa West South Community Hall",
              "PU 024 - Ukwa West South Health Center",
              "PU 025 - Ukwa West South Church"
            ]
          }
        }
      },
      "umuahia-north": { 
        name: "Umuahia North", 
        wards: {
          "umuahia-north-central": {
            name: "Umuahia North Central",
            pollingUnits: [
              "PU 001 - Umuahia North Central Market",
              "PU 002 - Umuahia North Central Primary School",
              "PU 003 - Umuahia North Central Community Hall",
              "PU 004 - Umuahia North Central Health Center",
              "PU 005 - Umuahia North Central Church"
            ]
          },
          "umuahia-north-east": {
            name: "Umuahia North East",
            pollingUnits: [
              "PU 006 - Umuahia North East Primary School",
              "PU 007 - Umuahia North East Market",
              "PU 008 - Umuahia North East Community Hall",
              "PU 009 - Umuahia North East Health Center",
              "PU 010 - Umuahia North East Church"
            ]
          },
          "umuahia-north-west": {
            name: "Umuahia North West",
            pollingUnits: [
              "PU 011 - Umuahia North West Primary School",
              "PU 012 - Umuahia North West Market",
              "PU 013 - Umuahia North West Community Hall",
              "PU 014 - Umuahia North West Health Center",
              "PU 015 - Umuahia North West Church"
            ]
          },
          "umuahia-north-north": {
            name: "Umuahia North North",
            pollingUnits: [
              "PU 016 - Umuahia North North Primary School",
              "PU 017 - Umuahia North North Market",
              "PU 018 - Umuahia North North Community Hall",
              "PU 019 - Umuahia North North Health Center",
              "PU 020 - Umuahia North North Church"
            ]
          },
          "umuahia-north-south": {
            name: "Umuahia North South",
            pollingUnits: [
              "PU 021 - Umuahia North South Primary School",
              "PU 022 - Umuahia North South Market",
              "PU 023 - Umuahia North South Community Hall",
              "PU 024 - Umuahia North South Health Center",
              "PU 025 - Umuahia North South Church"
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
              "PU 001 - Umuahia South Central Market",
              "PU 002 - Umuahia South Central Primary School",
              "PU 003 - Umuahia South Central Community Hall",
              "PU 004 - Umuahia South Central Health Center",
              "PU 005 - Umuahia South Central Church"
            ]
          },
          "umuahia-south-east": {
            name: "Umuahia South East",
            pollingUnits: [
              "PU 006 - Umuahia South East Primary School",
              "PU 007 - Umuahia South East Market",
              "PU 008 - Umuahia South East Community Hall",
              "PU 009 - Umuahia South East Health Center",
              "PU 010 - Umuahia South East Church"
            ]
          },
          "umuahia-south-west": {
            name: "Umuahia South West",
            pollingUnits: [
              "PU 011 - Umuahia South West Primary School",
              "PU 012 - Umuahia South West Market",
              "PU 013 - Umuahia South West Community Hall",
              "PU 014 - Umuahia South West Health Center",
              "PU 015 - Umuahia South West Church"
            ]
          },
          "umuahia-south-north": {
            name: "Umuahia South North",
            pollingUnits: [
              "PU 016 - Umuahia South North Primary School",
              "PU 017 - Umuahia South North Market",
              "PU 018 - Umuahia South North Community Hall",
              "PU 019 - Umuahia South North Health Center",
              "PU 020 - Umuahia South North Church"
            ]
          },
          "umuahia-south-south": {
            name: "Umuahia South South",
            pollingUnits: [
              "PU 021 - Umuahia South South Primary School",
              "PU 022 - Umuahia South South Market",
              "PU 023 - Umuahia South South Community Hall",
              "PU 024 - Umuahia South South Health Center",
              "PU 025 - Umuahia South South Church"
            ]
          }
        }
      },
      "umunneochi": { 
        name: "Umunneochi", 
        wards: {
          "umunneochi-central": {
            name: "Umunneochi Central",
            pollingUnits: [
              "PU 001 - Umunneochi Central Market",
              "PU 002 - Umunneochi Central Primary School",
              "PU 003 - Umunneochi Central Community Hall",
              "PU 004 - Umunneochi Central Health Center",
              "PU 005 - Umunneochi Central Church"
            ]
          },
          "umunneochi-east": {
            name: "Umunneochi East",
            pollingUnits: [
              "PU 006 - Umunneochi East Primary School",
              "PU 007 - Umunneochi East Market",
              "PU 008 - Umunneochi East Community Hall",
              "PU 009 - Umunneochi East Health Center",
              "PU 010 - Umunneochi East Church"
            ]
          },
          "umunneochi-west": {
            name: "Umunneochi West",
            pollingUnits: [
              "PU 011 - Umunneochi West Primary School",
              "PU 012 - Umunneochi West Market",
              "PU 013 - Umunneochi West Community Hall",
              "PU 014 - Umunneochi West Health Center",
              "PU 015 - Umunneochi West Church"
            ]
          },
          "umunneochi-north": {
            name: "Umunneochi North",
            pollingUnits: [
              "PU 016 - Umunneochi North Primary School",
              "PU 017 - Umunneochi North Market",
              "PU 018 - Umunneochi North Community Hall",
              "PU 019 - Umunneochi North Health Center",
              "PU 020 - Umunneochi North Church"
            ]
          },
          "umunneochi-south": {
            name: "Umunneochi South",
            pollingUnits: [
              "PU 021 - Umunneochi South Primary School",
              "PU 022 - Umunneochi South Market",
              "PU 023 - Umunneochi South Community Hall",
              "PU 024 - Umunneochi South Health Center",
              "PU 025 - Umunneochi South Church"
            ]
          }
        }
      }
    }
  },
  adamawa: {
    name: "Adamawa",
    lgas: {
      "demsa": { 
        name: "Demsa", 
        wards: {
          "demsa-central": {
            name: "Demsa Central",
            pollingUnits: [
              "PU 001 - Demsa Central Market",
              "PU 002 - Demsa Central Primary School",
              "PU 003 - Demsa Central Community Hall",
              "PU 004 - Demsa Central Health Center",
              "PU 005 - Demsa Central Mosque"
            ]
          },
          "demsa-east": {
            name: "Demsa East",
            pollingUnits: [
              "PU 006 - Demsa East Primary School",
              "PU 007 - Demsa East Market",
              "PU 008 - Demsa East Community Hall",
              "PU 009 - Demsa East Health Center",
              "PU 010 - Demsa East Mosque"
            ]
          },
          "demsa-west": {
            name: "Demsa West",
            pollingUnits: [
              "PU 011 - Demsa West Primary School",
              "PU 012 - Demsa West Market",
              "PU 013 - Demsa West Community Hall",
              "PU 014 - Demsa West Health Center",
              "PU 015 - Demsa West Mosque"
            ]
          },
          "demsa-north": {
            name: "Demsa North",
            pollingUnits: [
              "PU 016 - Demsa North Primary School",
              "PU 017 - Demsa North Market",
              "PU 018 - Demsa North Community Hall",
              "PU 019 - Demsa North Health Center",
              "PU 020 - Demsa North Mosque"
            ]
          },
          "demsa-south": {
            name: "Demsa South",
            pollingUnits: [
              "PU 021 - Demsa South Primary School",
              "PU 022 - Demsa South Market",
              "PU 023 - Demsa South Community Hall",
              "PU 024 - Demsa South Health Center",
              "PU 025 - Demsa South Mosque"
            ]
          }
        }
      },
      "fufore": { 
        name: "Fufore", 
        wards: {
          "fufore-central": {
            name: "Fufore Central",
            pollingUnits: [
              "PU 001 - Fufore Central Market",
              "PU 002 - Fufore Central Primary School",
              "PU 003 - Fufore Central Community Hall",
              "PU 004 - Fufore Central Health Center",
              "PU 005 - Fufore Central Mosque"
            ]
          },
          "fufore-east": {
            name: "Fufore East",
            pollingUnits: [
              "PU 006 - Fufore East Primary School",
              "PU 007 - Fufore East Market",
              "PU 008 - Fufore East Community Hall",
              "PU 009 - Fufore East Health Center",
              "PU 010 - Fufore East Mosque"
            ]
          },
          "fufore-west": {
            name: "Fufore West",
            pollingUnits: [
              "PU 011 - Fufore West Primary School",
              "PU 012 - Fufore West Market",
              "PU 013 - Fufore West Community Hall",
              "PU 014 - Fufore West Health Center",
              "PU 015 - Fufore West Mosque"
            ]
          },
          "fufore-north": {
            name: "Fufore North",
            pollingUnits: [
              "PU 016 - Fufore North Primary School",
              "PU 017 - Fufore North Market",
              "PU 018 - Fufore North Community Hall",
              "PU 019 - Fufore North Health Center",
              "PU 020 - Fufore North Mosque"
            ]
          },
          "fufore-south": {
            name: "Fufore South",
            pollingUnits: [
              "PU 021 - Fufore South Primary School",
              "PU 022 - Fufore South Market",
              "PU 023 - Fufore South Community Hall",
              "PU 024 - Fufore South Health Center",
              "PU 025 - Fufore South Mosque"
            ]
          }
        }
      },
      "ganye": { 
        name: "Ganye", 
        wards: {
          "ganye-central": {
            name: "Ganye Central",
            pollingUnits: [
              "PU 001 - Ganye Central Market",
              "PU 002 - Ganye Central Primary School",
              "PU 003 - Ganye Central Community Hall",
              "PU 004 - Ganye Central Health Center",
              "PU 005 - Ganye Central Mosque"
            ]
          },
          "ganye-east": {
            name: "Ganye East",
            pollingUnits: [
              "PU 006 - Ganye East Primary School",
              "PU 007 - Ganye East Market",
              "PU 008 - Ganye East Community Hall",
              "PU 009 - Ganye East Health Center",
              "PU 010 - Ganye East Mosque"
            ]
          },
          "ganye-west": {
            name: "Ganye West",
            pollingUnits: [
              "PU 011 - Ganye West Primary School",
              "PU 012 - Ganye West Market",
              "PU 013 - Ganye West Community Hall",
              "PU 014 - Ganye West Health Center",
              "PU 015 - Ganye West Mosque"
            ]
          },
          "ganye-north": {
            name: "Ganye North",
            pollingUnits: [
              "PU 016 - Ganye North Primary School",
              "PU 017 - Ganye North Market",
              "PU 018 - Ganye North Community Hall",
              "PU 019 - Ganye North Health Center",
              "PU 020 - Ganye North Mosque"
            ]
          },
          "ganye-south": {
            name: "Ganye South",
            pollingUnits: [
              "PU 021 - Ganye South Primary School",
              "PU 022 - Ganye South Market",
              "PU 023 - Ganye South Community Hall",
              "PU 024 - Ganye South Health Center",
              "PU 025 - Ganye South Mosque"
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
              "PU 001 - Girei Central Market",
              "PU 002 - Girei Central Primary School",
              "PU 003 - Girei Central Community Hall",
              "PU 004 - Girei Central Health Center",
              "PU 005 - Girei Central Mosque"
            ]
          },
          "girei-east": {
            name: "Girei East",
            pollingUnits: [
              "PU 006 - Girei East Primary School",
              "PU 007 - Girei East Market",
              "PU 008 - Girei East Community Hall",
              "PU 009 - Girei East Health Center",
              "PU 010 - Girei East Mosque"
            ]
          },
          "girei-west": {
            name: "Girei West",
            pollingUnits: [
              "PU 011 - Girei West Primary School",
              "PU 012 - Girei West Market",
              "PU 013 - Girei West Community Hall",
              "PU 014 - Girei West Health Center",
              "PU 015 - Girei West Mosque"
            ]
          },
          "girei-north": {
            name: "Girei North",
            pollingUnits: [
              "PU 016 - Girei North Primary School",
              "PU 017 - Girei North Market",
              "PU 018 - Girei North Community Hall",
              "PU 019 - Girei North Health Center",
              "PU 020 - Girei North Mosque"
            ]
          },
          "girei-south": {
            name: "Girei South",
            pollingUnits: [
              "PU 021 - Girei South Primary School",
              "PU 022 - Girei South Market",
              "PU 023 - Girei South Community Hall",
              "PU 024 - Girei South Health Center",
              "PU 025 - Girei South Mosque"
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
              "PU 001 - Gombi Central Market",
              "PU 002 - Gombi Central Primary School",
              "PU 003 - Gombi Central Community Hall",
              "PU 004 - Gombi Central Health Center",
              "PU 005 - Gombi Central Mosque"
            ]
          },
          "gombi-east": {
            name: "Gombi East",
            pollingUnits: [
              "PU 006 - Gombi East Primary School",
              "PU 007 - Gombi East Market",
              "PU 008 - Gombi East Community Hall",
              "PU 009 - Gombi East Health Center",
              "PU 010 - Gombi East Mosque"
            ]
          },
          "gombi-west": {
            name: "Gombi West",
            pollingUnits: [
              "PU 011 - Gombi West Primary School",
              "PU 012 - Gombi West Market",
              "PU 013 - Gombi West Community Hall",
              "PU 014 - Gombi West Health Center",
              "PU 015 - Gombi West Mosque"
            ]
          },
          "gombi-north": {
            name: "Gombi North",
            pollingUnits: [
              "PU 016 - Gombi North Primary School",
              "PU 017 - Gombi North Market",
              "PU 018 - Gombi North Community Hall",
              "PU 019 - Gombi North Health Center",
              "PU 020 - Gombi North Mosque"
            ]
          },
          "gombi-south": {
            name: "Gombi South",
            pollingUnits: [
              "PU 021 - Gombi South Primary School",
              "PU 022 - Gombi South Market",
              "PU 023 - Gombi South Community Hall",
              "PU 024 - Gombi South Health Center",
              "PU 025 - Gombi South Mosque"
            ]
          }
        }
      },
      "guyuk": { 
        name: "Guyuk", 
        wards: {
          "guyuk-central": {
            name: "Guyuk Central",
            pollingUnits: [
              "PU 001 - Guyuk Central Market",
              "PU 002 - Guyuk Central Primary School",
              "PU 003 - Guyuk Central Community Hall",
              "PU 004 - Guyuk Central Health Center",
              "PU 005 - Guyuk Central Mosque"
            ]
          },
          "guyuk-east": {
            name: "Guyuk East",
            pollingUnits: [
              "PU 006 - Guyuk East Primary School",
              "PU 007 - Guyuk East Market",
              "PU 008 - Guyuk East Community Hall",
              "PU 009 - Guyuk East Health Center",
              "PU 010 - Guyuk East Mosque"
            ]
          },
          "guyuk-west": {
            name: "Guyuk West",
            pollingUnits: [
              "PU 011 - Guyuk West Primary School",
              "PU 012 - Guyuk West Market",
              "PU 013 - Guyuk West Community Hall",
              "PU 014 - Guyuk West Health Center",
              "PU 015 - Guyuk West Mosque"
            ]
          },
          "guyuk-north": {
            name: "Guyuk North",
            pollingUnits: [
              "PU 016 - Guyuk North Primary School",
              "PU 017 - Guyuk North Market",
              "PU 018 - Guyuk North Community Hall",
              "PU 019 - Guyuk North Health Center",
              "PU 020 - Guyuk North Mosque"
            ]
          },
          "guyuk-south": {
            name: "Guyuk South",
            pollingUnits: [
              "PU 021 - Guyuk South Primary School",
              "PU 022 - Guyuk South Market",
              "PU 023 - Guyuk South Community Hall",
              "PU 024 - Guyuk South Health Center",
              "PU 025 - Guyuk South Mosque"
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
              "PU 001 - Hong Central Market",
              "PU 002 - Hong Central Primary School",
              "PU 003 - Hong Central Community Hall",
              "PU 004 - Hong Central Health Center",
              "PU 005 - Hong Central Mosque"
            ]
          },
          "hong-east": {
            name: "Hong East",
            pollingUnits: [
              "PU 006 - Hong East Primary School",
              "PU 007 - Hong East Market",
              "PU 008 - Hong East Community Hall",
              "PU 009 - Hong East Health Center",
              "PU 010 - Hong East Mosque"
            ]
          },
          "hong-west": {
            name: "Hong West",
            pollingUnits: [
              "PU 011 - Hong West Primary School",
              "PU 012 - Hong West Market",
              "PU 013 - Hong West Community Hall",
              "PU 014 - Hong West Health Center",
              "PU 015 - Hong West Mosque"
            ]
          },
          "hong-north": {
            name: "Hong North",
            pollingUnits: [
              "PU 016 - Hong North Primary School",
              "PU 017 - Hong North Market",
              "PU 018 - Hong North Community Hall",
              "PU 019 - Hong North Health Center",
              "PU 020 - Hong North Mosque"
            ]
          },
          "hong-south": {
            name: "Hong South",
            pollingUnits: [
              "PU 021 - Hong South Primary School",
              "PU 022 - Hong South Market",
              "PU 023 - Hong South Community Hall",
              "PU 024 - Hong South Health Center",
              "PU 025 - Hong South Mosque"
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
              "PU 001 - Jada Central Market",
              "PU 002 - Jada Central Primary School",
              "PU 003 - Jada Central Community Hall",
              "PU 004 - Jada Central Health Center",
              "PU 005 - Jada Central Mosque"
            ]
          },
          "jada-east": {
            name: "Jada East",
            pollingUnits: [
              "PU 006 - Jada East Primary School",
              "PU 007 - Jada East Market",
              "PU 008 - Jada East Community Hall",
              "PU 009 - Jada East Health Center",
              "PU 010 - Jada East Mosque"
            ]
          },
          "jada-west": {
            name: "Jada West",
            pollingUnits: [
              "PU 011 - Jada West Primary School",
              "PU 012 - Jada West Market",
              "PU 013 - Jada West Community Hall",
              "PU 014 - Jada West Health Center",
              "PU 015 - Jada West Mosque"
            ]
          },
          "jada-north": {
            name: "Jada North",
            pollingUnits: [
              "PU 016 - Jada North Primary School",
              "PU 017 - Jada North Market",
              "PU 018 - Jada North Community Hall",
              "PU 019 - Jada North Health Center",
              "PU 020 - Jada North Mosque"
            ]
          },
          "jada-south": {
            name: "Jada South",
            pollingUnits: [
              "PU 021 - Jada South Primary School",
              "PU 022 - Jada South Market",
              "PU 023 - Jada South Community Hall",
              "PU 024 - Jada South Health Center",
              "PU 025 - Jada South Mosque"
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
              "PU 001 - Lamurde Central Market",
              "PU 002 - Lamurde Central Primary School",
              "PU 003 - Lamurde Central Community Hall",
              "PU 004 - Lamurde Central Health Center",
              "PU 005 - Lamurde Central Mosque"
            ]
          },
          "lamurde-east": {
            name: "Lamurde East",
            pollingUnits: [
              "PU 006 - Lamurde East Primary School",
              "PU 007 - Lamurde East Market",
              "PU 008 - Lamurde East Community Hall",
              "PU 009 - Lamurde East Health Center",
              "PU 010 - Lamurde East Mosque"
            ]
          },
          "lamurde-west": {
            name: "Lamurde West",
            pollingUnits: [
              "PU 011 - Lamurde West Primary School",
              "PU 012 - Lamurde West Market",
              "PU 013 - Lamurde West Community Hall",
              "PU 014 - Lamurde West Health Center",
              "PU 015 - Lamurde West Mosque"
            ]
          },
          "lamurde-north": {
            name: "Lamurde North",
            pollingUnits: [
              "PU 016 - Lamurde North Primary School",
              "PU 017 - Lamurde North Market",
              "PU 018 - Lamurde North Community Hall",
              "PU 019 - Lamurde North Health Center",
              "PU 020 - Lamurde North Mosque"
            ]
          },
          "lamurde-south": {
            name: "Lamurde South",
            pollingUnits: [
              "PU 021 - Lamurde South Primary School",
              "PU 022 - Lamurde South Market",
              "PU 023 - Lamurde South Community Hall",
              "PU 024 - Lamurde South Health Center",
              "PU 025 - Lamurde South Mosque"
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
              "PU 001 - Madagali Central Market",
              "PU 002 - Madagali Central Primary School",
              "PU 003 - Madagali Central Community Hall",
              "PU 004 - Madagali Central Health Center",
              "PU 005 - Madagali Central Mosque"
            ]
          },
          "madagali-east": {
            name: "Madagali East",
            pollingUnits: [
              "PU 006 - Madagali East Primary School",
              "PU 007 - Madagali East Market",
              "PU 008 - Madagali East Community Hall",
              "PU 009 - Madagali East Health Center",
              "PU 010 - Madagali East Mosque"
            ]
          },
          "madagali-west": {
            name: "Madagali West",
            pollingUnits: [
              "PU 011 - Madagali West Primary School",
              "PU 012 - Madagali West Market",
              "PU 013 - Madagali West Community Hall",
              "PU 014 - Madagali West Health Center",
              "PU 015 - Madagali West Mosque"
            ]
          },
          "madagali-north": {
            name: "Madagali North",
            pollingUnits: [
              "PU 016 - Madagali North Primary School",
              "PU 017 - Madagali North Market",
              "PU 018 - Madagali North Community Hall",
              "PU 019 - Madagali North Health Center",
              "PU 020 - Madagali North Mosque"
            ]
          },
          "madagali-south": {
            name: "Madagali South",
            pollingUnits: [
              "PU 021 - Madagali South Primary School",
              "PU 022 - Madagali South Market",
              "PU 023 - Madagali South Community Hall",
              "PU 024 - Madagali South Health Center",
              "PU 025 - Madagali South Mosque"
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
              "PU 001 - Maiha Central Market",
              "PU 002 - Maiha Central Primary School",
              "PU 003 - Maiha Central Community Hall",
              "PU 004 - Maiha Central Health Center",
              "PU 005 - Maiha Central Mosque"
            ]
          },
          "maiha-east": {
            name: "Maiha East",
            pollingUnits: [
              "PU 006 - Maiha East Primary School",
              "PU 007 - Maiha East Market",
              "PU 008 - Maiha East Community Hall",
              "PU 009 - Maiha East Health Center",
              "PU 010 - Maiha East Mosque"
            ]
          },
          "maiha-west": {
            name: "Maiha West",
            pollingUnits: [
              "PU 011 - Maiha West Primary School",
              "PU 012 - Maiha West Market",
              "PU 013 - Maiha West Community Hall",
              "PU 014 - Maiha West Health Center",
              "PU 015 - Maiha West Mosque"
            ]
          },
          "maiha-north": {
            name: "Maiha North",
            pollingUnits: [
              "PU 016 - Maiha North Primary School",
              "PU 017 - Maiha North Market",
              "PU 018 - Maiha North Community Hall",
              "PU 019 - Maiha North Health Center",
              "PU 020 - Maiha North Mosque"
            ]
          },
          "maiha-south": {
            name: "Maiha South",
            pollingUnits: [
              "PU 021 - Maiha South Primary School",
              "PU 022 - Maiha South Market",
              "PU 023 - Maiha South Community Hall",
              "PU 024 - Maiha South Health Center",
              "PU 025 - Maiha South Mosque"
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
              "PU 001 - Mayo Belwa Central Market",
              "PU 002 - Mayo Belwa Central Primary School",
              "PU 003 - Mayo Belwa Central Community Hall",
              "PU 004 - Mayo Belwa Central Health Center",
              "PU 005 - Mayo Belwa Central Mosque"
            ]
          },
          "mayo-belwa-east": {
            name: "Mayo Belwa East",
            pollingUnits: [
              "PU 006 - Mayo Belwa East Primary School",
              "PU 007 - Mayo Belwa East Market",
              "PU 008 - Mayo Belwa East Community Hall",
              "PU 009 - Mayo Belwa East Health Center",
              "PU 010 - Mayo Belwa East Mosque"
            ]
          },
          "mayo-belwa-west": {
            name: "Mayo Belwa West",
            pollingUnits: [
              "PU 011 - Mayo Belwa West Primary School",
              "PU 012 - Mayo Belwa West Market",
              "PU 013 - Mayo Belwa West Community Hall",
              "PU 014 - Mayo Belwa West Health Center",
              "PU 015 - Mayo Belwa West Mosque"
            ]
          },
          "mayo-belwa-north": {
            name: "Mayo Belwa North",
            pollingUnits: [
              "PU 016 - Mayo Belwa North Primary School",
              "PU 017 - Mayo Belwa North Market",
              "PU 018 - Mayo Belwa North Community Hall",
              "PU 019 - Mayo Belwa North Health Center",
              "PU 020 - Mayo Belwa North Mosque"
            ]
          },
          "mayo-belwa-south": {
            name: "Mayo Belwa South",
            pollingUnits: [
              "PU 021 - Mayo Belwa South Primary School",
              "PU 022 - Mayo Belwa South Market",
              "PU 023 - Mayo Belwa South Community Hall",
              "PU 024 - Mayo Belwa South Health Center",
              "PU 025 - Mayo Belwa South Mosque"
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
              "PU 001 - Michika Central Market",
              "PU 002 - Michika Central Primary School",
              "PU 003 - Michika Central Community Hall",
              "PU 004 - Michika Central Health Center",
              "PU 005 - Michika Central Mosque"
            ]
          },
          "michika-east": {
            name: "Michika East",
            pollingUnits: [
              "PU 006 - Michika East Primary School",
              "PU 007 - Michika East Market",
              "PU 008 - Michika East Community Hall",
              "PU 009 - Michika East Health Center",
              "PU 010 - Michika East Mosque"
            ]
          },
          "michika-west": {
            name: "Michika West",
            pollingUnits: [
              "PU 011 - Michika West Primary School",
              "PU 012 - Michika West Market",
              "PU 013 - Michika West Community Hall",
              "PU 014 - Michika West Health Center",
              "PU 015 - Michika West Mosque"
            ]
          },
          "michika-north": {
            name: "Michika North",
            pollingUnits: [
              "PU 016 - Michika North Primary School",
              "PU 017 - Michika North Market",
              "PU 018 - Michika North Community Hall",
              "PU 019 - Michika North Health Center",
              "PU 020 - Michika North Mosque"
            ]
          },
          "michika-south": {
            name: "Michika South",
            pollingUnits: [
              "PU 021 - Michika South Primary School",
              "PU 022 - Michika South Market",
              "PU 023 - Michika South Community Hall",
              "PU 024 - Michika South Health Center",
              "PU 025 - Michika South Mosque"
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
              "PU 001 - Mubi North Central Market",
              "PU 002 - Mubi North Central Primary School",
              "PU 003 - Mubi North Central Community Hall",
              "PU 004 - Mubi North Central Health Center",
              "PU 005 - Mubi North Central Mosque"
            ]
          },
          "mubi-north-east": {
            name: "Mubi North East",
            pollingUnits: [
              "PU 006 - Mubi North East Primary School",
              "PU 007 - Mubi North East Market",
              "PU 008 - Mubi North East Community Hall",
              "PU 009 - Mubi North East Health Center",
              "PU 010 - Mubi North East Mosque"
            ]
          },
          "mubi-north-west": {
            name: "Mubi North West",
            pollingUnits: [
              "PU 011 - Mubi North West Primary School",
              "PU 012 - Mubi North West Market",
              "PU 013 - Mubi North West Community Hall",
              "PU 014 - Mubi North West Health Center",
              "PU 015 - Mubi North West Mosque"
            ]
          },
          "mubi-north-north": {
            name: "Mubi North North",
            pollingUnits: [
              "PU 016 - Mubi North North Primary School",
              "PU 017 - Mubi North North Market",
              "PU 018 - Mubi North North Community Hall",
              "PU 019 - Mubi North North Health Center",
              "PU 020 - Mubi North North Mosque"
            ]
          },
          "mubi-north-south": {
            name: "Mubi North South",
            pollingUnits: [
              "PU 021 - Mubi North South Primary School",
              "PU 022 - Mubi North South Market",
              "PU 023 - Mubi North South Community Hall",
              "PU 024 - Mubi North South Health Center",
              "PU 025 - Mubi North South Mosque"
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
              "PU 001 - Mubi South Central Market",
              "PU 002 - Mubi South Central Primary School",
              "PU 003 - Mubi South Central Community Hall",
              "PU 004 - Mubi South Central Health Center",
              "PU 005 - Mubi South Central Mosque"
            ]
          },
          "mubi-south-east": {
            name: "Mubi South East",
            pollingUnits: [
              "PU 006 - Mubi South East Primary School",
              "PU 007 - Mubi South East Market",
              "PU 008 - Mubi South East Community Hall",
              "PU 009 - Mubi South East Health Center",
              "PU 010 - Mubi South East Mosque"
            ]
          },
          "mubi-south-west": {
            name: "Mubi South West",
            pollingUnits: [
              "PU 011 - Mubi South West Primary School",
              "PU 012 - Mubi South West Market",
              "PU 013 - Mubi South West Community Hall",
              "PU 014 - Mubi South West Health Center",
              "PU 015 - Mubi South West Mosque"
            ]
          },
          "mubi-south-north": {
            name: "Mubi South North",
            pollingUnits: [
              "PU 016 - Mubi South North Primary School",
              "PU 017 - Mubi South North Market",
              "PU 018 - Mubi South North Community Hall",
              "PU 019 - Mubi South North Health Center",
              "PU 020 - Mubi South North Mosque"
            ]
          },
          "mubi-south-south": {
            name: "Mubi South South",
            pollingUnits: [
              "PU 021 - Mubi South South Primary School",
              "PU 022 - Mubi South South Market",
              "PU 023 - Mubi South South Community Hall",
              "PU 024 - Mubi South South Health Center",
              "PU 025 - Mubi South South Mosque"
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
              "PU 001 - Numan Central Market",
              "PU 002 - Numan Central Primary School",
              "PU 003 - Numan Central Community Hall",
              "PU 004 - Numan Central Health Center",
              "PU 005 - Numan Central Mosque"
            ]
          },
          "numan-east": {
            name: "Numan East",
            pollingUnits: [
              "PU 006 - Numan East Primary School",
              "PU 007 - Numan East Market",
              "PU 008 - Numan East Community Hall",
              "PU 009 - Numan East Health Center",
              "PU 010 - Numan East Mosque"
            ]
          },
          "numan-west": {
            name: "Numan West",
            pollingUnits: [
              "PU 011 - Numan West Primary School",
              "PU 012 - Numan West Market",
              "PU 013 - Numan West Community Hall",
              "PU 014 - Numan West Health Center",
              "PU 015 - Numan West Mosque"
            ]
          },
          "numan-north": {
            name: "Numan North",
            pollingUnits: [
              "PU 016 - Numan North Primary School",
              "PU 017 - Numan North Market",
              "PU 018 - Numan North Community Hall",
              "PU 019 - Numan North Health Center",
              "PU 020 - Numan North Mosque"
            ]
          },
          "numan-south": {
            name: "Numan South",
            pollingUnits: [
              "PU 021 - Numan South Primary School",
              "PU 022 - Numan South Market",
              "PU 023 - Numan South Community Hall",
              "PU 024 - Numan South Health Center",
              "PU 025 - Numan South Mosque"
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
              "PU 001 - Shelleng Central Market",
              "PU 002 - Shelleng Central Primary School",
              "PU 003 - Shelleng Central Community Hall",
              "PU 004 - Shelleng Central Health Center",
              "PU 005 - Shelleng Central Mosque"
            ]
          },
          "shelleng-east": {
            name: "Shelleng East",
            pollingUnits: [
              "PU 006 - Shelleng East Primary School",
              "PU 007 - Shelleng East Market",
              "PU 008 - Shelleng East Community Hall",
              "PU 009 - Shelleng East Health Center",
              "PU 010 - Shelleng East Mosque"
            ]
          },
          "shelleng-west": {
            name: "Shelleng West",
            pollingUnits: [
              "PU 011 - Shelleng West Primary School",
              "PU 012 - Shelleng West Market",
              "PU 013 - Shelleng West Community Hall",
              "PU 014 - Shelleng West Health Center",
              "PU 015 - Shelleng West Mosque"
            ]
          },
          "shelleng-north": {
            name: "Shelleng North",
            pollingUnits: [
              "PU 016 - Shelleng North Primary School",
              "PU 017 - Shelleng North Market",
              "PU 018 - Shelleng North Community Hall",
              "PU 019 - Shelleng North Health Center",
              "PU 020 - Shelleng North Mosque"
            ]
          },
          "shelleng-south": {
            name: "Shelleng South",
            pollingUnits: [
              "PU 021 - Shelleng South Primary School",
              "PU 022 - Shelleng South Market",
              "PU 023 - Shelleng South Community Hall",
              "PU 024 - Shelleng South Health Center",
              "PU 025 - Shelleng South Mosque"
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
              "PU 001 - Song Central Market",
              "PU 002 - Song Central Primary School",
              "PU 003 - Song Central Community Hall",
              "PU 004 - Song Central Health Center",
              "PU 005 - Song Central Mosque"
            ]
          },
          "song-east": {
            name: "Song East",
            pollingUnits: [
              "PU 006 - Song East Primary School",
              "PU 007 - Song East Market",
              "PU 008 - Song East Community Hall",
              "PU 009 - Song East Health Center",
              "PU 010 - Song East Mosque"
            ]
          },
          "song-west": {
            name: "Song West",
            pollingUnits: [
              "PU 011 - Song West Primary School",
              "PU 012 - Song West Market",
              "PU 013 - Song West Community Hall",
              "PU 014 - Song West Health Center",
              "PU 015 - Song West Mosque"
            ]
          },
          "song-north": {
            name: "Song North",
            pollingUnits: [
              "PU 016 - Song North Primary School",
              "PU 017 - Song North Market",
              "PU 018 - Song North Community Hall",
              "PU 019 - Song North Health Center",
              "PU 020 - Song North Mosque"
            ]
          },
          "song-south": {
            name: "Song South",
            pollingUnits: [
              "PU 021 - Song South Primary School",
              "PU 022 - Song South Market",
              "PU 023 - Song South Community Hall",
              "PU 024 - Song South Health Center",
              "PU 025 - Song South Mosque"
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
              "PU 001 - Toungo Central Market",
              "PU 002 - Toungo Central Primary School",
              "PU 003 - Toungo Central Community Hall",
              "PU 004 - Toungo Central Health Center",
              "PU 005 - Toungo Central Mosque"
            ]
          },
          "toungo-east": {
            name: "Toungo East",
            pollingUnits: [
              "PU 006 - Toungo East Primary School",
              "PU 007 - Toungo East Market",
              "PU 008 - Toungo East Community Hall",
              "PU 009 - Toungo East Health Center",
              "PU 010 - Toungo East Mosque"
            ]
          },
          "toungo-west": {
            name: "Toungo West",
            pollingUnits: [
              "PU 011 - Toungo West Primary School",
              "PU 012 - Toungo West Market",
              "PU 013 - Toungo West Community Hall",
              "PU 014 - Toungo West Health Center",
              "PU 015 - Toungo West Mosque"
            ]
          },
          "toungo-north": {
            name: "Toungo North",
            pollingUnits: [
              "PU 016 - Toungo North Primary School",
              "PU 017 - Toungo North Market",
              "PU 018 - Toungo North Community Hall",
              "PU 019 - Toungo North Health Center",
              "PU 020 - Toungo North Mosque"
            ]
          },
          "toungo-south": {
            name: "Toungo South",
            pollingUnits: [
              "PU 021 - Toungo South Primary School",
              "PU 022 - Toungo South Market",
              "PU 023 - Toungo South Community Hall",
              "PU 024 - Toungo South Health Center",
              "PU 025 - Toungo South Mosque"
            ]
          }
        }
      },
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
              "PU 005 - Yola North Central Mosque"
            ]
          },
          "yola-north-east": {
            name: "Yola North East",
            pollingUnits: [
              "PU 006 - Yola North East Primary School",
              "PU 007 - Yola North East Market",
              "PU 008 - Yola North East Community Hall",
              "PU 009 - Yola North East Health Center",
              "PU 010 - Yola North East Mosque"
            ]
          },
          "yola-north-west": {
            name: "Yola North West",
            pollingUnits: [
              "PU 011 - Yola North West Primary School",
              "PU 012 - Yola North West Market",
              "PU 013 - Yola North West Community Hall",
              "PU 014 - Yola North West Health Center",
              "PU 015 - Yola North West Mosque"
            ]
          },
          "yola-north-north": {
            name: "Yola North North",
            pollingUnits: [
              "PU 016 - Yola North North Primary School",
              "PU 017 - Yola North North Market",
              "PU 018 - Yola North North Community Hall",
              "PU 019 - Yola North North Health Center",
              "PU 020 - Yola North North Mosque"
            ]
          },
          "yola-north-south": {
            name: "Yola North South",
            pollingUnits: [
              "PU 021 - Yola North South Primary School",
              "PU 022 - Yola North South Market",
              "PU 023 - Yola North South Community Hall",
              "PU 024 - Yola North South Health Center",
              "PU 025 - Yola North South Mosque"
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
              "PU 001 - Yola South Central Market",
              "PU 002 - Yola South Central Primary School",
              "PU 003 - Yola South Central Community Hall",
              "PU 004 - Yola South Central Health Center",
              "PU 005 - Yola South Central Mosque"
            ]
          },
          "yola-south-east": {
            name: "Yola South East",
            pollingUnits: [
              "PU 006 - Yola South East Primary School",
              "PU 007 - Yola South East Market",
              "PU 008 - Yola South East Community Hall",
              "PU 009 - Yola South East Health Center",
              "PU 010 - Yola South East Mosque"
            ]
          },
          "yola-south-west": {
            name: "Yola South West",
            pollingUnits: [
              "PU 011 - Yola South West Primary School",
              "PU 012 - Yola South West Market",
              "PU 013 - Yola South West Community Hall",
              "PU 014 - Yola South West Health Center",
              "PU 015 - Yola South West Mosque"
            ]
          },
          "yola-south-north": {
            name: "Yola South North",
            pollingUnits: [
              "PU 016 - Yola South North Primary School",
              "PU 017 - Yola South North Market",
              "PU 018 - Yola South North Community Hall",
              "PU 019 - Yola South North Health Center",
              "PU 020 - Yola South North Mosque"
            ]
          },
          "yola-south-south": {
            name: "Yola South South",
            pollingUnits: [
              "PU 021 - Yola South South Primary School",
              "PU 022 - Yola South South Market",
              "PU 023 - Yola South South Community Hall",
              "PU 024 - Yola South South Health Center",
              "PU 025 - Yola South South Mosque"
            ]
          }
        }
      }
    }
  },
  akwaIbom: {
    name: "Akwa Ibom",
    lgas: {
      "abak": { 
        name: "Abak", 
        wards: {
          "abak-central": {
            name: "Abak Central",
            pollingUnits: [
              "PU 001 - Abak Central Market",
              "PU 002 - Abak Central Primary School",
              "PU 003 - Abak Central Community Hall",
              "PU 004 - Abak Central Health Center",
              "PU 005 - Abak Central Mosque"
            ]
          },
          "abak-east": {
            name: "Abak East",
            pollingUnits: [
              "PU 006 - Abak East Primary School",
              "PU 007 - Abak East Market",
              "PU 008 - Abak East Community Hall",
              "PU 009 - Abak East Health Center",
              "PU 010 - Abak East Mosque"
            ]
          },
          "abak-west": {
            name: "Abak West",
            pollingUnits: [
              "PU 011 - Abak West Primary School",
              "PU 012 - Abak West Market",
              "PU 013 - Abak West Community Hall",
              "PU 014 - Abak West Health Center",
              "PU 015 - Abak West Mosque"
            ]
          },
          "abak-south": {
            name: "Abak South",
            pollingUnits: [
              "PU 016 - Abak South Primary School",
              "PU 017 - Abak South Market",
              "PU 018 - Abak South Community Hall",
              "PU 019 - Abak South Health Center",
              "PU 020 - Abak South Mosque"
            ]
          },
          "abak-north": {
            name: "Abak North",
            pollingUnits: [
              "PU 021 - Abak North Primary School",
              "PU 022 - Abak North Market",
              "PU 023 - Abak North Community Hall",
              "PU 024 - Abak North Health Center",
              "PU 025 - Abak North Mosque"
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
              "PU 001 - Eastern Obolo Central Market",
              "PU 002 - Eastern Obolo Central Primary School",
              "PU 003 - Eastern Obolo Central Community Hall",
              "PU 004 - Eastern Obolo Central Health Center",
              "PU 005 - Eastern Obolo Central Mosque"
            ]
          },
          "eastern-obolo-east": {
            name: "Eastern Obolo East",
            pollingUnits: [
              "PU 006 - Eastern Obolo East Primary School",
              "PU 007 - Eastern Obolo East Market",
              "PU 008 - Eastern Obolo East Community Hall",
              "PU 009 - Eastern Obolo East Health Center",
              "PU 010 - Eastern Obolo East Mosque"
            ]
          },
          "eastern-obolo-west": {
            name: "Eastern Obolo West",
            pollingUnits: [
              "PU 011 - Eastern Obolo West Primary School",
              "PU 012 - Eastern Obolo West Market",
              "PU 013 - Eastern Obolo West Community Hall",
              "PU 014 - Eastern Obolo West Health Center",
              "PU 015 - Eastern Obolo West Mosque"
            ]
          },
          "eastern-obolo-south": {
            name: "Eastern Obolo South",
            pollingUnits: [
              "PU 016 - Eastern Obolo South Primary School",
              "PU 017 - Eastern Obolo South Market",
              "PU 018 - Eastern Obolo South Community Hall",
              "PU 019 - Eastern Obolo South Health Center",
              "PU 020 - Eastern Obolo South Mosque"
            ]
          },
          "eastern-obolo-north": {
            name: "Eastern Obolo North",
            pollingUnits: [
              "PU 021 - Eastern Obolo North Primary School",
              "PU 022 - Eastern Obolo North Market",
              "PU 023 - Eastern Obolo North Community Hall",
              "PU 024 - Eastern Obolo North Health Center",
              "PU 025 - Eastern Obolo North Mosque"
            ]
          }
        }
      },
      "eket": { 
        name: "Eket", 
        wards: {
          "eket-central": {
            name: "Eket Central",
            pollingUnits: [
              "PU 001 - Eket Central Market",
              "PU 002 - Eket Central Primary School",
              "PU 003 - Eket Central Community Hall",
              "PU 004 - Eket Central Health Center",
              "PU 005 - Eket Central Mosque"
            ]
          },
          "eket-east": {
            name: "Eket East",
            pollingUnits: [
              "PU 006 - Eket East Primary School",
              "PU 007 - Eket East Market",
              "PU 008 - Eket East Community Hall",
              "PU 009 - Eket East Health Center",
              "PU 010 - Eket East Mosque"
            ]
          },
          "eket-west": {
            name: "Eket West",
            pollingUnits: [
              "PU 011 - Eket West Primary School",
              "PU 012 - Eket West Market",
              "PU 013 - Eket West Community Hall",
              "PU 014 - Eket West Health Center",
              "PU 015 - Eket West Mosque"
            ]
          },
          "eket-south": {
            name: "Eket South",
            pollingUnits: [
              "PU 016 - Eket South Primary School",
              "PU 017 - Eket South Market",
              "PU 018 - Eket South Community Hall",
              "PU 019 - Eket South Health Center",
              "PU 020 - Eket South Mosque"
            ]
          },
          "eket-north": {
            name: "Eket North",
            pollingUnits: [
              "PU 021 - Eket North Primary School",
              "PU 022 - Eket North Market",
              "PU 023 - Eket North Community Hall",
              "PU 024 - Eket North Health Center",
              "PU 025 - Eket North Mosque"
            ]
          }
        }
      },
      "esit-eket": { 
        name: "Esit Eket", 
        wards: {
          "esit-eket-central": {
            name: "Esit Eket Central",
            pollingUnits: [
              "PU 001 - Esit Eket Central Market",
              "PU 002 - Esit Eket Central Primary School",
              "PU 003 - Esit Eket Central Community Hall",
              "PU 004 - Esit Eket Central Health Center",
              "PU 005 - Esit Eket Central Mosque"
            ]
          },
          "esit-eket-east": {
            name: "Esit Eket East",
            pollingUnits: [
              "PU 006 - Esit Eket East Primary School",
              "PU 007 - Esit Eket East Market",
              "PU 008 - Esit Eket East Community Hall",
              "PU 009 - Esit Eket East Health Center",
              "PU 010 - Esit Eket East Mosque"
            ]
          },
          "esit-eket-west": {
            name: "Esit Eket West",
            pollingUnits: [
              "PU 011 - Esit Eket West Primary School",
              "PU 012 - Esit Eket West Market",
              "PU 013 - Esit Eket West Community Hall",
              "PU 014 - Esit Eket West Health Center",
              "PU 015 - Esit Eket West Mosque"
            ]
          },
          "esit-eket-south": {
            name: "Esit Eket South",
            pollingUnits: [
              "PU 016 - Esit Eket South Primary School",
              "PU 017 - Esit Eket South Market",
              "PU 018 - Esit Eket South Community Hall",
              "PU 019 - Esit Eket South Health Center",
              "PU 020 - Esit Eket South Mosque"
            ]
          },
          "esit-eket-north": {
            name: "Esit Eket North",
            pollingUnits: [
              "PU 021 - Esit Eket North Primary School",
              "PU 022 - Esit Eket North Market",
              "PU 023 - Esit Eket North Community Hall",
              "PU 024 - Esit Eket North Health Center",
              "PU 025 - Esit Eket North Mosque"
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
              "PU 001 - Essien Udim Central Market",
              "PU 002 - Essien Udim Central Primary School",
              "PU 003 - Essien Udim Central Community Hall",
              "PU 004 - Essien Udim Central Health Center",
              "PU 005 - Essien Udim Central Mosque"
            ]
          },
          "essien-udim-east": {
            name: "Essien Udim East",
            pollingUnits: [
              "PU 006 - Essien Udim East Primary School",
              "PU 007 - Essien Udim East Market",
              "PU 008 - Essien Udim East Community Hall",
              "PU 009 - Essien Udim East Health Center",
              "PU 010 - Essien Udim East Mosque"
            ]
          },
          "essien-udim-west": {
            name: "Essien Udim West",
            pollingUnits: [
              "PU 011 - Essien Udim West Primary School",
              "PU 012 - Essien Udim West Market",
              "PU 013 - Essien Udim West Community Hall",
              "PU 014 - Essien Udim West Health Center",
              "PU 015 - Essien Udim West Mosque"
            ]
          },
          "essien-udim-south": {
            name: "Essien Udim South",
            pollingUnits: [
              "PU 016 - Essien Udim South Primary School",
              "PU 017 - Essien Udim South Market",
              "PU 018 - Essien Udim South Community Hall",
              "PU 019 - Essien Udim South Health Center",
              "PU 020 - Essien Udim South Mosque"
            ]
          },
          "essien-udim-north": {
            name: "Essien Udim North",
            pollingUnits: [
              "PU 021 - Essien Udim North Primary School",
              "PU 022 - Essien Udim North Market",
              "PU 023 - Essien Udim North Community Hall",
              "PU 024 - Essien Udim North Health Center",
              "PU 025 - Essien Udim North Mosque"
            ]
          }
        }
      },
      "etim-ekpo": { name: "Etim Ekpo", wards: {} },
      "etinan": { name: "Etinan", wards: {} },
      "ibeno": { name: "Ibeno", wards: {} },
      "ibesikpo-asutan": { name: "Ibesikpo Asutan", wards: {} },
      "ibiono-ibom": { name: "Ibiono Ibom", wards: {} },
      "ika": { name: "Ika", wards: {} },
      "ikono": { name: "Ikono", wards: {} },
      "ikot-abasi": { name: "Ikot Abasi", wards: {} },
      "ikot-ekpene": { name: "Ikot Ekpene", wards: {} },
      "ini": { name: "Ini", wards: {} },
      "itu": { name: "Itu", wards: {} },
      "mbo": { name: "Mbo", wards: {} },
      "mkpat-enin": { name: "Mkpat Enin", wards: {} },
      "nsit-atai": { name: "Nsit Atai", wards: {} },
      "nsit-ibom": { name: "Nsit Ibom", wards: {} },
      "nsit-ubium": { name: "Nsit Ubium", wards: {} },
      "obot-akara": { name: "Obot Akara", wards: {} },
      "okobo": { name: "Okobo", wards: {} },
      "onna": { name: "Onna", wards: {} },
      "oruk-anam": { name: "Oruk Anam", wards: {} },
      "udung-uko": { name: "Udung Uko", wards: {} },
      "ukanafun": { name: "Ukanafun", wards: {} },
      "uruan": { name: "Uruan", wards: {} },
      "urue-offong-oruko": { name: "Urue Offong Oruko", wards: {} },
      "uyo": { name: "Uyo", wards: {} }
    }
  },
  anambra: {
    name: "Anambra",
    lgas: {
      "aguata": { 
        name: "Aguata", 
        wards: {
          "aguata-central": {
            name: "Aguata Central",
            pollingUnits: [
              "PU 001 - Aguata Central Market",
              "PU 002 - Aguata Central Primary School",
              "PU 003 - Aguata Central Community Hall",
              "PU 004 - Aguata Central Health Center",
              "PU 005 - Aguata Central Church"
            ]
          },
          "aguata-east": {
            name: "Aguata East",
            pollingUnits: [
              "PU 006 - Aguata East Primary School",
              "PU 007 - Aguata East Market",
              "PU 008 - Aguata East Community Hall",
              "PU 009 - Aguata East Health Center",
              "PU 010 - Aguata East Church"
            ]
          },
          "aguata-west": {
            name: "Aguata West",
            pollingUnits: [
              "PU 011 - Aguata West Primary School",
              "PU 012 - Aguata West Market",
              "PU 013 - Aguata West Community Hall",
              "PU 014 - Aguata West Health Center",
              "PU 015 - Aguata West Church"
            ]
          },
          "aguata-north": {
            name: "Aguata North",
            pollingUnits: [
              "PU 016 - Aguata North Primary School",
              "PU 017 - Aguata North Market",
              "PU 018 - Aguata North Community Hall",
              "PU 019 - Aguata North Health Center",
              "PU 020 - Aguata North Church"
            ]
          },
          "aguata-south": {
            name: "Aguata South",
            pollingUnits: [
              "PU 021 - Aguata South Primary School",
              "PU 022 - Aguata South Market",
              "PU 023 - Aguata South Community Hall",
              "PU 024 - Aguata South Health Center",
              "PU 025 - Aguata South Church"
            ]
          }
        }
      },
      "anambra-east": { 
        name: "Anambra East", 
        wards: {
          "anambra-east-central": {
            name: "Anambra East Central",
            pollingUnits: [
              "PU 001 - Anambra East Central Market",
              "PU 002 - Anambra East Central Primary School",
              "PU 003 - Anambra East Central Community Hall",
              "PU 004 - Anambra East Central Health Center",
              "PU 005 - Anambra East Central Church"
            ]
          },
          "anambra-east-east": {
            name: "Anambra East East",
            pollingUnits: [
              "PU 006 - Anambra East East Primary School",
              "PU 007 - Anambra East East Market",
              "PU 008 - Anambra East East Community Hall",
              "PU 009 - Anambra East East Health Center",
              "PU 010 - Anambra East East Church"
            ]
          },
          "anambra-east-west": {
            name: "Anambra East West",
            pollingUnits: [
              "PU 011 - Anambra East West Primary School",
              "PU 012 - Anambra East West Market",
              "PU 013 - Anambra East West Community Hall",
              "PU 014 - Anambra East West Health Center",
              "PU 015 - Anambra East West Church"
            ]
          },
          "anambra-east-north": {
            name: "Anambra East North",
            pollingUnits: [
              "PU 016 - Anambra East North Primary School",
              "PU 017 - Anambra East North Market",
              "PU 018 - Anambra East North Community Hall",
              "PU 019 - Anambra East North Health Center",
              "PU 020 - Anambra East North Church"
            ]
          },
          "anambra-east-south": {
            name: "Anambra East South",
            pollingUnits: [
              "PU 021 - Anambra East South Primary School",
              "PU 022 - Anambra East South Market",
              "PU 023 - Anambra East South Community Hall",
              "PU 024 - Anambra East South Health Center",
              "PU 025 - Anambra East South Church"
            ]
          }
        }
      },
      "anambra-west": { 
        name: "Anambra West", 
        wards: {
          "anambra-west-central": {
            name: "Anambra West Central",
            pollingUnits: [
              "PU 001 - Anambra West Central Market",
              "PU 002 - Anambra West Central Primary School",
              "PU 003 - Anambra West Central Community Hall",
              "PU 004 - Anambra West Central Health Center",
              "PU 005 - Anambra West Central Church"
            ]
          },
          "anambra-west-east": {
            name: "Anambra West East",
            pollingUnits: [
              "PU 006 - Anambra West East Primary School",
              "PU 007 - Anambra West East Market",
              "PU 008 - Anambra West East Community Hall",
              "PU 009 - Anambra West East Health Center",
              "PU 010 - Anambra West East Church"
            ]
          },
          "anambra-west-west": {
            name: "Anambra West West",
            pollingUnits: [
              "PU 011 - Anambra West West Primary School",
              "PU 012 - Anambra West West Market",
              "PU 013 - Anambra West West Community Hall",
              "PU 014 - Anambra West West Health Center",
              "PU 015 - Anambra West West Church"
            ]
          },
          "anambra-west-north": {
            name: "Anambra West North",
            pollingUnits: [
              "PU 016 - Anambra West North Primary School",
              "PU 017 - Anambra West North Market",
              "PU 018 - Anambra West North Community Hall",
              "PU 019 - Anambra West North Health Center",
              "PU 020 - Anambra West North Church"
            ]
          },
          "anambra-west-south": {
            name: "Anambra West South",
            pollingUnits: [
              "PU 021 - Anambra West South Primary School",
              "PU 022 - Anambra West South Market",
              "PU 023 - Anambra West South Community Hall",
              "PU 024 - Anambra West South Health Center",
              "PU 025 - Anambra West South Church"
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
              "PU 001 - Anaocha Central Market",
              "PU 002 - Anaocha Central Primary School",
              "PU 003 - Anaocha Central Community Hall",
              "PU 004 - Anaocha Central Health Center",
              "PU 005 - Anaocha Central Church"
            ]
          },
          "anaocha-east": {
            name: "Anaocha East",
            pollingUnits: [
              "PU 006 - Anaocha East Primary School",
              "PU 007 - Anaocha East Market",
              "PU 008 - Anaocha East Community Hall",
              "PU 009 - Anaocha East Health Center",
              "PU 010 - Anaocha East Church"
            ]
          },
          "anaocha-west": {
            name: "Anaocha West",
            pollingUnits: [
              "PU 011 - Anaocha West Primary School",
              "PU 012 - Anaocha West Market",
              "PU 013 - Anaocha West Community Hall",
              "PU 014 - Anaocha West Health Center",
              "PU 015 - Anaocha West Church"
            ]
          },
          "anaocha-north": {
            name: "Anaocha North",
            pollingUnits: [
              "PU 016 - Anaocha North Primary School",
              "PU 017 - Anaocha North Market",
              "PU 018 - Anaocha North Community Hall",
              "PU 019 - Anaocha North Health Center",
              "PU 020 - Anaocha North Church"
            ]
          },
          "anaocha-south": {
            name: "Anaocha South",
            pollingUnits: [
              "PU 021 - Anaocha South Primary School",
              "PU 022 - Anaocha South Market",
              "PU 023 - Anaocha South Community Hall",
              "PU 024 - Anaocha South Health Center",
              "PU 025 - Anaocha South Church"
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
              "PU 001 - Awka North Central Market",
              "PU 002 - Awka North Central Primary School",
              "PU 003 - Awka North Central Community Hall",
              "PU 004 - Awka North Central Health Center",
              "PU 005 - Awka North Central Church"
            ]
          },
          "awka-north-east": {
            name: "Awka North East",
            pollingUnits: [
              "PU 006 - Awka North East Primary School",
              "PU 007 - Awka North East Market",
              "PU 008 - Awka North East Community Hall",
              "PU 009 - Awka North East Health Center",
              "PU 010 - Awka North East Church"
            ]
          },
          "awka-north-west": {
            name: "Awka North West",
            pollingUnits: [
              "PU 011 - Awka North West Primary School",
              "PU 012 - Awka North West Market",
              "PU 013 - Awka North West Community Hall",
              "PU 014 - Awka North West Health Center",
              "PU 015 - Awka North West Church"
            ]
          },
          "awka-north-north": {
            name: "Awka North North",
            pollingUnits: [
              "PU 016 - Awka North North Primary School",
              "PU 017 - Awka North North Market",
              "PU 018 - Awka North North Community Hall",
              "PU 019 - Awka North North Health Center",
              "PU 020 - Awka North North Church"
            ]
          },
          "awka-north-south": {
            name: "Awka North South",
            pollingUnits: [
              "PU 021 - Awka North South Primary School",
              "PU 022 - Awka North South Market",
              "PU 023 - Awka North South Community Hall",
              "PU 024 - Awka North South Health Center",
              "PU 025 - Awka North South Church"
            ]
          }
        }
      },
      "awka-south": { name: "Awka South", wards: {} },
      "ayamelum": { name: "Ayamelum", wards: {} },
      "dunukofia": { name: "Dunukofia", wards: {} },
      "ekwusigo": { name: "Ekwusigo", wards: {} },
      "idemili-north": { name: "Idemili North", wards: {} },
      "idemili-south": { name: "Idemili South", wards: {} },
      "ihiala": { name: "Ihiala", wards: {} },
      "njikoka": { name: "Njikoka", wards: {} },
      "nnewi-north": { name: "Nnewi North", wards: {} },
      "nnewi-south": { name: "Nnewi South", wards: {} },
      "ogbaru": { name: "Ogbaru", wards: {} },
      "onitsha-north": { name: "Onitsha North", wards: {} },
      "onitsha-south": { name: "Onitsha South", wards: {} },
      "orumba-north": { name: "Orumba North", wards: {} },
      "orumba-south": { name: "Orumba South", wards: {} },
      "oyi": { name: "Oyi", wards: {} }
    }
  },
  bauchi: {
    name: "Bauchi",
    lgas: {
      "alkaleri": { 
        name: "Alkaleri", 
        wards: {
          "alkaleri-central": {
            name: "Alkaleri Central",
            pollingUnits: [
              "PU 001 - Alkaleri Central Market",
              "PU 002 - Alkaleri Central Primary School",
              "PU 003 - Alkaleri Central Community Hall",
              "PU 004 - Alkaleri Central Health Center",
              "PU 005 - Alkaleri Central Mosque"
            ]
          },
          "alkaleri-east": {
            name: "Alkaleri East",
            pollingUnits: [
              "PU 006 - Alkaleri East Primary School",
              "PU 007 - Alkaleri East Market",
              "PU 008 - Alkaleri East Community Hall",
              "PU 009 - Alkaleri East Health Center",
              "PU 010 - Alkaleri East Mosque"
            ]
          },
          "alkaleri-west": {
            name: "Alkaleri West",
            pollingUnits: [
              "PU 011 - Alkaleri West Primary School",
              "PU 012 - Alkaleri West Market",
              "PU 013 - Alkaleri West Community Hall",
              "PU 014 - Alkaleri West Health Center",
              "PU 015 - Alkaleri West Mosque"
            ]
          },
          "alkaleri-north": {
            name: "Alkaleri North",
            pollingUnits: [
              "PU 016 - Alkaleri North Primary School",
              "PU 017 - Alkaleri North Market",
              "PU 018 - Alkaleri North Community Hall",
              "PU 019 - Alkaleri North Health Center",
              "PU 020 - Alkaleri North Mosque"
            ]
          },
          "alkaleri-south": {
            name: "Alkaleri South",
            pollingUnits: [
              "PU 021 - Alkaleri South Primary School",
              "PU 022 - Alkaleri South Market",
              "PU 023 - Alkaleri South Community Hall",
              "PU 024 - Alkaleri South Health Center",
              "PU 025 - Alkaleri South Mosque"
            ]
          }
        }
      },
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
              "PU 005 - Bauchi Central Mosque"
            ]
          },
          "bauchi-east": {
            name: "Bauchi East",
            pollingUnits: [
              "PU 006 - Bauchi East Primary School",
              "PU 007 - Bauchi East Market",
              "PU 008 - Bauchi East Community Hall",
              "PU 009 - Bauchi East Health Center",
              "PU 010 - Bauchi East Mosque"
            ]
          },
          "bauchi-west": {
            name: "Bauchi West",
            pollingUnits: [
              "PU 011 - Bauchi West Primary School",
              "PU 012 - Bauchi West Market",
              "PU 013 - Bauchi West Community Hall",
              "PU 014 - Bauchi West Health Center",
              "PU 015 - Bauchi West Mosque"
            ]
          },
          "bauchi-north": {
            name: "Bauchi North",
            pollingUnits: [
              "PU 016 - Bauchi North Primary School",
              "PU 017 - Bauchi North Market",
              "PU 018 - Bauchi North Community Hall",
              "PU 019 - Bauchi North Health Center",
              "PU 020 - Bauchi North Mosque"
            ]
          },
          "bauchi-south": {
            name: "Bauchi South",
            pollingUnits: [
              "PU 021 - Bauchi South Primary School",
              "PU 022 - Bauchi South Market",
              "PU 023 - Bauchi South Community Hall",
              "PU 024 - Bauchi South Health Center",
              "PU 025 - Bauchi South Mosque"
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
              "PU 001 - Bogoro Central Market",
              "PU 002 - Bogoro Central Primary School",
              "PU 003 - Bogoro Central Community Hall",
              "PU 004 - Bogoro Central Health Center",
              "PU 005 - Bogoro Central Mosque"
            ]
          },
          "bogoro-east": {
            name: "Bogoro East",
            pollingUnits: [
              "PU 006 - Bogoro East Primary School",
              "PU 007 - Bogoro East Market",
              "PU 008 - Bogoro East Community Hall",
              "PU 009 - Bogoro East Health Center",
              "PU 010 - Bogoro East Mosque"
            ]
          },
          "bogoro-west": {
            name: "Bogoro West",
            pollingUnits: [
              "PU 011 - Bogoro West Primary School",
              "PU 012 - Bogoro West Market",
              "PU 013 - Bogoro West Community Hall",
              "PU 014 - Bogoro West Health Center",
              "PU 015 - Bogoro West Mosque"
            ]
          },
          "bogoro-north": {
            name: "Bogoro North",
            pollingUnits: [
              "PU 016 - Bogoro North Primary School",
              "PU 017 - Bogoro North Market",
              "PU 018 - Bogoro North Community Hall",
              "PU 019 - Bogoro North Health Center",
              "PU 020 - Bogoro North Mosque"
            ]
          },
          "bogoro-south": {
            name: "Bogoro South",
            pollingUnits: [
              "PU 021 - Bogoro South Primary School",
              "PU 022 - Bogoro South Market",
              "PU 023 - Bogoro South Community Hall",
              "PU 024 - Bogoro South Health Center",
              "PU 025 - Bogoro South Mosque"
            ]
          }
        }
      },
      "damban": { 
        name: "Damban", 
        wards: {
          "damban-central": {
            name: "Damban Central",
            pollingUnits: [
              "PU 001 - Damban Central Market",
              "PU 002 - Damban Central Primary School",
              "PU 003 - Damban Central Community Hall",
              "PU 004 - Damban Central Health Center",
              "PU 005 - Damban Central Mosque"
            ]
          },
          "damban-east": {
            name: "Damban East",
            pollingUnits: [
              "PU 006 - Damban East Primary School",
              "PU 007 - Damban East Market",
              "PU 008 - Damban East Community Hall",
              "PU 009 - Damban East Health Center",
              "PU 010 - Damban East Mosque"
            ]
          },
          "damban-west": {
            name: "Damban West",
            pollingUnits: [
              "PU 011 - Damban West Primary School",
              "PU 012 - Damban West Market",
              "PU 013 - Damban West Community Hall",
              "PU 014 - Damban West Health Center",
              "PU 015 - Damban West Mosque"
            ]
          },
          "damban-north": {
            name: "Damban North",
            pollingUnits: [
              "PU 016 - Damban North Primary School",
              "PU 017 - Damban North Market",
              "PU 018 - Damban North Community Hall",
              "PU 019 - Damban North Health Center",
              "PU 020 - Damban North Mosque"
            ]
          },
          "damban-south": {
            name: "Damban South",
            pollingUnits: [
              "PU 021 - Damban South Primary School",
              "PU 022 - Damban South Market",
              "PU 023 - Damban South Community Hall",
              "PU 024 - Damban South Health Center",
              "PU 025 - Damban South Mosque"
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
              "PU 001 - Darazo Central Market",
              "PU 002 - Darazo Central Primary School",
              "PU 003 - Darazo Central Community Hall",
              "PU 004 - Darazo Central Health Center",
              "PU 005 - Darazo Central Mosque"
            ]
          },
          "darazo-east": {
            name: "Darazo East",
            pollingUnits: [
              "PU 006 - Darazo East Primary School",
              "PU 007 - Darazo East Market",
              "PU 008 - Darazo East Community Hall",
              "PU 009 - Darazo East Health Center",
              "PU 010 - Darazo East Mosque"
            ]
          },
          "darazo-west": {
            name: "Darazo West",
            pollingUnits: [
              "PU 011 - Darazo West Primary School",
              "PU 012 - Darazo West Market",
              "PU 013 - Darazo West Community Hall",
              "PU 014 - Darazo West Health Center",
              "PU 015 - Darazo West Mosque"
            ]
          },
          "darazo-north": {
            name: "Darazo North",
            pollingUnits: [
              "PU 016 - Darazo North Primary School",
              "PU 017 - Darazo North Market",
              "PU 018 - Darazo North Community Hall",
              "PU 019 - Darazo North Health Center",
              "PU 020 - Darazo North Mosque"
            ]
          },
          "darazo-south": {
            name: "Darazo South",
            pollingUnits: [
              "PU 021 - Darazo South Primary School",
              "PU 022 - Darazo South Market",
              "PU 023 - Darazo South Community Hall",
              "PU 024 - Darazo South Health Center",
              "PU 025 - Darazo South Mosque"
            ]
          }
        }
      },
      "dass": { name: "Dass", wards: {} },
      "gamawa": { name: "Gamawa", wards: {} },
      "ganjuwa": { name: "Ganjuwa", wards: {} },
      "giade": { name: "Giade", wards: {} },
      "itas-gadau": { name: "Itas Gadau", wards: {} },
      "jamaare": { name: "Jamaare", wards: {} },
      "katagum": { name: "Katagum", wards: {} },
      "kirfi": { name: "Kirfi", wards: {} },
      "misau": { name: "Misau", wards: {} },
      "ningi": { name: "Ningi", wards: {} },
      "shira": { name: "Shira", wards: {} },
      "tafawa-balewa": { name: "Tafawa Balewa", wards: {} },
      "toro": { name: "Toro", wards: {} },
      "warji": { name: "Warji", wards: {} },
      "zaki": { name: "Zaki", wards: {} }
    }
  },
  bayelsa: {
    name: "Bayelsa",
    lgas: {
      "brass": { 
        name: "Brass", 
        wards: {
          "brass-central": {
            name: "Brass Central",
            pollingUnits: [
              "PU 001 - Brass Central Market",
              "PU 002 - Brass Central Primary School",
              "PU 003 - Brass Central Community Hall",
              "PU 004 - Brass Central Health Center",
              "PU 005 - Brass Central Church"
            ]
          },
          "brass-east": {
            name: "Brass East",
            pollingUnits: [
              "PU 006 - Brass East Primary School",
              "PU 007 - Brass East Market",
              "PU 008 - Brass East Community Hall",
              "PU 009 - Brass East Health Center",
              "PU 010 - Brass East Church"
            ]
          },
          "brass-west": {
            name: "Brass West",
            pollingUnits: [
              "PU 011 - Brass West Primary School",
              "PU 012 - Brass West Market",
              "PU 013 - Brass West Community Hall",
              "PU 014 - Brass West Health Center",
              "PU 015 - Brass West Church"
            ]
          },
          "brass-north": {
            name: "Brass North",
            pollingUnits: [
              "PU 016 - Brass North Primary School",
              "PU 017 - Brass North Market",
              "PU 018 - Brass North Community Hall",
              "PU 019 - Brass North Health Center",
              "PU 020 - Brass North Church"
            ]
          },
          "brass-south": {
            name: "Brass South",
            pollingUnits: [
              "PU 021 - Brass South Primary School",
              "PU 022 - Brass South Market",
              "PU 023 - Brass South Community Hall",
              "PU 024 - Brass South Health Center",
              "PU 025 - Brass South Church"
            ]
          }
        }
      },
      "egbedor": { 
        name: "Egbedor", 
        wards: {
          "egbedor-central": {
            name: "Egbedor Central",
            pollingUnits: [
              "PU 001 - Egbedor Central Market",
              "PU 002 - Egbedor Central Primary School",
              "PU 003 - Egbedor Central Community Hall",
              "PU 004 - Egbedor Central Health Center",
              "PU 005 - Egbedor Central Church"
            ]
          },
          "egbedor-east": {
            name: "Egbedor East",
            pollingUnits: [
              "PU 006 - Egbedor East Primary School",
              "PU 007 - Egbedor East Market",
              "PU 008 - Egbedor East Community Hall",
              "PU 009 - Egbedor East Health Center",
              "PU 010 - Egbedor East Church"
            ]
          },
          "egbedor-west": {
            name: "Egbedor West",
            pollingUnits: [
              "PU 011 - Egbedor West Primary School",
              "PU 012 - Egbedor West Market",
              "PU 013 - Egbedor West Community Hall",
              "PU 014 - Egbedor West Health Center",
              "PU 015 - Egbedor West Church"
            ]
          },
          "egbedor-north": {
            name: "Egbedor North",
            pollingUnits: [
              "PU 016 - Egbedor North Primary School",
              "PU 017 - Egbedor North Market",
              "PU 018 - Egbedor North Community Hall",
              "PU 019 - Egbedor North Health Center",
              "PU 020 - Egbedor North Church"
            ]
          },
          "egbedor-south": {
            name: "Egbedor South",
            pollingUnits: [
              "PU 021 - Egbedor South Primary School",
              "PU 022 - Egbedor South Market",
              "PU 023 - Egbedor South Community Hall",
              "PU 024 - Egbedor South Health Center",
              "PU 025 - Egbedor South Church"
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
              "PU 001 - Kolokuma Opokuma Central Market",
              "PU 002 - Kolokuma Opokuma Central Primary School",
              "PU 003 - Kolokuma Opokuma Central Community Hall",
              "PU 004 - Kolokuma Opokuma Central Health Center",
              "PU 005 - Kolokuma Opokuma Central Church"
            ]
          },
          "kolokuma-opokuma-east": {
            name: "Kolokuma Opokuma East",
            pollingUnits: [
              "PU 006 - Kolokuma Opokuma East Primary School",
              "PU 007 - Kolokuma Opokuma East Market",
              "PU 008 - Kolokuma Opokuma East Community Hall",
              "PU 009 - Kolokuma Opokuma East Health Center",
              "PU 010 - Kolokuma Opokuma East Church"
            ]
          },
          "kolokuma-opokuma-west": {
            name: "Kolokuma Opokuma West",
            pollingUnits: [
              "PU 011 - Kolokuma Opokuma West Primary School",
              "PU 012 - Kolokuma Opokuma West Market",
              "PU 013 - Kolokuma Opokuma West Community Hall",
              "PU 014 - Kolokuma Opokuma West Health Center",
              "PU 015 - Kolokuma Opokuma West Church"
            ]
          },
          "kolokuma-opokuma-north": {
            name: "Kolokuma Opokuma North",
            pollingUnits: [
              "PU 016 - Kolokuma Opokuma North Primary School",
              "PU 017 - Kolokuma Opokuma North Market",
              "PU 018 - Kolokuma Opokuma North Community Hall",
              "PU 019 - Kolokuma Opokuma North Health Center",
              "PU 020 - Kolokuma Opokuma North Church"
            ]
          },
          "kolokuma-opokuma-south": {
            name: "Kolokuma Opokuma South",
            pollingUnits: [
              "PU 021 - Kolokuma Opokuma South Primary School",
              "PU 022 - Kolokuma Opokuma South Market",
              "PU 023 - Kolokuma Opokuma South Community Hall",
              "PU 024 - Kolokuma Opokuma South Health Center",
              "PU 025 - Kolokuma Opokuma South Church"
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
              "PU 001 - Nembe Central Market",
              "PU 002 - Nembe Central Primary School",
              "PU 003 - Nembe Central Community Hall",
              "PU 004 - Nembe Central Health Center",
              "PU 005 - Nembe Central Church"
            ]
          },
          "nembe-east": {
            name: "Nembe East",
            pollingUnits: [
              "PU 006 - Nembe East Primary School",
              "PU 007 - Nembe East Market",
              "PU 008 - Nembe East Community Hall",
              "PU 009 - Nembe East Health Center",
              "PU 010 - Nembe East Church"
            ]
          },
          "nembe-west": {
            name: "Nembe West",
            pollingUnits: [
              "PU 011 - Nembe West Primary School",
              "PU 012 - Nembe West Market",
              "PU 013 - Nembe West Community Hall",
              "PU 014 - Nembe West Health Center",
              "PU 015 - Nembe West Church"
            ]
          },
          "nembe-north": {
            name: "Nembe North",
            pollingUnits: [
              "PU 016 - Nembe North Primary School",
              "PU 017 - Nembe North Market",
              "PU 018 - Nembe North Community Hall",
              "PU 019 - Nembe North Health Center",
              "PU 020 - Nembe North Church"
            ]
          },
          "nembe-south": {
            name: "Nembe South",
            pollingUnits: [
              "PU 021 - Nembe South Primary School",
              "PU 022 - Nembe South Market",
              "PU 023 - Nembe South Community Hall",
              "PU 024 - Nembe South Health Center",
              "PU 025 - Nembe South Church"
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
              "PU 001 - Ogbia Central Market",
              "PU 002 - Ogbia Central Primary School",
              "PU 003 - Ogbia Central Community Hall",
              "PU 004 - Ogbia Central Health Center",
              "PU 005 - Ogbia Central Church"
            ]
          },
          "ogbia-east": {
            name: "Ogbia East",
            pollingUnits: [
              "PU 006 - Ogbia East Primary School",
              "PU 007 - Ogbia East Market",
              "PU 008 - Ogbia East Community Hall",
              "PU 009 - Ogbia East Health Center",
              "PU 010 - Ogbia East Church"
            ]
          },
          "ogbia-west": {
            name: "Ogbia West",
            pollingUnits: [
              "PU 011 - Ogbia West Primary School",
              "PU 012 - Ogbia West Market",
              "PU 013 - Ogbia West Community Hall",
              "PU 014 - Ogbia West Health Center",
              "PU 015 - Ogbia West Church"
            ]
          },
          "ogbia-north": {
            name: "Ogbia North",
            pollingUnits: [
              "PU 016 - Ogbia North Primary School",
              "PU 017 - Ogbia North Market",
              "PU 018 - Ogbia North Community Hall",
              "PU 019 - Ogbia North Health Center",
              "PU 020 - Ogbia North Church"
            ]
          },
          "ogbia-south": {
            name: "Ogbia South",
            pollingUnits: [
              "PU 021 - Ogbia South Primary School",
              "PU 022 - Ogbia South Market",
              "PU 023 - Ogbia South Community Hall",
              "PU 024 - Ogbia South Health Center",
              "PU 025 - Ogbia South Church"
            ]
          }
        }
      },
      "sagbama": { name: "Sagbama", wards: {} },
      "southern-ijaw": { name: "Southern Ijaw", wards: {} },
      "yenagoa": { name: "Yenagoa", wards: {} }
    }
  },
  benue: {
    name: "Benue",
    lgas: {
      "adavi": { 
        name: "Adavi", 
        wards: {
          "adavi-central": {
            name: "Adavi Central",
            pollingUnits: [
              "PU 001 - Adavi Central Market",
              "PU 002 - Adavi Central Primary School",
              "PU 003 - Adavi Central Community Hall",
              "PU 004 - Adavi Central Health Center",
              "PU 005 - Adavi Central Mosque"
            ]
          },
          "adavi-east": {
            name: "Adavi East",
            pollingUnits: [
              "PU 006 - Adavi East Primary School",
              "PU 007 - Adavi East Market",
              "PU 008 - Adavi East Community Hall",
              "PU 009 - Adavi East Health Center",
              "PU 010 - Adavi East Mosque"
            ]
          },
          "adavi-west": {
            name: "Adavi West",
            pollingUnits: [
              "PU 011 - Adavi West Primary School",
              "PU 012 - Adavi West Market",
              "PU 013 - Adavi West Community Hall",
              "PU 014 - Adavi West Health Center",
              "PU 015 - Adavi West Mosque"
            ]
          },
          "adavi-north": {
            name: "Adavi North",
            pollingUnits: [
              "PU 016 - Adavi North Primary School",
              "PU 017 - Adavi North Market",
              "PU 018 - Adavi North Community Hall",
              "PU 019 - Adavi North Health Center",
              "PU 020 - Adavi North Mosque"
            ]
          },
          "adavi-south": {
            name: "Adavi South",
            pollingUnits: [
              "PU 021 - Adavi South Primary School",
              "PU 022 - Adavi South Market",
              "PU 023 - Adavi South Community Hall",
              "PU 024 - Adavi South Health Center",
              "PU 025 - Adavi South Mosque"
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
              "PU 001 - Agatu Central Market",
              "PU 002 - Agatu Central Primary School",
              "PU 003 - Agatu Central Community Hall",
              "PU 004 - Agatu Central Health Center",
              "PU 005 - Agatu Central Church"
            ]
          },
          "agatu-east": {
            name: "Agatu East",
            pollingUnits: [
              "PU 006 - Agatu East Primary School",
              "PU 007 - Agatu East Market",
              "PU 008 - Agatu East Community Hall",
              "PU 009 - Agatu East Health Center",
              "PU 010 - Agatu East Church"
            ]
          },
          "agatu-west": {
            name: "Agatu West",
            pollingUnits: [
              "PU 011 - Agatu West Primary School",
              "PU 012 - Agatu West Market",
              "PU 013 - Agatu West Community Hall",
              "PU 014 - Agatu West Health Center",
              "PU 015 - Agatu West Church"
            ]
          },
          "agatu-north": {
            name: "Agatu North",
            pollingUnits: [
              "PU 016 - Agatu North Primary School",
              "PU 017 - Agatu North Market",
              "PU 018 - Agatu North Community Hall",
              "PU 019 - Agatu North Health Center",
              "PU 020 - Agatu North Church"
            ]
          },
          "agatu-south": {
            name: "Agatu South",
            pollingUnits: [
              "PU 021 - Agatu South Primary School",
              "PU 022 - Agatu South Market",
              "PU 023 - Agatu South Community Hall",
              "PU 024 - Agatu South Health Center",
              "PU 025 - Agatu South Church"
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
              "PU 001 - Apa Central Market",
              "PU 002 - Apa Central Primary School",
              "PU 003 - Apa Central Community Hall",
              "PU 004 - Apa Central Health Center",
              "PU 005 - Apa Central Church"
            ]
          },
          "apa-east": {
            name: "Apa East",
            pollingUnits: [
              "PU 006 - Apa East Primary School",
              "PU 007 - Apa East Market",
              "PU 008 - Apa East Community Hall",
              "PU 009 - Apa East Health Center",
              "PU 010 - Apa East Church"
            ]
          },
          "apa-west": {
            name: "Apa West",
            pollingUnits: [
              "PU 011 - Apa West Primary School",
              "PU 012 - Apa West Market",
              "PU 013 - Apa West Community Hall",
              "PU 014 - Apa West Health Center",
              "PU 015 - Apa West Church"
            ]
          },
          "apa-north": {
            name: "Apa North",
            pollingUnits: [
              "PU 016 - Apa North Primary School",
              "PU 017 - Apa North Market",
              "PU 018 - Apa North Community Hall",
              "PU 019 - Apa North Health Center",
              "PU 020 - Apa North Church"
            ]
          },
          "apa-south": {
            name: "Apa South",
            pollingUnits: [
              "PU 021 - Apa South Primary School",
              "PU 022 - Apa South Market",
              "PU 023 - Apa South Community Hall",
              "PU 024 - Apa South Health Center",
              "PU 025 - Apa South Church"
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
              "PU 001 - Buruku Central Market",
              "PU 002 - Buruku Central Primary School",
              "PU 003 - Buruku Central Community Hall",
              "PU 004 - Buruku Central Health Center",
              "PU 005 - Buruku Central Church"
            ]
          },
          "buruku-east": {
            name: "Buruku East",
            pollingUnits: [
              "PU 006 - Buruku East Primary School",
              "PU 007 - Buruku East Market",
              "PU 008 - Buruku East Community Hall",
              "PU 009 - Buruku East Health Center",
              "PU 010 - Buruku East Church"
            ]
          },
          "buruku-west": {
            name: "Buruku West",
            pollingUnits: [
              "PU 011 - Buruku West Primary School",
              "PU 012 - Buruku West Market",
              "PU 013 - Buruku West Community Hall",
              "PU 014 - Buruku West Health Center",
              "PU 015 - Buruku West Church"
            ]
          },
          "buruku-north": {
            name: "Buruku North",
            pollingUnits: [
              "PU 016 - Buruku North Primary School",
              "PU 017 - Buruku North Market",
              "PU 018 - Buruku North Community Hall",
              "PU 019 - Buruku North Health Center",
              "PU 020 - Buruku North Church"
            ]
          },
          "buruku-south": {
            name: "Buruku South",
            pollingUnits: [
              "PU 021 - Buruku South Primary School",
              "PU 022 - Buruku South Market",
              "PU 023 - Buruku South Community Hall",
              "PU 024 - Buruku South Health Center",
              "PU 025 - Buruku South Church"
            ]
          }
        }
      },
      "gboko": { 
        name: "Gboko", 
        wards: {
          "gboko-central": {
            name: "Gboko Central",
            pollingUnits: [
              "PU 001 - Gboko Central Market",
              "PU 002 - Gboko Central Primary School",
              "PU 003 - Gboko Central Community Hall",
              "PU 004 - Gboko Central Health Center",
              "PU 005 - Gboko Central Church"
            ]
          },
          "gboko-east": {
            name: "Gboko East",
            pollingUnits: [
              "PU 006 - Gboko East Primary School",
              "PU 007 - Gboko East Market",
              "PU 008 - Gboko East Community Hall",
              "PU 009 - Gboko East Health Center",
              "PU 010 - Gboko East Church"
            ]
          },
          "gboko-west": {
            name: "Gboko West",
            pollingUnits: [
              "PU 011 - Gboko West Primary School",
              "PU 012 - Gboko West Market",
              "PU 013 - Gboko West Community Hall",
              "PU 014 - Gboko West Health Center",
              "PU 015 - Gboko West Church"
            ]
          },
          "gboko-north": {
            name: "Gboko North",
            pollingUnits: [
              "PU 016 - Gboko North Primary School",
              "PU 017 - Gboko North Market",
              "PU 018 - Gboko North Community Hall",
              "PU 019 - Gboko North Health Center",
              "PU 020 - Gboko North Church"
            ]
          },
          "gboko-south": {
            name: "Gboko South",
            pollingUnits: [
              "PU 021 - Gboko South Primary School",
              "PU 022 - Gboko South Market",
              "PU 023 - Gboko South Community Hall",
              "PU 024 - Gboko South Health Center",
              "PU 025 - Gboko South Church"
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
              "PU 001 - Guma Central Market",
              "PU 002 - Guma Central Primary School",
              "PU 003 - Guma Central Community Hall",
              "PU 004 - Guma Central Health Center",
              "PU 005 - Guma Central Mosque"
            ]
          },
          "guma-east": {
            name: "Guma East",
            pollingUnits: [
              "PU 006 - Guma East Primary School",
              "PU 007 - Guma East Market",
              "PU 008 - Guma East Community Hall",
              "PU 009 - Guma East Health Center",
              "PU 010 - Guma East Mosque"
            ]
          },
          "guma-west": {
            name: "Guma West",
            pollingUnits: [
              "PU 011 - Guma West Primary School",
              "PU 012 - Guma West Market",
              "PU 013 - Guma West Community Hall",
              "PU 014 - Guma West Health Center",
              "PU 015 - Guma West Mosque"
            ]
          },
          "guma-north": {
            name: "Guma North",
            pollingUnits: [
              "PU 016 - Guma North Primary School",
              "PU 017 - Guma North Market",
              "PU 018 - Guma North Community Hall",
              "PU 019 - Guma North Health Center",
              "PU 020 - Guma North Mosque"
            ]
          },
          "guma-south": {
            name: "Guma South",
            pollingUnits: [
              "PU 021 - Guma South Primary School",
              "PU 022 - Guma South Market",
              "PU 023 - Guma South Community Hall",
              "PU 024 - Guma South Health Center",
              "PU 025 - Guma South Mosque"
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
              "PU 001 - Gwer East Central Market",
              "PU 002 - Gwer East Central Primary School",
              "PU 003 - Gwer East Central Community Hall",
              "PU 004 - Gwer East Central Health Center",
              "PU 005 - Gwer East Central Mosque"
            ]
          },
          "gwer-east-east": {
            name: "Gwer East East",
            pollingUnits: [
              "PU 006 - Gwer East East Primary School",
              "PU 007 - Gwer East East Market",
              "PU 008 - Gwer East East Community Hall",
              "PU 009 - Gwer East East Health Center",
              "PU 010 - Gwer East East Church"
            ]
          },
          "gwer-east-west": {
            name: "Gwer East West",
            pollingUnits: [
              "PU 011 - Gwer East West Primary School",
              "PU 012 - Gwer East West Market",
              "PU 013 - Gwer East West Community Hall",
              "PU 014 - Gwer East West Health Center",
              "PU 015 - Gwer East West Church"
            ]
          },
          "gwer-east-north": {
            name: "Gwer East North",
            pollingUnits: [
              "PU 016 - Gwer East North Primary School",
              "PU 017 - Gwer East North Market",
              "PU 018 - Gwer East North Community Hall",
              "PU 019 - Gwer East North Health Center",
              "PU 020 - Gwer East North Church"
            ]
          },
          "gwer-east-south": {
            name: "Gwer East South",
            pollingUnits: [
              "PU 021 - Gwer East South Primary School",
              "PU 022 - Gwer East South Market",
              "PU 023 - Gwer East South Community Hall",
              "PU 024 - Gwer East South Health Center",
              "PU 025 - Gwer East South Church"
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
              "PU 001 - Gwer West Central Market",
              "PU 002 - Gwer West Central Primary School",
              "PU 003 - Gwer West Central Community Hall",
              "PU 004 - Gwer West Central Health Center",
              "PU 005 - Gwer West Central Mosque"
            ]
          },
          "gwer-west-east": {
            name: "Gwer West East",
            pollingUnits: [
              "PU 006 - Gwer West East Primary School",
              "PU 007 - Gwer West East Market",
              "PU 008 - Gwer West East Community Hall",
              "PU 009 - Gwer West East Health Center",
              "PU 010 - Gwer West East Church"
            ]
          },
          "gwer-west-west": {
            name: "Gwer West West",
            pollingUnits: [
              "PU 011 - Gwer West West Primary School",
              "PU 012 - Gwer West West Market",
              "PU 013 - Gwer West West Community Hall",
              "PU 014 - Gwer West West Health Center",
              "PU 015 - Gwer West West Church"
            ]
          },
          "gwer-west-north": {
            name: "Gwer West North",
            pollingUnits: [
              "PU 016 - Gwer West North Primary School",
              "PU 017 - Gwer West North Market",
              "PU 018 - Gwer West North Community Hall",
              "PU 019 - Gwer West North Health Center",
              "PU 020 - Gwer West North Church"
            ]
          },
          "gwer-west-south": {
            name: "Gwer West South",
            pollingUnits: [
              "PU 021 - Gwer West South Primary School",
              "PU 022 - Gwer West South Market",
              "PU 023 - Gwer West South Community Hall",
              "PU 024 - Gwer West South Health Center",
              "PU 025 - Gwer West South Church"
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
              "PU 001 - Katsina Ala Central Market",
              "PU 002 - Katsina Ala Central Primary School",
              "PU 003 - Katsina Ala Central Community Hall",
              "PU 004 - Katsina Ala Central Health Center",
              "PU 005 - Katsina Ala Central Mosque"
            ]
          },
          "katsina-ala-east": {
            name: "Katsina Ala East",
            pollingUnits: [
              "PU 006 - Katsina Ala East Primary School",
              "PU 007 - Katsina Ala East Market",
              "PU 008 - Katsina Ala East Community Hall",
              "PU 009 - Katsina Ala East Health Center",
              "PU 010 - Katsina Ala East Mosque"
            ]
          },
          "katsina-ala-west": {
            name: "Katsina Ala West",
            pollingUnits: [
              "PU 011 - Katsina Ala West Primary School",
              "PU 012 - Katsina Ala West Market",
              "PU 013 - Katsina Ala West Community Hall",
              "PU 014 - Katsina Ala West Health Center",
              "PU 015 - Katsina Ala West Church"
            ]
          },
          "katsina-ala-north": {
            name: "Katsina Ala North",
            pollingUnits: [
              "PU 016 - Katsina Ala North Primary School",
              "PU 017 - Katsina Ala North Market",
              "PU 018 - Katsina Ala North Community Hall",
              "PU 019 - Katsina Ala North Health Center",
              "PU 020 - Katsina Ala North Mosque"
            ]
          },
          "katsina-ala-south": {
            name: "Katsina Ala South",
            pollingUnits: [
              "PU 021 - Katsina Ala South Primary School",
              "PU 022 - Katsina Ala South Market",
              "PU 023 - Katsina Ala South Community Hall",
              "PU 024 - Katsina Ala South Health Center",
              "PU 025 - Katsina Ala South Mosque"
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
              "PU 001 - Konshisha Central Market",
              "PU 002 - Konshisha Central Primary School",
              "PU 003 - Konshisha Central Community Hall",
              "PU 004 - Konshisha Central Health Center",
              "PU 005 - Konshisha Central Mosque"
            ]
          },
          "konshisha-east": {
            name: "Konshisha East",
            pollingUnits: [
              "PU 006 - Konshisha East Primary School",
              "PU 007 - Konshisha East Market",
              "PU 008 - Konshisha East Community Hall",
              "PU 009 - Konshisha East Health Center",
              "PU 010 - Konshisha East Mosque"
            ]
          },
          "konshisha-west": {
            name: "Konshisha West",
            pollingUnits: [
              "PU 011 - Konshisha West Primary School",
              "PU 012 - Konshisha West Market",
              "PU 013 - Konshisha West Community Hall",
              "PU 014 - Konshisha West Health Center",
              "PU 015 - Konshisha West Church"
            ]
          },
          "konshisha-north": {
            name: "Konshisha North",
            pollingUnits: [
              "PU 016 - Konshisha North Primary School",
              "PU 017 - Konshisha North Market",
              "PU 018 - Konshisha North Community Hall",
              "PU 019 - Konshisha North Health Center",
              "PU 020 - Konshisha North Mosque"
            ]
          },
          "konshisha-south": {
            name: "Konshisha South",
            pollingUnits: [
              "PU 021 - Konshisha South Primary School",
              "PU 022 - Konshisha South Market",
              "PU 023 - Konshisha South Community Hall",
              "PU 024 - Konshisha South Health Center",
              "PU 025 - Konshisha South Church"
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
              "PU 001 - Kwande Central Market",
              "PU 002 - Kwande Central Primary School",
              "PU 003 - Kwande Central Community Hall",
              "PU 004 - Kwande Central Health Center",
              "PU 005 - Kwande Central Mosque"
            ]
          },
          "kwande-east": {
            name: "Kwande East",
            pollingUnits: [
              "PU 006 - Kwande East Primary School",
              "PU 007 - Kwande East Market",
              "PU 008 - Kwande East Community Hall",
              "PU 009 - Kwande East Health Center",
              "PU 010 - Kwande East Mosque"
            ]
          },
          "kwande-west": {
            name: "Kwande West",
            pollingUnits: [
              "PU 011 - Kwande West Primary School",
              "PU 012 - Kwande West Market",
              "PU 013 - Kwande West Community Hall",
              "PU 014 - Kwande West Health Center",
              "PU 015 - Kwande West Church"
            ]
          },
          "kwande-north": {
            name: "Kwande North",
            pollingUnits: [
              "PU 016 - Kwande North Primary School",
              "PU 017 - Kwande North Market",
              "PU 018 - Kwande North Community Hall",
              "PU 019 - Kwande North Health Center",
              "PU 020 - Kwande North Church"
            ]
          },
          "kwande-south": {
            name: "Kwande South",
            pollingUnits: [
              "PU 021 - Kwande South Primary School",
              "PU 022 - Kwande South Market",
              "PU 023 - Kwande South Community Hall",
              "PU 024 - Kwande South Health Center",
              "PU 025 - Kwande South Church"
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
              "PU 001 - Logo Central Market",
              "PU 002 - Logo Central Primary School",
              "PU 003 - Logo Central Community Hall",
              "PU 004 - Logo Central Health Center",
              "PU 005 - Logo Central Mosque"
            ]
          },
          "logo-east": {
            name: "Logo East",
            pollingUnits: [
              "PU 006 - Logo East Primary School",
              "PU 007 - Logo East Market",
              "PU 008 - Logo East Community Hall",
              "PU 009 - Logo East Health Center",
              "PU 010 - Logo East Mosque"
            ]
          },
          "logo-west": {
            name: "Logo West",
            pollingUnits: [
              "PU 011 - Logo West Primary School",
              "PU 012 - Logo West Market",
              "PU 013 - Logo West Community Hall",
              "PU 014 - Logo West Health Center",
              "PU 015 - Logo West Church"
            ]
          },
          "logo-north": {
            name: "Logo North",
            pollingUnits: [
              "PU 016 - Logo North Primary School",
              "PU 017 - Logo North Market",
              "PU 018 - Logo North Community Hall",
              "PU 019 - Logo North Health Center",
              "PU 020 - Logo North Mosque"
            ]
          },
          "logo-south": {
            name: "Logo South",
            pollingUnits: [
              "PU 021 - Logo South Primary School",
              "PU 022 - Logo South Market",
              "PU 023 - Logo South Community Hall",
              "PU 024 - Logo South Health Center",
              "PU 025 - Logo South Church"
            ]
          }
        }
      },
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
              "PU 005 - Makurdi Central Mosque"
            ]
          },
          "makurdi-east": {
            name: "Makurdi East",
            pollingUnits: [
              "PU 006 - Makurdi East Primary School",
              "PU 007 - Makurdi East Market",
              "PU 008 - Makurdi East Community Hall",
              "PU 009 - Makurdi East Health Center",
              "PU 010 - Makurdi East Mosque"
            ]
          },
          "makurdi-west": {
            name: "Makurdi West",
            pollingUnits: [
              "PU 011 - Makurdi West Primary School",
              "PU 012 - Makurdi West Market",
              "PU 013 - Makurdi West Community Hall",
              "PU 014 - Makurdi West Health Center",
              "PU 015 - Makurdi West Church"
            ]
          },
          "makurdi-north": {
            name: "Makurdi North",
            pollingUnits: [
              "PU 016 - Makurdi North Primary School",
              "PU 017 - Makurdi North Market",
              "PU 018 - Makurdi North Community Hall",
              "PU 019 - Makurdi North Health Center",
              "PU 020 - Makurdi North Mosque"
            ]
          },
          "makurdi-south": {
            name: "Makurdi South",
            pollingUnits: [
              "PU 021 - Makurdi South Primary School",
              "PU 022 - Makurdi South Market",
              "PU 023 - Makurdi South Community Hall",
              "PU 024 - Makurdi South Health Center",
              "PU 025 - Makurdi South Church"
            ]
          }
        }
      },
      "obio-akara": { 
        name: "Obio Akara", 
        wards: {
          "obio-akara-central": {
            name: "Obio Akara Central",
            pollingUnits: [
              "PU 001 - Obio Akara Central Market",
              "PU 002 - Obio Akara Central Primary School",
              "PU 003 - Obio Akara Central Community Hall",
              "PU 004 - Obio Akara Central Health Center",
              "PU 005 - Obio Akara Central Mosque"
            ]
          },
          "obio-akara-east": {
            name: "Obio Akara East",
            pollingUnits: [
              "PU 006 - Obio Akara East Primary School",
              "PU 007 - Obio Akara East Market",
              "PU 008 - Obio Akara East Community Hall",
              "PU 009 - Obio Akara East Health Center",
              "PU 010 - Obio Akara East Mosque"
            ]
          },
          "obio-akara-west": {
            name: "Obio Akara West",
            pollingUnits: [
              "PU 011 - Obio Akara West Primary School",
              "PU 012 - Obio Akara West Market",
              "PU 013 - Obio Akara West Community Hall",
              "PU 014 - Obio Akara West Health Center",
              "PU 015 - Obio Akara West Church"
            ]
          },
          "obio-akara-north": {
            name: "Obio Akara North",
            pollingUnits: [
              "PU 016 - Obio Akara North Primary School",
              "PU 017 - Obio Akara North Market",
              "PU 018 - Obio Akara North Community Hall",
              "PU 019 - Obio Akara North Health Center",
              "PU 020 - Obio Akara North Mosque"
            ]
          },
          "obio-akara-south": {
            name: "Obio Akara South",
            pollingUnits: [
              "PU 021 - Obio Akara South Primary School",
              "PU 022 - Obio Akara South Market",
              "PU 023 - Obio Akara South Community Hall",
              "PU 024 - Obio Akara South Health Center",
              "PU 025 - Obio Akara South Church"
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
              "PU 001 - Okobo Central Market",
              "PU 002 - Okobo Central Primary School",
              "PU 003 - Okobo Central Community Hall",
              "PU 004 - Okobo Central Health Center",
              "PU 005 - Okobo Central Mosque"
            ]
          },
          "okobo-east": {
            name: "Okobo East",
            pollingUnits: [
              "PU 006 - Okobo East Primary School",
              "PU 007 - Okobo East Market",
              "PU 008 - Okobo East Community Hall",
              "PU 009 - Okobo East Health Center",
              "PU 010 - Okobo East Mosque"
            ]
          },
          "okobo-west": {
            name: "Okobo West",
            pollingUnits: [
              "PU 011 - Okobo West Primary School",
              "PU 012 - Okobo West Market",
              "PU 013 - Okobo West Community Hall",
              "PU 014 - Okobo West Health Center",
              "PU 015 - Okobo West Church"
            ]
          },
          "okobo-north": {
            name: "Okobo North",
            pollingUnits: [
              "PU 016 - Okobo North Primary School",
              "PU 017 - Okobo North Market",
              "PU 018 - Okobo North Community Hall",
              "PU 019 - Okobo North Health Center",
              "PU 020 - Okobo North Mosque"
            ]
          },
          "okobo-south": {
            name: "Okobo South",
            pollingUnits: [
              "PU 021 - Okobo South Primary School",
              "PU 022 - Okobo South Market",
              "PU 023 - Okobo South Community Hall",
              "PU 024 - Okobo South Health Center",
              "PU 025 - Okobo South Church"
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
              "PU 001 - Onicha Central Market",
              "PU 002 - Onicha Central Primary School",
              "PU 003 - Onicha Central Community Hall",
              "PU 004 - Onicha Central Health Center",
              "PU 005 - Onicha Central Mosque"
            ]
          },
          "onicha-east": {
            name: "Onicha East",
            pollingUnits: [
              "PU 006 - Onicha East Primary School",
              "PU 007 - Onicha East Market",
              "PU 008 - Onicha East Community Hall",
              "PU 009 - Onicha East Health Center",
              "PU 010 - Onicha East Mosque"
            ]
          },
          "onicha-west": {
            name: "Onicha West",
            pollingUnits: [
              "PU 011 - Onicha West Primary School",
              "PU 012 - Onicha West Market",
              "PU 013 - Onicha West Community Hall",
              "PU 014 - Onicha West Health Center",
              "PU 015 - Onicha West Church"
            ]
          },
          "onicha-north": {
            name: "Onicha North",
            pollingUnits: [
              "PU 016 - Onicha North Primary School",
              "PU 017 - Onicha North Market",
              "PU 018 - Onicha North Community Hall",
              "PU 019 - Onicha North Health Center",
              "PU 020 - Onicha North Mosque"
            ]
          },
          "onicha-south": {
            name: "Onicha South",
            pollingUnits: [
              "PU 021 - Onicha South Primary School",
              "PU 022 - Onicha South Market",
              "PU 023 - Onicha South Community Hall",
              "PU 024 - Onicha South Health Center",
              "PU 025 - Onicha South Church"
            ]
          }
        }
      },
      "oruk-anam": { 
        name: "Oruk Anam", 
        wards: {
          "oruk-anam-central": {
            name: "Oruk Anam Central",
            pollingUnits: [
              "PU 001 - Oruk Anam Central Market",
              "PU 002 - Oruk Anam Central Primary School",
              "PU 003 - Oruk Anam Central Community Hall",
              "PU 004 - Oruk Anam Central Health Center",
              "PU 005 - Oruk Anam Central Mosque"
            ]
          },
          "oruk-anam-east": {
            name: "Oruk Anam East",
            pollingUnits: [
              "PU 006 - Oruk Anam East Primary School",
              "PU 007 - Oruk Anam East Market",
              "PU 008 - Oruk Anam East Community Hall",
              "PU 009 - Oruk Anam East Health Center",
              "PU 010 - Oruk Anam East Mosque"
            ]
          },
          "oruk-anam-west": {
            name: "Oruk Anam West",
            pollingUnits: [
              "PU 011 - Oruk Anam West Primary School",
              "PU 012 - Oruk Anam West Market",
              "PU 013 - Oruk Anam West Community Hall",
              "PU 014 - Oruk Anam West Health Center",
              "PU 015 - Oruk Anam West Church"
            ]
          },
          "oruk-anam-north": {
            name: "Oruk Anam North",
            pollingUnits: [
              "PU 016 - Oruk Anam North Primary School",
              "PU 017 - Oruk Anam North Market",
              "PU 018 - Oruk Anam North Community Hall",
              "PU 019 - Oruk Anam North Health Center",
              "PU 020 - Oruk Anam North Mosque"
            ]
          },
          "oruk-anam-south": {
            name: "Oruk Anam South",
            pollingUnits: [
              "PU 021 - Oruk Anam South Primary School",
              "PU 022 - Oruk Anam South Market",
              "PU 023 - Oruk Anam South Community Hall",
              "PU 024 - Oruk Anam South Health Center",
              "PU 025 - Oruk Anam South Church"
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
              "PU 001 - Udung Uko Central Market",
              "PU 002 - Udung Uko Central Primary School",
              "PU 003 - Udung Uko Central Community Hall",
              "PU 004 - Udung Uko Central Health Center",
              "PU 005 - Udung Uko Central Mosque"
            ]
          },
          "udung-uko-east": {
            name: "Udung Uko East",
            pollingUnits: [
              "PU 006 - Udung Uko East Primary School",
              "PU 007 - Udung Uko East Market",
              "PU 008 - Udung Uko East Community Hall",
              "PU 009 - Udung Uko East Health Center",
              "PU 010 - Udung Uko East Mosque"
            ]
          },
          "udung-uko-west": {
            name: "Udung Uko West",
            pollingUnits: [
              "PU 011 - Udung Uko West Primary School",
              "PU 012 - Udung Uko West Market",
              "PU 013 - Udung Uko West Community Hall",
              "PU 014 - Udung Uko West Health Center",
              "PU 015 - Udung Uko West Church"
            ]
          },
          "udung-uko-north": {
            name: "Udung Uko North",
            pollingUnits: [
              "PU 016 - Udung Uko North Primary School",
              "PU 017 - Udung Uko North Market",
              "PU 018 - Udung Uko North Community Hall",
              "PU 019 - Udung Uko North Health Center",
              "PU 020 - Udung Uko North Mosque"
            ]
          },
          "udung-uko-south": {
            name: "Udung Uko South",
            pollingUnits: [
              "PU 021 - Udung Uko South Primary School",
              "PU 022 - Udung Uko South Market",
              "PU 023 - Udung Uko South Community Hall",
              "PU 024 - Udung Uko South Health Center",
              "PU 025 - Udung Uko South Church"
            ]
          }
        }
      },
      "ukanafun": { 
        name: "Ukanafun", 
        wards: {
          "ukanafun-central": {
            name: "Ukanafun Central",
            pollingUnits: [
              "PU 001 - Ukanafun Central Market",
              "PU 002 - Ukanafun Central Primary School",
              "PU 003 - Ukanafun Central Community Hall",
              "PU 004 - Ukanafun Central Health Center",
              "PU 005 - Ukanafun Central Mosque"
            ]
          },
          "ukanafun-east": {
            name: "Ukanafun East",
            pollingUnits: [
              "PU 006 - Ukanafun East Primary School",
              "PU 007 - Ukanafun East Market",
              "PU 008 - Ukanafun East Community Hall",
              "PU 009 - Ukanafun East Health Center",
              "PU 010 - Ukanafun East Mosque"
            ]
          },
          "ukanafun-west": {
            name: "Ukanafun West",
            pollingUnits: [
              "PU 011 - Ukanafun West Primary School",
              "PU 012 - Ukanafun West Market",
              "PU 013 - Ukanafun West Community Hall",
              "PU 014 - Ukanafun West Health Center",
              "PU 015 - Ukanafun West Church"
            ]
          },
          "ukanafun-north": {
            name: "Ukanafun North",
            pollingUnits: [
              "PU 016 - Ukanafun North Primary School",
              "PU 017 - Ukanafun North Market",
              "PU 018 - Ukanafun North Community Hall",
              "PU 019 - Ukanafun North Health Center",
              "PU 020 - Ukanafun North Church"
            ]
          },
          "ukanafun-south": {
            name: "Ukanafun South",
            pollingUnits: [
              "PU 021 - Ukanafun South Primary School",
              "PU 022 - Ukanafun South Market",
              "PU 023 - Ukanafun South Community Hall",
              "PU 024 - Ukanafun South Health Center",
              "PU 025 - Ukanafun South Church"
            ]
          }
        }
      },
      "uruan": { 
        name: "Uruan", 
        wards: {
          "uruan-central": {
            name: "Uruan Central",
            pollingUnits: [
              "PU 001 - Uruan Central Market",
              "PU 002 - Uruan Central Primary School",
              "PU 003 - Uruan Central Community Hall",
              "PU 004 - Uruan Central Health Center",
              "PU 005 - Uruan Central Mosque"
            ]
          },
          "uruan-east": {
            name: "Uruan East",
            pollingUnits: [
              "PU 006 - Uruan East Primary School",
              "PU 007 - Uruan East Market",
              "PU 008 - Uruan East Community Hall",
              "PU 009 - Uruan East Health Center",
              "PU 010 - Uruan East Mosque"
            ]
          },
          "uruan-west": {
            name: "Uruan West",
            pollingUnits: [
              "PU 011 - Uruan West Primary School",
              "PU 012 - Uruan West Market",
              "PU 013 - Uruan West Community Hall",
              "PU 014 - Uruan West Health Center",
              "PU 015 - Uruan West Church"
            ]
          },
          "uruan-north": {
            name: "Uruan North",
            pollingUnits: [
              "PU 016 - Uruan North Primary School",
              "PU 017 - Uruan North Market",
              "PU 018 - Uruan North Community Hall",
              "PU 019 - Uruan North Health Center",
              "PU 020 - Uruan North Mosque"
            ]
          },
          "uruan-south": {
            name: "Uruan South",
            pollingUnits: [
              "PU 021 - Uruan South Primary School",
              "PU 022 - Uruan South Market",
              "PU 023 - Uruan South Community Hall",
              "PU 024 - Uruan South Health Center",
              "PU 025 - Uruan South Church"
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
              "PU 001 - Urue Offong Oruko Central Market",
              "PU 002 - Urue Offong Oruko Central Primary School",
              "PU 003 - Urue Offong Oruko Central Community Hall",
              "PU 004 - Urue Offong Oruko Central Health Center",
              "PU 005 - Urue Offong Oruko Central Mosque"
            ]
          },
          "urue-offong-oruko-east": {
            name: "Urue Offong Oruko East",
            pollingUnits: [
              "PU 006 - Urue Offong Oruko East Primary School",
              "PU 007 - Urue Offong Oruko East Market",
              "PU 008 - Urue Offong Oruko East Community Hall",
              "PU 009 - Urue Offong Oruko East Health Center",
              "PU 010 - Urue Offong Oruko East Mosque"
            ]
          },
          "urue-offong-oruko-west": {
            name: "Urue Offong Oruko West",
            pollingUnits: [
              "PU 011 - Urue Offong Oruko West Primary School",
              "PU 012 - Urue Offong Oruko West Market",
              "PU 013 - Urue Offong Oruko West Community Hall",
              "PU 014 - Urue Offong Oruko West Health Center",
              "PU 015 - Urue Offong Oruko West Church"
            ]
          },
          "urue-offong-oruko-north": {
            name: "Urue Offong Oruko North",
            pollingUnits: [
              "PU 016 - Urue Offong Oruko North Primary School",
              "PU 017 - Urue Offong Oruko North Market",
              "PU 018 - Urue Offong Oruko North Community Hall",
              "PU 019 - Urue Offong Oruko North Health Center",
              "PU 020 - Urue Offong Oruko North Mosque"
            ]
          },
          "urue-offong-oruko-south": {
            name: "Urue Offong Oruko South",
            pollingUnits: [
              "PU 021 - Urue Offong Oruko South Primary School",
              "PU 022 - Urue Offong Oruko South Market",
              "PU 023 - Urue Offong Oruko South Community Hall",
              "PU 024 - Urue Offong Oruko South Health Center",
              "PU 025 - Urue Offong Oruko South Church"
            ]
          }
        }
      },
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
              "PU 005 - Uyo Central Mosque"
            ]
          },
          "uyo-east": {
            name: "Uyo East",
            pollingUnits: [
              "PU 006 - Uyo East Primary School",
              "PU 007 - Uyo East Market",
              "PU 008 - Uyo East Community Hall",
              "PU 009 - Uyo East Health Center",
              "PU 010 - Uyo East Mosque"
            ]
          },
          "uyo-west": {
            name: "Uyo West",
            pollingUnits: [
              "PU 011 - Uyo West Primary School",
              "PU 012 - Uyo West Market",
              "PU 013 - Uyo West Community Hall",
              "PU 014 - Uyo West Health Center",
              "PU 015 - Uyo West Church"
            ]
          },
          "uyo-north": {
            name: "Uyo North",
            pollingUnits: [
              "PU 016 - Uyo North Primary School",
              "PU 017 - Uyo North Market",
              "PU 018 - Uyo North Community Hall",
              "PU 019 - Uyo North Health Center",
              "PU 020 - Uyo North Mosque"
            ]
          },
          "uyo-south": {
            name: "Uyo South",
            pollingUnits: [
              "PU 021 - Uyo South Primary School",
              "PU 022 - Uyo South Market",
              "PU 023 - Uyo South Community Hall",
              "PU 024 - Uyo South Health Center",
              "PU 025 - Uyo South Church"
            ]
          }
        }
      }
    }
  },
  crossRiver: {
    name: "Cross River",
    lgas: {
      "abia": { 
        name: "Abia", 
        wards: {
          "abia-central": {
            name: "Abia Central",
            pollingUnits: [
              "PU 001 - Abia Central Market",
              "PU 002 - Abia Central Primary School",
              "PU 003 - Abia Central Community Hall",
              "PU 004 - Abia Central Health Center",
              "PU 005 - Abia Central Church"
            ]
          },
          "abia-east": {
            name: "Abia East",
            pollingUnits: [
              "PU 006 - Abia East Primary School",
              "PU 007 - Abia East Market",
              "PU 008 - Abia East Community Hall",
              "PU 009 - Abia East Health Center",
              "PU 010 - Abia East Church"
            ]
          },
          "abia-west": {
            name: "Abia West",
            pollingUnits: [
              "PU 011 - Abia West Primary School",
              "PU 012 - Abia West Market",
              "PU 013 - Abia West Community Hall",
              "PU 014 - Abia West Health Center",
              "PU 015 - Abia West Church"
            ]
          },
          "abia-north": {
            name: "Abia North",
            pollingUnits: [
              "PU 016 - Abia North Primary School",
              "PU 017 - Abia North Market",
              "PU 018 - Abia North Community Hall",
              "PU 019 - Abia North Health Center",
              "PU 020 - Abia North Church"
            ]
          },
          "abia-south": {
            name: "Abia South",
            pollingUnits: [
              "PU 021 - Abia South Primary School",
              "PU 022 - Abia South Market",
              "PU 023 - Abia South Community Hall",
              "PU 024 - Abia South Health Center",
              "PU 025 - Abia South Church"
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
              "PU 001 - Akamkpa Central Market",
              "PU 002 - Akamkpa Central Primary School",
              "PU 003 - Akamkpa Central Community Hall",
              "PU 004 - Akamkpa Central Health Center",
              "PU 005 - Akamkpa Central Church"
            ]
          },
          "akamkpa-east": {
            name: "Akamkpa East",
            pollingUnits: [
              "PU 006 - Akamkpa East Primary School",
              "PU 007 - Akamkpa East Market",
              "PU 008 - Akamkpa East Community Hall",
              "PU 009 - Akamkpa East Health Center",
              "PU 010 - Akamkpa East Church"
            ]
          },
          "akamkpa-west": {
            name: "Akamkpa West",
            pollingUnits: [
              "PU 011 - Akamkpa West Primary School",
              "PU 012 - Akamkpa West Market",
              "PU 013 - Akamkpa West Community Hall",
              "PU 014 - Akamkpa West Health Center",
              "PU 015 - Akamkpa West Church"
            ]
          },
          "akamkpa-north": {
            name: "Akamkpa North",
            pollingUnits: [
              "PU 016 - Akamkpa North Primary School",
              "PU 017 - Akamkpa North Market",
              "PU 018 - Akamkpa North Community Hall",
              "PU 019 - Akamkpa North Health Center",
              "PU 020 - Akamkpa North Church"
            ]
          },
          "akamkpa-south": {
            name: "Akamkpa South",
            pollingUnits: [
              "PU 021 - Akamkpa South Primary School",
              "PU 022 - Akamkpa South Market",
              "PU 023 - Akamkpa South Community Hall",
              "PU 024 - Akamkpa South Health Center",
              "PU 025 - Akamkpa South Church"
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
              "PU 001 - Akpabuyo Central Market",
              "PU 002 - Akpabuyo Central Primary School",
              "PU 003 - Akpabuyo Central Community Hall",
              "PU 004 - Akpabuyo Central Health Center",
              "PU 005 - Akpabuyo Central Church"
            ]
          },
          "akpabuyo-east": {
            name: "Akpabuyo East",
            pollingUnits: [
              "PU 006 - Akpabuyo East Primary School",
              "PU 007 - Akpabuyo East Market",
              "PU 008 - Akpabuyo East Community Hall",
              "PU 009 - Akpabuyo East Health Center",
              "PU 010 - Akpabuyo East Church"
            ]
          },
          "akpabuyo-west": {
            name: "Akpabuyo West",
            pollingUnits: [
              "PU 011 - Akpabuyo West Primary School",
              "PU 012 - Akpabuyo West Market",
              "PU 013 - Akpabuyo West Community Hall",
              "PU 014 - Akpabuyo West Health Center",
              "PU 015 - Akpabuyo West Church"
            ]
          },
          "akpabuyo-north": {
            name: "Akpabuyo North",
            pollingUnits: [
              "PU 016 - Akpabuyo North Primary School",
              "PU 017 - Akpabuyo North Market",
              "PU 018 - Akpabuyo North Community Hall",
              "PU 019 - Akpabuyo North Health Center",
              "PU 020 - Akpabuyo North Church"
            ]
          },
          "akpabuyo-south": {
            name: "Akpabuyo South",
            pollingUnits: [
              "PU 021 - Akpabuyo South Primary School",
              "PU 022 - Akpabuyo South Market",
              "PU 023 - Akpabuyo South Community Hall",
              "PU 024 - Akpabuyo South Health Center",
              "PU 025 - Akpabuyo South Church"
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
              "PU 001 - Bakassi Central Market",
              "PU 002 - Bakassi Central Primary School",
              "PU 003 - Bakassi Central Community Hall",
              "PU 004 - Bakassi Central Health Center",
              "PU 005 - Bakassi Central Church"
            ]
          },
          "bakassi-east": {
            name: "Bakassi East",
            pollingUnits: [
              "PU 006 - Bakassi East Primary School",
              "PU 007 - Bakassi East Market",
              "PU 008 - Bakassi East Community Hall",
              "PU 009 - Bakassi East Health Center",
              "PU 010 - Bakassi East Church"
            ]
          },
          "bakassi-west": {
            name: "Bakassi West",
            pollingUnits: [
              "PU 011 - Bakassi West Primary School",
              "PU 012 - Bakassi West Market",
              "PU 013 - Bakassi West Community Hall",
              "PU 014 - Bakassi West Health Center",
              "PU 015 - Bakassi West Church"
            ]
          },
          "bakassi-north": {
            name: "Bakassi North",
            pollingUnits: [
              "PU 016 - Bakassi North Primary School",
              "PU 017 - Bakassi North Market",
              "PU 018 - Bakassi North Community Hall",
              "PU 019 - Bakassi North Health Center",
              "PU 020 - Bakassi North Church"
            ]
          },
          "bakassi-south": {
            name: "Bakassi South",
            pollingUnits: [
              "PU 021 - Bakassi South Primary School",
              "PU 022 - Bakassi South Market",
              "PU 023 - Bakassi South Community Hall",
              "PU 024 - Bakassi South Health Center",
              "PU 025 - Bakassi South Church"
            ]
          }
        }
      },
      "bekwarra": { 
        name: "Bekwarra", 
        wards: {
          "bekwarra-central": {
            name: "Bekwarra Central",
            pollingUnits: [
              "PU 001 - Bekwarra Central Market",
              "PU 002 - Bekwarra Central Primary School",
              "PU 003 - Bekwarra Central Community Hall",
              "PU 004 - Bekwarra Central Health Center",
              "PU 005 - Bekwarra Central Church"
            ]
          },
          "bekwarra-east": {
            name: "Bekwarra East",
            pollingUnits: [
              "PU 006 - Bekwarra East Primary School",
              "PU 007 - Bekwarra East Market",
              "PU 008 - Bekwarra East Community Hall",
              "PU 009 - Bekwarra East Health Center",
              "PU 010 - Bekwarra East Church"
            ]
          },
          "bekwarra-west": {
            name: "Bekwarra West",
            pollingUnits: [
              "PU 011 - Bekwarra West Primary School",
              "PU 012 - Bekwarra West Market",
              "PU 013 - Bekwarra West Community Hall",
              "PU 014 - Bekwarra West Health Center",
              "PU 015 - Bekwarra West Church"
            ]
          },
          "bekwarra-north": {
            name: "Bekwarra North",
            pollingUnits: [
              "PU 016 - Bekwarra North Primary School",
              "PU 017 - Bekwarra North Market",
              "PU 018 - Bekwarra North Community Hall",
              "PU 019 - Bekwarra North Health Center",
              "PU 020 - Bekwarra North Church"
            ]
          },
          "bekwarra-south": {
            name: "Bekwarra South",
            pollingUnits: [
              "PU 021 - Bekwarra South Primary School",
              "PU 022 - Bekwarra South Market",
              "PU 023 - Bekwarra South Community Hall",
              "PU 024 - Bekwarra South Health Center",
              "PU 025 - Bekwarra South Church"
            ]
          }
        }
      },
      "biase": { name: "Biase", wards: {} },
      "boki": { name: "Boki", wards: {} },
      "calabar-municipal": { name: "Calabar Municipal", wards: {} },
      "calabar-south": { name: "Calabar South", wards: {} },
      "etung": { name: "Etung", wards: {} },
      "ikom": { name: "Ikom", wards: {} },
      "obanliku": { name: "Obanliku", wards: {} },
      "obubra": { name: "Obubra", wards: {} },
      "obudu": { name: "Obudu", wards: {} },
      "odukpani": { name: "Odukpani", wards: {} },
      "ogojia": { name: "Ogoja", wards: {} },
      "yakurr": { name: "Yakurr", wards: {} },
      "yala": { name: "Yala", wards: {} }
    }
  },
  delta: {
    name: "Delta",
    lgas: {
      "aniocha-north": { 
        name: "Aniocha North", 
        wards: {
          "aniocha-north-central": {
            name: "Aniocha North Central",
            pollingUnits: [
              "PU 001 - Aniocha North Central Market",
              "PU 002 - Aniocha North Central Primary School",
              "PU 003 - Aniocha North Central Community Hall",
              "PU 004 - Aniocha North Central Health Center",
              "PU 005 - Aniocha North Central Church"
            ]
          },
          "aniocha-north-east": {
            name: "Aniocha North East",
            pollingUnits: [
              "PU 006 - Aniocha North East Primary School",
              "PU 007 - Aniocha North East Market",
              "PU 008 - Aniocha North East Community Hall",
              "PU 009 - Aniocha North East Health Center",
              "PU 010 - Aniocha North East Church"
            ]
          },
          "aniocha-north-west": {
            name: "Aniocha North West",
            pollingUnits: [
              "PU 011 - Aniocha North West Primary School",
              "PU 012 - Aniocha North West Market",
              "PU 013 - Aniocha North West Community Hall",
              "PU 014 - Aniocha North West Health Center",
              "PU 015 - Aniocha North West Church"
            ]
          },
          "aniocha-north-north": {
            name: "Aniocha North North",
            pollingUnits: [
              "PU 016 - Aniocha North North Primary School",
              "PU 017 - Aniocha North North Market",
              "PU 018 - Aniocha North North Community Hall",
              "PU 019 - Aniocha North North Health Center",
              "PU 020 - Aniocha North North Church"
            ]
          },
          "aniocha-north-south": {
            name: "Aniocha North South",
            pollingUnits: [
              "PU 021 - Aniocha North South Primary School",
              "PU 022 - Aniocha North South Market",
              "PU 023 - Aniocha North South Community Hall",
              "PU 024 - Aniocha North South Health Center",
              "PU 025 - Aniocha North South Church"
            ]
          }
        }
      },
      "aniocha-south": { 
        name: "Aniocha South", 
        wards: {
          "aniocha-south-central": {
            name: "Aniocha South Central",
            pollingUnits: [
              "PU 001 - Aniocha South Central Market",
              "PU 002 - Aniocha South Central Primary School",
              "PU 003 - Aniocha South Central Community Hall",
              "PU 004 - Aniocha South Central Health Center",
              "PU 005 - Aniocha South Central Church"
            ]
          },
          "aniocha-south-east": {
            name: "Aniocha South East",
            pollingUnits: [
              "PU 006 - Aniocha South East Primary School",
              "PU 007 - Aniocha South East Market",
              "PU 008 - Aniocha South East Community Hall",
              "PU 009 - Aniocha South East Health Center",
              "PU 010 - Aniocha South East Church"
            ]
          },
          "aniocha-south-west": {
            name: "Aniocha South West",
            pollingUnits: [
              "PU 011 - Aniocha South West Primary School",
              "PU 012 - Aniocha South West Market",
              "PU 013 - Aniocha South West Community Hall",
              "PU 014 - Aniocha South West Health Center",
              "PU 015 - Aniocha South West Church"
            ]
          },
          "aniocha-south-north": {
            name: "Aniocha South North",
            pollingUnits: [
              "PU 016 - Aniocha South North Primary School",
              "PU 017 - Aniocha South North Market",
              "PU 018 - Aniocha South North Community Hall",
              "PU 019 - Aniocha South North Health Center",
              "PU 020 - Aniocha South North Church"
            ]
          },
          "aniocha-south-south": {
            name: "Aniocha South South",
            pollingUnits: [
              "PU 021 - Aniocha South South Primary School",
              "PU 022 - Aniocha South South Market",
              "PU 023 - Aniocha South South Community Hall",
              "PU 024 - Aniocha South South Health Center",
              "PU 025 - Aniocha South South Church"
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
              "PU 001 - Bomadi Central Market",
              "PU 002 - Bomadi Central Primary School",
              "PU 003 - Bomadi Central Community Hall",
              "PU 004 - Bomadi Central Health Center",
              "PU 005 - Bomadi Central Church"
            ]
          },
          "bomadi-east": {
            name: "Bomadi East",
            pollingUnits: [
              "PU 006 - Bomadi East Primary School",
              "PU 007 - Bomadi East Market",
              "PU 008 - Bomadi East Community Hall",
              "PU 009 - Bomadi East Health Center",
              "PU 010 - Bomadi East Church"
            ]
          },
          "bomadi-west": {
            name: "Bomadi West",
            pollingUnits: [
              "PU 011 - Bomadi West Primary School",
              "PU 012 - Bomadi West Market",
              "PU 013 - Bomadi West Community Hall",
              "PU 014 - Bomadi West Health Center",
              "PU 015 - Bomadi West Church"
            ]
          },
          "bomadi-north": {
            name: "Bomadi North",
            pollingUnits: [
              "PU 016 - Bomadi North Primary School",
              "PU 017 - Bomadi North Market",
              "PU 018 - Bomadi North Community Hall",
              "PU 019 - Bomadi North Health Center",
              "PU 020 - Bomadi North Church"
            ]
          },
          "bomadi-south": {
            name: "Bomadi South",
            pollingUnits: [
              "PU 021 - Bomadi South Primary School",
              "PU 022 - Bomadi South Market",
              "PU 023 - Bomadi South Community Hall",
              "PU 024 - Bomadi South Health Center",
              "PU 025 - Bomadi South Church"
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
              "PU 001 - Burutu Central Market",
              "PU 002 - Burutu Central Primary School",
              "PU 003 - Burutu Central Community Hall",
              "PU 004 - Burutu Central Health Center",
              "PU 005 - Burutu Central Church"
            ]
          },
          "burutu-east": {
            name: "Burutu East",
            pollingUnits: [
              "PU 006 - Burutu East Primary School",
              "PU 007 - Burutu East Market",
              "PU 008 - Burutu East Community Hall",
              "PU 009 - Burutu East Health Center",
              "PU 010 - Burutu East Church"
            ]
          },
          "burutu-west": {
            name: "Burutu West",
            pollingUnits: [
              "PU 011 - Burutu West Primary School",
              "PU 012 - Burutu West Market",
              "PU 013 - Burutu West Community Hall",
              "PU 014 - Burutu West Health Center",
              "PU 015 - Burutu West Church"
            ]
          },
          "burutu-north": {
            name: "Burutu North",
            pollingUnits: [
              "PU 016 - Burutu North Primary School",
              "PU 017 - Burutu North Market",
              "PU 018 - Burutu North Community Hall",
              "PU 019 - Burutu North Health Center",
              "PU 020 - Burutu North Church"
            ]
          },
          "burutu-south": {
            name: "Burutu South",
            pollingUnits: [
              "PU 021 - Burutu South Primary School",
              "PU 022 - Burutu South Market",
              "PU 023 - Burutu South Community Hall",
              "PU 024 - Burutu South Health Center",
              "PU 025 - Burutu South Church"
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
              "PU 001 - Ethiope East Central Market",
              "PU 002 - Ethiope East Central Primary School",
              "PU 003 - Ethiope East Central Community Hall",
              "PU 004 - Ethiope East Central Health Center",
              "PU 005 - Ethiope East Central Church"
            ]
          },
          "ethiope-east-east": {
            name: "Ethiope East East",
            pollingUnits: [
              "PU 006 - Ethiope East East Primary School",
              "PU 007 - Ethiope East East Market",
              "PU 008 - Ethiope East East Community Hall",
              "PU 009 - Ethiope East East Health Center",
              "PU 010 - Ethiope East East Church"
            ]
          },
          "ethiope-east-west": {
            name: "Ethiope East West",
            pollingUnits: [
              "PU 011 - Ethiope East West Primary School",
              "PU 012 - Ethiope East West Market",
              "PU 013 - Ethiope East West Community Hall",
              "PU 014 - Ethiope East West Health Center",
              "PU 015 - Ethiope East West Church"
            ]
          },
          "ethiope-east-north": {
            name: "Ethiope East North",
            pollingUnits: [
              "PU 016 - Ethiope East North Primary School",
              "PU 017 - Ethiope East North Market",
              "PU 018 - Ethiope East North Community Hall",
              "PU 019 - Ethiope East North Health Center",
              "PU 020 - Ethiope East North Church"
            ]
          },
          "ethiope-east-south": {
            name: "Ethiope East South",
            pollingUnits: [
              "PU 021 - Ethiope East South Primary School",
              "PU 022 - Ethiope East South Market",
              "PU 023 - Ethiope East South Community Hall",
              "PU 024 - Ethiope East South Health Center",
              "PU 025 - Ethiope East South Church"
            ]
          }
        }
      },
      "ethiope-west": { name: "Ethiope West", wards: {} },
      "ika-north-east": { name: "Ika North East", wards: {} },
      "ika-south": { name: "Ika South", wards: {} },
      "isoko-north": { name: "Isoko North", wards: {} },
      "isoko-south": { name: "Isoko South", wards: {} },
      "ndokwa-east": { name: "Ndokwa East", wards: {} },
      "ndokwa-west": { name: "Ndokwa West", wards: {} },
      "okpe": { name: "Okpe", wards: {} },
      "oshimili-north": { name: "Oshimili North", wards: {} },
      "oshimili-south": { name: "Oshimili South", wards: {} },
      "patani": { name: "Patani", wards: {} },
      "sapele": { name: "Sapele", wards: {} },
      "udu": { name: "Udu", wards: {} },
      "ughelli-north": { name: "Ughelli North", wards: {} },
      "ughelli-south": { name: "Ughelli South", wards: {} },
      "ukwuani": { name: "Ukwuani", wards: {} },
      "uvwie": { name: "Uvwie", wards: {} },
      "warri-north": { name: "Warri North", wards: {} },
      "warri-south": { name: "Warri South", wards: {} },
      "warri-south-west": { name: "Warri South West", wards: {} }
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
              "PU 005 - Abakaliki Central Church"
            ]
          },
          "abakaliki-east": {
            name: "Abakaliki East",
            pollingUnits: [
              "PU 006 - Abakaliki East Primary School",
              "PU 007 - Abakaliki East Market",
              "PU 008 - Abakaliki East Community Hall",
              "PU 009 - Abakaliki East Health Center",
              "PU 010 - Abakaliki East Church"
            ]
          },
          "abakaliki-west": {
            name: "Abakaliki West",
            pollingUnits: [
              "PU 011 - Abakaliki West Primary School",
              "PU 012 - Abakaliki West Market",
              "PU 013 - Abakaliki West Community Hall",
              "PU 014 - Abakaliki West Health Center",
              "PU 015 - Abakaliki West Church"
            ]
          },
          "abakaliki-north": {
            name: "Abakaliki North",
            pollingUnits: [
              "PU 016 - Abakaliki North Primary School",
              "PU 017 - Abakaliki North Market",
              "PU 018 - Abakaliki North Community Hall",
              "PU 019 - Abakaliki North Health Center",
              "PU 020 - Abakaliki North Church"
            ]
          },
          "abakaliki-south": {
            name: "Abakaliki South",
            pollingUnits: [
              "PU 021 - Abakaliki South Primary School",
              "PU 022 - Abakaliki South Market",
              "PU 023 - Abakaliki South Community Hall",
              "PU 024 - Abakaliki South Health Center",
              "PU 025 - Abakaliki South Church"
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
              "PU 001 - Afikpo North Central Market",
              "PU 002 - Afikpo North Central Primary School",
              "PU 003 - Afikpo North Central Community Hall",
              "PU 004 - Afikpo North Central Health Center",
              "PU 005 - Afikpo North Central Church"
            ]
          },
          "afikpo-north-east": {
            name: "Afikpo North East",
            pollingUnits: [
              "PU 006 - Afikpo North East Primary School",
              "PU 007 - Afikpo North East Market",
              "PU 008 - Afikpo North East Community Hall",
              "PU 009 - Afikpo North East Health Center",
              "PU 010 - Afikpo North East Church"
            ]
          },
          "afikpo-north-west": {
            name: "Afikpo North West",
            pollingUnits: [
              "PU 011 - Afikpo North West Primary School",
              "PU 012 - Afikpo North West Market",
              "PU 013 - Afikpo North West Community Hall",
              "PU 014 - Afikpo North West Health Center",
              "PU 015 - Afikpo North West Church"
            ]
          },
          "afikpo-north-north": {
            name: "Afikpo North North",
            pollingUnits: [
              "PU 016 - Afikpo North North Primary School",
              "PU 017 - Afikpo North North Market",
              "PU 018 - Afikpo North North Community Hall",
              "PU 019 - Afikpo North North Health Center",
              "PU 020 - Afikpo North North Church"
            ]
          },
          "afikpo-north-south": {
            name: "Afikpo North South",
            pollingUnits: [
              "PU 021 - Afikpo North South Primary School",
              "PU 022 - Afikpo North South Market",
              "PU 023 - Afikpo North South Community Hall",
              "PU 024 - Afikpo North South Health Center",
              "PU 025 - Afikpo North South Church"
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
              "PU 001 - Afikpo South Central Market",
              "PU 002 - Afikpo South Central Primary School",
              "PU 003 - Afikpo South Central Community Hall",
              "PU 004 - Afikpo South Central Health Center",
              "PU 005 - Afikpo South Central Church"
            ]
          },
          "afikpo-south-east": {
            name: "Afikpo South East",
            pollingUnits: [
              "PU 006 - Afikpo South East Primary School",
              "PU 007 - Afikpo South East Market",
              "PU 008 - Afikpo South East Community Hall",
              "PU 009 - Afikpo South East Health Center",
              "PU 010 - Afikpo South East Church"
            ]
          },
          "afikpo-south-west": {
            name: "Afikpo South West",
            pollingUnits: [
              "PU 011 - Afikpo South West Primary School",
              "PU 012 - Afikpo South West Market",
              "PU 013 - Afikpo South West Community Hall",
              "PU 014 - Afikpo South West Health Center",
              "PU 015 - Afikpo South West Church"
            ]
          },
          "afikpo-south-north": {
            name: "Afikpo South North",
            pollingUnits: [
              "PU 016 - Afikpo South North Primary School",
              "PU 017 - Afikpo South North Market",
              "PU 018 - Afikpo South North Community Hall",
              "PU 019 - Afikpo South North Health Center",
              "PU 020 - Afikpo South North Church"
            ]
          },
          "afikpo-south-south": {
            name: "Afikpo South South",
            pollingUnits: [
              "PU 021 - Afikpo South South Primary School",
              "PU 022 - Afikpo South South Market",
              "PU 023 - Afikpo South South Community Hall",
              "PU 024 - Afikpo South South Health Center",
              "PU 025 - Afikpo South South Church"
            ]
          }
        }
      },
      "ebonyi": { 
        name: "Ebonyi", 
        wards: {
          "ebonyi-central": {
            name: "Ebonyi Central",
            pollingUnits: [
              "PU 001 - Ebonyi Central Market",
              "PU 002 - Ebonyi Central Primary School",
              "PU 003 - Ebonyi Central Community Hall",
              "PU 004 - Ebonyi Central Health Center",
              "PU 005 - Ebonyi Central Church"
            ]
          },
          "ebonyi-east": {
            name: "Ebonyi East",
            pollingUnits: [
              "PU 006 - Ebonyi East Primary School",
              "PU 007 - Ebonyi East Market",
              "PU 008 - Ebonyi East Community Hall",
              "PU 009 - Ebonyi East Health Center",
              "PU 010 - Ebonyi East Church"
            ]
          },
          "ebonyi-west": {
            name: "Ebonyi West",
            pollingUnits: [
              "PU 011 - Ebonyi West Primary School",
              "PU 012 - Ebonyi West Market",
              "PU 013 - Ebonyi West Community Hall",
              "PU 014 - Ebonyi West Health Center",
              "PU 015 - Ebonyi West Church"
            ]
          },
          "ebonyi-north": {
            name: "Ebonyi North",
            pollingUnits: [
              "PU 016 - Ebonyi North Primary School",
              "PU 017 - Ebonyi North Market",
              "PU 018 - Ebonyi North Community Hall",
              "PU 019 - Ebonyi North Health Center",
              "PU 020 - Ebonyi North Church"
            ]
          },
          "ebonyi-south": {
            name: "Ebonyi South",
            pollingUnits: [
              "PU 021 - Ebonyi South Primary School",
              "PU 022 - Ebonyi South Market",
              "PU 023 - Ebonyi South Community Hall",
              "PU 024 - Ebonyi South Health Center",
              "PU 025 - Ebonyi South Church"
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
              "PU 001 - Ezza North Central Market",
              "PU 002 - Ezza North Central Primary School",
              "PU 003 - Ezza North Central Community Hall",
              "PU 004 - Ezza North Central Health Center",
              "PU 005 - Ezza North Central Church"
            ]
          },
          "ezza-north-east": {
            name: "Ezza North East",
            pollingUnits: [
              "PU 006 - Ezza North East Primary School",
              "PU 007 - Ezza North East Market",
              "PU 008 - Ezza North East Community Hall",
              "PU 009 - Ezza North East Health Center",
              "PU 010 - Ezza North East Church"
            ]
          },
          "ezza-north-west": {
            name: "Ezza North West",
            pollingUnits: [
              "PU 011 - Ezza North West Primary School",
              "PU 012 - Ezza North West Market",
              "PU 013 - Ezza North West Community Hall",
              "PU 014 - Ezza North West Health Center",
              "PU 015 - Ezza North West Church"
            ]
          },
          "ezza-north-north": {
            name: "Ezza North North",
            pollingUnits: [
              "PU 016 - Ezza North North Primary School",
              "PU 017 - Ezza North North Market",
              "PU 018 - Ezza North North Community Hall",
              "PU 019 - Ezza North North Health Center",
              "PU 020 - Ezza North North Church"
            ]
          },
          "ezza-north-south": {
            name: "Ezza North South",
            pollingUnits: [
              "PU 021 - Ezza North South Primary School",
              "PU 022 - Ezza North South Market",
              "PU 023 - Ezza North South Community Hall",
              "PU 024 - Ezza North South Health Center",
              "PU 025 - Ezza North South Church"
            ]
          }
        }
      },
      "ezza-south": { name: "Ezza South", wards: {} },
      "ikwo": { name: "Ikwo", wards: {} },
      "ishielu": { name: "Ishielu", wards: {} },
      "izu": { name: "Izu", wards: {} },
      "obaukwu": { name: "Oba Ukwu", wards: {} },
      "ohaukwu": { name: "Ohaukwu", wards: {} },
      "onicha": { name: "Onicha", wards: {} }
    }
  },
  edo: {
    name: "Edo",
    lgas: {
      "akoko-edo": { 
        name: "Akoko Edo", 
        wards: {
          "akoko-edo-central": {
            name: "Akoko Edo Central",
            pollingUnits: [
              "PU 001 - Akoko Edo Central Market",
              "PU 002 - Akoko Edo Central Primary School",
              "PU 003 - Akoko Edo Central Community Hall",
              "PU 004 - Akoko Edo Central Health Center",
              "PU 005 - Akoko Edo Central Church"
            ]
          },
          "akoko-edo-east": {
            name: "Akoko Edo East",
            pollingUnits: [
              "PU 006 - Akoko Edo East Primary School",
              "PU 007 - Akoko Edo East Market",
              "PU 008 - Akoko Edo East Community Hall",
              "PU 009 - Akoko Edo East Health Center",
              "PU 010 - Akoko Edo East Church"
            ]
          },
          "akoko-edo-west": {
            name: "Akoko Edo West",
            pollingUnits: [
              "PU 011 - Akoko Edo West Primary School",
              "PU 012 - Akoko Edo West Market",
              "PU 013 - Akoko Edo West Community Hall",
              "PU 014 - Akoko Edo West Health Center",
              "PU 015 - Akoko Edo West Church"
            ]
          },
          "akoko-edo-north": {
            name: "Akoko Edo North",
            pollingUnits: [
              "PU 016 - Akoko Edo North Primary School",
              "PU 017 - Akoko Edo North Market",
              "PU 018 - Akoko Edo North Community Hall",
              "PU 019 - Akoko Edo North Health Center",
              "PU 020 - Akoko Edo North Church"
            ]
          },
          "akoko-edo-south": {
            name: "Akoko Edo South",
            pollingUnits: [
              "PU 021 - Akoko Edo South Primary School",
              "PU 022 - Akoko Edo South Market",
              "PU 023 - Akoko Edo South Community Hall",
              "PU 024 - Akoko Edo South Health Center",
              "PU 025 - Akoko Edo South Church"
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
              "PU 001 - Egor Central Market",
              "PU 002 - Egor Central Primary School",
              "PU 003 - Egor Central Community Hall",
              "PU 004 - Egor Central Health Center",
              "PU 005 - Egor Central Church"
            ]
          },
          "egor-east": {
            name: "Egor East",
            pollingUnits: [
              "PU 006 - Egor East Primary School",
              "PU 007 - Egor East Market",
              "PU 008 - Egor East Community Hall",
              "PU 009 - Egor East Health Center",
              "PU 010 - Egor East Church"
            ]
          },
          "egor-west": {
            name: "Egor West",
            pollingUnits: [
              "PU 011 - Egor West Primary School",
              "PU 012 - Egor West Market",
              "PU 013 - Egor West Community Hall",
              "PU 014 - Egor West Health Center",
              "PU 015 - Egor West Church"
            ]
          },
          "egor-north": {
            name: "Egor North",
            pollingUnits: [
              "PU 016 - Egor North Primary School",
              "PU 017 - Egor North Market",
              "PU 018 - Egor North Community Hall",
              "PU 019 - Egor North Health Center",
              "PU 020 - Egor North Church"
            ]
          },
          "egor-south": {
            name: "Egor South",
            pollingUnits: [
              "PU 021 - Egor South Primary School",
              "PU 022 - Egor South Market",
              "PU 023 - Egor South Community Hall",
              "PU 024 - Egor South Health Center",
              "PU 025 - Egor South Church"
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
              "PU 001 - Esan Central Central Market",
              "PU 002 - Esan Central Central Primary School",
              "PU 003 - Esan Central Central Community Hall",
              "PU 004 - Esan Central Central Health Center",
              "PU 005 - Esan Central Central Church"
            ]
          },
          "esan-central-east": {
            name: "Esan Central East",
            pollingUnits: [
              "PU 006 - Esan Central East Primary School",
              "PU 007 - Esan Central East Market",
              "PU 008 - Esan Central East Community Hall",
              "PU 009 - Esan Central East Health Center",
              "PU 010 - Esan Central East Church"
            ]
          },
          "esan-central-west": {
            name: "Esan Central West",
            pollingUnits: [
              "PU 011 - Esan Central West Primary School",
              "PU 012 - Esan Central West Market",
              "PU 013 - Esan Central West Community Hall",
              "PU 014 - Esan Central West Health Center",
              "PU 015 - Esan Central West Church"
            ]
          },
          "esan-central-north": {
            name: "Esan Central North",
            pollingUnits: [
              "PU 016 - Esan Central North Primary School",
              "PU 017 - Esan Central North Market",
              "PU 018 - Esan Central North Community Hall",
              "PU 019 - Esan Central North Health Center",
              "PU 020 - Esan Central North Church"
            ]
          },
          "esan-central-south": {
            name: "Esan Central South",
            pollingUnits: [
              "PU 021 - Esan Central South Primary School",
              "PU 022 - Esan Central South Market",
              "PU 023 - Esan Central South Community Hall",
              "PU 024 - Esan Central South Health Center",
              "PU 025 - Esan Central South Church"
            ]
          }
        }
      },
      "esan-east": { 
        name: "Esan East", 
        wards: {
          "esan-east-central": {
            name: "Esan East Central",
            pollingUnits: [
              "PU 001 - Esan East Central Market",
              "PU 002 - Esan East Central Primary School",
              "PU 003 - Esan East Central Community Hall",
              "PU 004 - Esan East Central Health Center",
              "PU 005 - Esan East Central Church"
            ]
          },
          "esan-east-east": {
            name: "Esan East East",
            pollingUnits: [
              "PU 006 - Esan East East Primary School",
              "PU 007 - Esan East East Market",
              "PU 008 - Esan East East Community Hall",
              "PU 009 - Esan East East Health Center",
              "PU 010 - Esan East East Church"
            ]
          },
          "esan-east-west": {
            name: "Esan East West",
            pollingUnits: [
              "PU 011 - Esan East West Primary School",
              "PU 012 - Esan East West Market",
              "PU 013 - Esan East West Community Hall",
              "PU 014 - Esan East West Health Center",
              "PU 015 - Esan East West Church"
            ]
          },
          "esan-east-north": {
            name: "Esan East North",
            pollingUnits: [
              "PU 016 - Esan East North Primary School",
              "PU 017 - Esan East North Market",
              "PU 018 - Esan East North Community Hall",
              "PU 019 - Esan East North Health Center",
              "PU 020 - Esan East North Church"
            ]
          },
          "esan-east-south": {
            name: "Esan East South",
            pollingUnits: [
              "PU 021 - Esan East South Primary School",
              "PU 022 - Esan East South Market",
              "PU 023 - Esan East South Community Hall",
              "PU 024 - Esan East South Health Center",
              "PU 025 - Esan East South Church"
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
              "PU 001 - Esan North East Central Market",
              "PU 002 - Esan North East Central Primary School",
              "PU 003 - Esan North East Central Community Hall",
              "PU 004 - Esan North East Central Health Center",
              "PU 005 - Esan North East Central Church"
            ]
          },
          "esan-north-east-east": {
            name: "Esan North East East",
            pollingUnits: [
              "PU 006 - Esan North East East Primary School",
              "PU 007 - Esan North East East Market",
              "PU 008 - Esan North East East Community Hall",
              "PU 009 - Esan North East East Health Center",
              "PU 010 - Esan North East East Church"
            ]
          },
          "esan-north-east-west": {
            name: "Esan North East West",
            pollingUnits: [
              "PU 011 - Esan North East West Primary School",
              "PU 012 - Esan North East West Market",
              "PU 013 - Esan North East West Community Hall",
              "PU 014 - Esan North East West Health Center",
              "PU 015 - Esan North East West Church"
            ]
          },
          "esan-north-east-north": {
            name: "Esan North East North",
            pollingUnits: [
              "PU 016 - Esan North East North Primary School",
              "PU 017 - Esan North East North Market",
              "PU 018 - Esan North East North Community Hall",
              "PU 019 - Esan North East North Health Center",
              "PU 020 - Esan North East North Church"
            ]
          },
          "esan-north-east-south": {
            name: "Esan North East South",
            pollingUnits: [
              "PU 021 - Esan North East South Primary School",
              "PU 022 - Esan North East South Market",
              "PU 023 - Esan North East South Community Hall",
              "PU 024 - Esan North East South Health Center",
              "PU 025 - Esan North East South Church"
            ]
          }
        }
      },
      "esan-south-east": { name: "Esan South East", wards: {} },
      "esan-west": { name: "Esan West", wards: {} },
      "etekpo": { name: "Etekpo", wards: {} },
      "igbede": { name: "Igbede", wards: {} },
      "igbinedion": { name: "Igbinedion", wards: {} },
      "ikpoba-okha": { name: "Ikpoba Okha", wards: {} },
      "orhiomwon": { name: "Orhiomwon", wards: {} },
      "oronmwon": { name: "Oronmwon", wards: {} },
      "owan": { name: "Owan", wards: {} },
      "uhunmwonde": { name: "Uhunmwonde", wards: {} }
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
              "PU 005 - Ado Ekiti Central Church"
            ]
          },
          "ado-ekiti-east": {
            name: "Ado Ekiti East",
            pollingUnits: [
              "PU 006 - Ado Ekiti East Primary School",
              "PU 007 - Ado Ekiti East Market",
              "PU 008 - Ado Ekiti East Community Hall",
              "PU 009 - Ado Ekiti East Health Center",
              "PU 010 - Ado Ekiti East Church"
            ]
          },
          "ado-ekiti-west": {
            name: "Ado Ekiti West",
            pollingUnits: [
              "PU 011 - Ado Ekiti West Primary School",
              "PU 012 - Ado Ekiti West Market",
              "PU 013 - Ado Ekiti West Community Hall",
              "PU 014 - Ado Ekiti West Health Center",
              "PU 015 - Ado Ekiti West Church"
            ]
          },
          "ado-ekiti-north": {
            name: "Ado Ekiti North",
            pollingUnits: [
              "PU 016 - Ado Ekiti North Primary School",
              "PU 017 - Ado Ekiti North Market",
              "PU 018 - Ado Ekiti North Community Hall",
              "PU 019 - Ado Ekiti North Health Center",
              "PU 020 - Ado Ekiti North Church"
            ]
          },
          "ado-ekiti-south": {
            name: "Ado Ekiti South",
            pollingUnits: [
              "PU 021 - Ado Ekiti South Primary School",
              "PU 022 - Ado Ekiti South Market",
              "PU 023 - Ado Ekiti South Community Hall",
              "PU 024 - Ado Ekiti South Health Center",
              "PU 025 - Ado Ekiti South Church"
            ]
          }
        }
      },
      "aisegbe": { 
        name: "Aisegbe", 
        wards: {
          "aisegbe-central": {
            name: "Aisegbe Central",
            pollingUnits: [
              "PU 001 - Aisegbe Central Market",
              "PU 002 - Aisegbe Central Primary School",
              "PU 003 - Aisegbe Central Community Hall",
              "PU 004 - Aisegbe Central Health Center",
              "PU 005 - Aisegbe Central Church"
            ]
          },
          "aisegbe-east": {
            name: "Aisegbe East",
            pollingUnits: [
              "PU 006 - Aisegbe East Primary School",
              "PU 007 - Aisegbe East Market",
              "PU 008 - Aisegbe East Community Hall",
              "PU 009 - Aisegbe East Health Center",
              "PU 010 - Aisegbe East Church"
            ]
          },
          "aisegbe-west": {
            name: "Aisegbe West",
            pollingUnits: [
              "PU 011 - Aisegbe West Primary School",
              "PU 012 - Aisegbe West Market",
              "PU 013 - Aisegbe West Community Hall",
              "PU 014 - Aisegbe West Health Center",
              "PU 015 - Aisegbe West Church"
            ]
          },
          "aisegbe-north": {
            name: "Aisegbe North",
            pollingUnits: [
              "PU 016 - Aisegbe North Primary School",
              "PU 017 - Aisegbe North Market",
              "PU 018 - Aisegbe North Community Hall",
              "PU 019 - Aisegbe North Health Center",
              "PU 020 - Aisegbe North Church"
            ]
          },
          "aisegbe-south": {
            name: "Aisegbe South",
            pollingUnits: [
              "PU 021 - Aisegbe South Primary School",
              "PU 022 - Aisegbe South Market",
              "PU 023 - Aisegbe South Community Hall",
              "PU 024 - Aisegbe South Health Center",
              "PU 025 - Aisegbe South Church"
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
              "PU 001 - Ekiti East Central Market",
              "PU 002 - Ekiti East Central Primary School",
              "PU 003 - Ekiti East Central Community Hall",
              "PU 004 - Ekiti East Central Health Center",
              "PU 005 - Ekiti East Central Church"
            ]
          },
          "ekiti-east-east": {
            name: "Ekiti East East",
            pollingUnits: [
              "PU 006 - Ekiti East East Primary School",
              "PU 007 - Ekiti East East Market",
              "PU 008 - Ekiti East East Community Hall",
              "PU 009 - Ekiti East East Health Center",
              "PU 010 - Ekiti East East Church"
            ]
          },
          "ekiti-east-west": {
            name: "Ekiti East West",
            pollingUnits: [
              "PU 011 - Ekiti East West Primary School",
              "PU 012 - Ekiti East West Market",
              "PU 013 - Ekiti East West Community Hall",
              "PU 014 - Ekiti East West Health Center",
              "PU 015 - Ekiti East West Church"
            ]
          },
          "ekiti-east-north": {
            name: "Ekiti East North",
            pollingUnits: [
              "PU 016 - Ekiti East North Primary School",
              "PU 017 - Ekiti East North Market",
              "PU 018 - Ekiti East North Community Hall",
              "PU 019 - Ekiti East North Health Center",
              "PU 020 - Ekiti East North Church"
            ]
          },
          "ekiti-east-south": {
            name: "Ekiti East South",
            pollingUnits: [
              "PU 021 - Ekiti East South Primary School",
              "PU 022 - Ekiti East South Market",
              "PU 023 - Ekiti East South Community Hall",
              "PU 024 - Ekiti East South Health Center",
              "PU 025 - Ekiti East South Church"
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
              "PU 001 - Ekiti South West Central Market",
              "PU 002 - Ekiti South West Central Primary School",
              "PU 003 - Ekiti South West Central Community Hall",
              "PU 004 - Ekiti South West Central Health Center",
              "PU 005 - Ekiti South West Central Church"
            ]
          },
          "ekiti-south-west-east": {
            name: "Ekiti South West East",
            pollingUnits: [
              "PU 006 - Ekiti South West East Primary School",
              "PU 007 - Ekiti South West East Market",
              "PU 008 - Ekiti South West East Community Hall",
              "PU 009 - Ekiti South West East Health Center",
              "PU 010 - Ekiti South West East Church"
            ]
          },
          "ekiti-south-west-west": {
            name: "Ekiti South West West",
            pollingUnits: [
              "PU 011 - Ekiti South West West Primary School",
              "PU 012 - Ekiti South West West Market",
              "PU 013 - Ekiti South West West Community Hall",
              "PU 014 - Ekiti South West West Health Center",
              "PU 015 - Ekiti South West West Church"
            ]
          },
          "ekiti-south-west-north": {
            name: "Ekiti South West North",
            pollingUnits: [
              "PU 016 - Ekiti South West North Primary School",
              "PU 017 - Ekiti South West North Market",
              "PU 018 - Ekiti South West North Community Hall",
              "PU 019 - Ekiti South West North Health Center",
              "PU 020 - Ekiti South West North Church"
            ]
          },
          "ekiti-south-west-south": {
            name: "Ekiti South West South",
            pollingUnits: [
              "PU 021 - Ekiti South West South Primary School",
              "PU 022 - Ekiti South West South Market",
              "PU 023 - Ekiti South West South Community Hall",
              "PU 024 - Ekiti South West South Health Center",
              "PU 025 - Ekiti South West South Church"
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
              "PU 001 - Ekiti West Central Market",
              "PU 002 - Ekiti West Central Primary School",
              "PU 003 - Ekiti West Central Community Hall",
              "PU 004 - Ekiti West Central Health Center",
              "PU 005 - Ekiti West Central Church"
            ]
          },
          "ekiti-west-east": {
            name: "Ekiti West East",
            pollingUnits: [
              "PU 006 - Ekiti West East Primary School",
              "PU 007 - Ekiti West East Market",
              "PU 008 - Ekiti West East Community Hall",
              "PU 009 - Ekiti West East Health Center",
              "PU 010 - Ekiti West East Church"
            ]
          },
          "ekiti-west-west": {
            name: "Ekiti West West",
            pollingUnits: [
              "PU 011 - Ekiti West West Primary School",
              "PU 012 - Ekiti West West Market",
              "PU 013 - Ekiti West West Community Hall",
              "PU 014 - Ekiti West West Health Center",
              "PU 015 - Ekiti West West Church"
            ]
          },
          "ekiti-west-north": {
            name: "Ekiti West North",
            pollingUnits: [
              "PU 016 - Ekiti West North Primary School",
              "PU 017 - Ekiti West North Market",
              "PU 018 - Ekiti West North Community Hall",
              "PU 019 - Ekiti West North Health Center",
              "PU 020 - Ekiti West North Church"
            ]
          },
          "ekiti-west-south": {
            name: "Ekiti West South",
            pollingUnits: [
              "PU 021 - Ekiti West South Primary School",
              "PU 022 - Ekiti West South Market",
              "PU 023 - Ekiti West South Community Hall",
              "PU 024 - Ekiti West South Health Center",
              "PU 025 - Ekiti West South Church"
            ]
          }
        }
      },
      "emure": { name: "Emure", wards: {} },
      "gbonyin": { name: "Gbonyin", wards: {} },
      "idao-osi": { name: "Idao Osi", wards: {} },
      "ijero": { name: "Ijero", wards: {} },
      "ikere": { name: "Ikere", wards: {} },
      "ikole": { name: "Ikole", wards: {} },
      "ilejemeje": { name: "Ilejemeje", wards: {} },
      "irepodun-ifelodun": { name: "Irepodun Ifelodun", wards: {} },
      "ise-orun": { name: "Ise Orun", wards: {} },
      "moba": { name: "Moba", wards: {} },
      "oye": { name: "Oye", wards: {} }
    }
  },
  enugu: {
    name: "Enugu",
    lgas: {
      "aniri": { 
        name: "Aniri", 
        wards: {
          "aniri-central": {
            name: "Aniri Central",
            pollingUnits: [
              "PU 001 - Aniri Central Market",
              "PU 002 - Aniri Central Primary School",
              "PU 003 - Aniri Central Community Hall",
              "PU 004 - Aniri Central Health Center",
              "PU 005 - Aniri Central Church"
            ]
          },
          "aniri-east": {
            name: "Aniri East",
            pollingUnits: [
              "PU 006 - Aniri East Primary School",
              "PU 007 - Aniri East Market",
              "PU 008 - Aniri East Community Hall",
              "PU 009 - Aniri East Health Center",
              "PU 010 - Aniri East Church"
            ]
          },
          "aniri-west": {
            name: "Aniri West",
            pollingUnits: [
              "PU 011 - Aniri West Primary School",
              "PU 012 - Aniri West Market",
              "PU 013 - Aniri West Community Hall",
              "PU 014 - Aniri West Health Center",
              "PU 015 - Aniri West Church"
            ]
          },
          "aniri-north": {
            name: "Aniri North",
            pollingUnits: [
              "PU 016 - Aniri North Primary School",
              "PU 017 - Aniri North Market",
              "PU 018 - Aniri North Community Hall",
              "PU 019 - Aniri North Health Center",
              "PU 020 - Aniri North Church"
            ]
          },
          "aniri-south": {
            name: "Aniri South",
            pollingUnits: [
              "PU 021 - Aniri South Primary School",
              "PU 022 - Aniri South Market",
              "PU 023 - Aniri South Community Hall",
              "PU 024 - Aniri South Health Center",
              "PU 025 - Aniri South Church"
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
              "PU 001 - Enugu East Central Market",
              "PU 002 - Enugu East Central Primary School",
              "PU 003 - Enugu East Central Community Hall",
              "PU 004 - Enugu East Central Health Center",
              "PU 005 - Enugu East Central Church"
            ]
          },
          "enugu-east-east": {
            name: "Enugu East East",
            pollingUnits: [
              "PU 006 - Enugu East East Primary School",
              "PU 007 - Enugu East East Market",
              "PU 008 - Enugu East East Community Hall",
              "PU 009 - Enugu East East Health Center",
              "PU 010 - Enugu East East Church"
            ]
          },
          "enugu-east-west": {
            name: "Enugu East West",
            pollingUnits: [
              "PU 011 - Enugu East West Primary School",
              "PU 012 - Enugu East West Market",
              "PU 013 - Enugu East West Community Hall",
              "PU 014 - Enugu East West Health Center",
              "PU 015 - Enugu East West Church"
            ]
          },
          "enugu-east-north": {
            name: "Enugu East North",
            pollingUnits: [
              "PU 016 - Enugu East North Primary School",
              "PU 017 - Enugu East North Market",
              "PU 018 - Enugu East North Community Hall",
              "PU 019 - Enugu East North Health Center",
              "PU 020 - Enugu East North Church"
            ]
          },
          "enugu-east-south": {
            name: "Enugu East South",
            pollingUnits: [
              "PU 021 - Enugu East South Primary School",
              "PU 022 - Enugu East South Market",
              "PU 023 - Enugu East South Community Hall",
              "PU 024 - Enugu East South Health Center",
              "PU 025 - Enugu East South Church"
            ]
          }
        }
      },
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
              "PU 005 - Enugu North Central Church"
            ]
          },
          "enugu-north-east": {
            name: "Enugu North East",
            pollingUnits: [
              "PU 006 - Enugu North East Primary School",
              "PU 007 - Enugu North East Market",
              "PU 008 - Enugu North East Community Hall",
              "PU 009 - Enugu North East Health Center",
              "PU 010 - Enugu North East Church"
            ]
          },
          "enugu-north-west": {
            name: "Enugu North West",
            pollingUnits: [
              "PU 011 - Enugu North West Primary School",
              "PU 012 - Enugu North West Market",
              "PU 013 - Enugu North West Community Hall",
              "PU 014 - Enugu North West Health Center",
              "PU 015 - Enugu North West Church"
            ]
          },
          "enugu-north-north": {
            name: "Enugu North North",
            pollingUnits: [
              "PU 016 - Enugu North North Primary School",
              "PU 017 - Enugu North North Market",
              "PU 018 - Enugu North North Community Hall",
              "PU 019 - Enugu North North Health Center",
              "PU 020 - Enugu North North Church"
            ]
          },
          "enugu-north-south": {
            name: "Enugu North South",
            pollingUnits: [
              "PU 021 - Enugu North South Primary School",
              "PU 022 - Enugu North North South Market",
              "PU 023 - Enugu North South Community Hall",
              "PU 024 - Enugu North South Health Center",
              "PU 025 - Enugu North South Church"
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
              "PU 001 - Enugu South Central Market",
              "PU 002 - Enugu South Central Primary School",
              "PU 003 - Enugu South Central Community Hall",
              "PU 004 - Enugu South Central Health Center",
              "PU 005 - Enugu South Central Church"
            ]
          },
          "enugu-south-east": {
            name: "Enugu South East",
            pollingUnits: [
              "PU 006 - Enugu South East Primary School",
              "PU 007 - Enugu South East Market",
              "PU 008 - Enugu South East Community Hall",
              "PU 009 - Enugu South East Health Center",
              "PU 010 - Enugu South East Church"
            ]
          },
          "enugu-south-west": {
            name: "Enugu South West",
            pollingUnits: [
              "PU 011 - Enugu South West Primary School",
              "PU 012 - Enugu South West Market",
              "PU 013 - Enugu South West Community Hall",
              "PU 014 - Enugu South West Health Center",
              "PU 015 - Enugu South West Church"
            ]
          },
          "enugu-south-north": {
            name: "Enugu South North",
            pollingUnits: [
              "PU 016 - Enugu South North Primary School",
              "PU 017 - Enugu South North Market",
              "PU 018 - Enugu South North Community Hall",
              "PU 019 - Enugu South North Health Center",
              "PU 020 - Enugu South North Church"
            ]
          },
          "enugu-south-south": {
            name: "Enugu South South",
            pollingUnits: [
              "PU 021 - Enugu South South Primary School",
              "PU 022 - Enugu South South Market",
              "PU 023 - Enugu South South Community Hall",
              "PU 024 - Enugu South South Health Center",
              "PU 025 - Enugu South South Church"
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
              "PU 001 - Ezeagu Central Market",
              "PU 002 - Ezeagu Central Primary School",
              "PU 003 - Ezeagu Central Community Hall",
              "PU 004 - Ezeagu Central Health Center",
              "PU 005 - Ezeagu Central Church"
            ]
          },
          "ezeagu-east": {
            name: "Ezeagu East",
            pollingUnits: [
              "PU 006 - Ezeagu East Primary School",
              "PU 007 - Ezeagu East Market",
              "PU 008 - Ezeagu East Community Hall",
              "PU 009 - Ezeagu East Health Center",
              "PU 010 - Ezeagu East Church"
            ]
          },
          "ezeagu-west": {
            name: "Ezeagu West",
            pollingUnits: [
              "PU 011 - Ezeagu West Primary School",
              "PU 012 - Ezeagu West Market",
              "PU 013 - Ezeagu West Community Hall",
              "PU 014 - Ezeagu West Health Center",
              "PU 015 - Ezeagu West Church"
            ]
          },
          "ezeagu-north": {
            name: "Ezeagu North",
            pollingUnits: [
              "PU 016 - Ezeagu North Primary School",
              "PU 017 - Ezeagu North Market",
              "PU 018 - Ezeagu North Community Hall",
              "PU 019 - Ezeagu North Health Center",
              "PU 020 - Ezeagu North Church"
            ]
          },
          "ezeagu-south": {
            name: "Ezeagu South",
            pollingUnits: [
              "PU 021 - Ezeagu South Primary School",
              "PU 022 - Ezeagu South Market",
              "PU 023 - Ezeagu South Community Hall",
              "PU 024 - Ezeagu South Health Center",
              "PU 025 - Ezeagu South Church"
            ]
          }
        }
      },
      "igbo-etiti": { name: "Igbo Etiti", wards: {} },
      "igbo-eze-north": { name: "Igbo Eze North", wards: {} },
      "igbo-eze-south": { name: "Igbo Eze South", wards: {} },
      "isi-uzo": { name: "Isi Uzo", wards: {} },
      "nkanu-east": { name: "Nkanu East", wards: {} },
      "nkanu-west": { name: "Nkanu West", wards: {} },
      "nsukka": { name: "Nsukka", wards: {} },
      "oji-river": { name: "Oji River", wards: {} },
      "udenu": { name: "Udenu", wards: {} },
      "udi": { name: "Udi", wards: {} },
      "uzo-uwani": { name: "Uzo Uwani", wards: {} }
    }
  },
  fct: {
    name: "Federal Capital Territory",
    lgas: {
      "abaji": { 
        name: "Abaji", 
        wards: {
          "abaji-central": {
            name: "Abaji Central",
            pollingUnits: [
              "PU 001 - Abaji Central Market",
              "PU 002 - Abaji Central Primary School",
              "PU 003 - Abaji Central Community Hall",
              "PU 004 - Abaji Central Health Center",
              "PU 005 - Abaji Central Mosque"
            ]
          },
          "abaji-east": {
            name: "Abaji East",
            pollingUnits: [
              "PU 006 - Abaji East Primary School",
              "PU 007 - Abaji East Market",
              "PU 008 - Abaji East Community Hall",
              "PU 009 - Abaji East Health Center",
              "PU 010 - Abaji East Mosque"
            ]
          },
          "abaji-west": {
            name: "Abaji West",
            pollingUnits: [
              "PU 011 - Abaji West Primary School",
              "PU 012 - Abaji West Market",
              "PU 013 - Abaji West Community Hall",
              "PU 014 - Abaji West Health Center",
              "PU 015 - Abaji West Mosque"
            ]
          },
          "abaji-north": {
            name: "Abaji North",
            pollingUnits: [
              "PU 016 - Abaji North Primary School",
              "PU 017 - Abaji North Market",
              "PU 018 - Abaji North Community Hall",
              "PU 019 - Abaji North Health Center",
              "PU 020 - Abaji North Mosque"
            ]
          },
          "abaji-south": {
            name: "Abaji South",
            pollingUnits: [
              "PU 021 - Abaji South Primary School",
              "PU 022 - Abaji South Market",
              "PU 023 - Abaji South Community Hall",
              "PU 024 - Abaji South Health Center",
              "PU 025 - Abaji South Mosque"
            ]
          }
        }
      },
      "abuja-municipal": { 
        name: "Abuja Municipal", 
        wards: {
          "abuja-municipal-central": {
            name: "Abuja Municipal Central",
            pollingUnits: [
              "PU 001 - Abuja Municipal Central Market",
              "PU 002 - Abuja Municipal Central Primary School",
              "PU 003 - Abuja Municipal Central Community Hall",
              "PU 004 - Abuja Municipal Central Health Center",
              "PU 005 - Abuja Municipal Central Mosque"
            ]
          },
          "abuja-municipal-east": {
            name: "Abuja Municipal East",
            pollingUnits: [
              "PU 006 - Abuja Municipal East Primary School",
              "PU 007 - Abuja Municipal East Market",
              "PU 008 - Abuja Municipal East Community Hall",
              "PU 009 - Abuja Municipal East Health Center",
              "PU 010 - Abuja Municipal East Mosque"
            ]
          },
          "abuja-municipal-west": {
            name: "Abuja Municipal West",
            pollingUnits: [
              "PU 011 - Abuja Municipal West Primary School",
              "PU 012 - Abuja Municipal West Market",
              "PU 013 - Abuja Municipal West Community Hall",
              "PU 014 - Abuja Municipal West Health Center",
              "PU 015 - Abuja Municipal West Mosque"
            ]
          },
          "abuja-municipal-north": {
            name: "Abuja Municipal North",
            pollingUnits: [
              "PU 016 - Abuja Municipal North Primary School",
              "PU 017 - Abuja Municipal North Market",
              "PU 018 - Abuja Municipal North Community Hall",
              "PU 019 - Abuja Municipal North Health Center",
              "PU 020 - Abuja Municipal North Mosque"
            ]
          },
          "abuja-municipal-south": {
            name: "Abuja Municipal South",
            pollingUnits: [
              "PU 021 - Abuja Municipal South Primary School",
              "PU 022 - Abuja Municipal South Market",
              "PU 023 - Abuja Municipal South Community Hall",
              "PU 024 - Abuja Municipal South Health Center",
              "PU 025 - Abuja Municipal South Mosque"
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
              "PU 001 - Gwagwalada Central Market",
              "PU 002 - Gwagwalada Central Primary School",
              "PU 003 - Gwagwalada Central Community Hall",
              "PU 004 - Gwagwalada Central Health Center",
              "PU 005 - Gwagwalada Central Mosque"
            ]
          },
          "gwagwalada-east": {
            name: "Gwagwalada East",
            pollingUnits: [
              "PU 006 - Gwagwalada East Primary School",
              "PU 007 - Gwagwalada East Market",
              "PU 008 - Gwagwalada East Community Hall",
              "PU 009 - Gwagwalada East Health Center",
              "PU 010 - Gwagwalada East Mosque"
            ]
          },
          "gwagwalada-west": {
            name: "Gwagwalada West",
            pollingUnits: [
              "PU 011 - Gwagwalada West Primary School",
              "PU 012 - Gwagwalada West Market",
              "PU 013 - Gwagwalada West Community Hall",
              "PU 014 - Gwagwalada West Health Center",
              "PU 015 - Gwagwalada West Mosque"
            ]
          },
          "gwagwalada-north": {
            name: "Gwagwalada North",
            pollingUnits: [
              "PU 016 - Gwagwalada North Primary School",
              "PU 017 - Gwagwalada North Market",
              "PU 018 - Gwagwalada North Community Hall",
              "PU 019 - Gwagwalada North Health Center",
              "PU 020 - Gwagwalada North Mosque"
            ]
          },
          "gwagwalada-south": {
            name: "Gwagwalada South",
            pollingUnits: [
              "PU 021 - Gwagwalada South Primary School",
              "PU 022 - Gwagwalada South Market",
              "PU 023 - Gwagwalada South Community Hall",
              "PU 024 - Gwagwalada South Health Center",
              "PU 025 - Gwagwalada South Mosque"
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
              "PU 001 - Kuje Central Market",
              "PU 002 - Kuje Central Primary School",
              "PU 003 - Kuje Central Community Hall",
              "PU 004 - Kuje Central Health Center",
              "PU 005 - Kuje Central Mosque"
            ]
          },
          "kuje-east": {
            name: "Kuje East",
            pollingUnits: [
              "PU 006 - Kuje East Primary School",
              "PU 007 - Kuje East Market",
              "PU 008 - Kuje East Community Hall",
              "PU 009 - Kuje East Health Center",
              "PU 010 - Kuje East Mosque"
            ]
          },
          "kuje-west": {
            name: "Kuje West",
            pollingUnits: [
              "PU 011 - Kuje West Primary School",
              "PU 012 - Kuje West Market",
              "PU 013 - Kuje West Community Hall",
              "PU 014 - Kuje West Health Center",
              "PU 015 - Kuje West Mosque"
            ]
          },
          "kuje-north": {
            name: "Kuje North",
            pollingUnits: [
              "PU 016 - Kuje North Primary School",
              "PU 017 - Kuje North Market",
              "PU 018 - Kuje North Community Hall",
              "PU 019 - Kuje North Health Center",
              "PU 020 - Kuje North Mosque"
            ]
          },
          "kuje-south": {
            name: "Kuje South",
            pollingUnits: [
              "PU 021 - Kuje South Primary School",
              "PU 022 - Kuje South Market",
              "PU 023 - Kuje South Community Hall",
              "PU 024 - Kuje South Health Center",
              "PU 025 - Kuje South Mosque"
            ]
          }
        }
      },
      "kwali": { 
        name: "Kwali", 
        wards: {
          "kwali-central": {
            name: "Kwali Central",
            pollingUnits: [
              "PU 001 - Kwali Central Market",
              "PU 002 - Kwali Central Primary School",
              "PU 003 - Kwali Central Community Hall",
              "PU 004 - Kwali Central Health Center",
              "PU 005 - Kwali Central Mosque"
            ]
          },
          "kwali-east": {
            name: "Kwali East",
            pollingUnits: [
              "PU 006 - Kwali East Primary School",
              "PU 007 - Kwali East Market",
              "PU 008 - Kwali East Community Hall",
              "PU 009 - Kwali East Health Center",
              "PU 010 - Kwali East Mosque"
            ]
          },
          "kwali-west": {
            name: "Kwali West",
            pollingUnits: [
              "PU 011 - Kwali West Primary School",
              "PU 012 - Kwali West Market",
              "PU 013 - Kwali West Community Hall",
              "PU 014 - Kwali West Health Center",
              "PU 015 - Kwali West Mosque"
            ]
          },
          "kwali-north": {
            name: "Kwali North",
            pollingUnits: [
              "PU 016 - Kwali North Primary School",
              "PU 017 - Kwali North Market",
              "PU 018 - Kwali North Community Hall",
              "PU 019 - Kwali North Health Center",
              "PU 020 - Kwali North Mosque"
            ]
          },
          "kwali-south": {
            name: "Kwali South",
            pollingUnits: [
              "PU 021 - Kwali South Primary School",
              "PU 022 - Kwali South Market",
              "PU 023 - Kwali South Community Hall",
              "PU 024 - Kwali South Health Center",
              "PU 025 - Kwali South Mosque"
            ]
          }
        }
      }
    }
  },
  gombe: {
    name: "Gombe",
    lgas: {
      "akko": { 
        name: "Akko", 
        wards: {
          "akko-central": {
            name: "Akko Central",
            pollingUnits: [
              "PU 001 - Akko Central Market",
              "PU 002 - Akko Central Primary School",
              "PU 003 - Akko Central Community Hall",
              "PU 004 - Akko Central Health Center",
              "PU 005 - Akko Central Mosque"
            ]
          },
          "akko-east": {
            name: "Akko East",
            pollingUnits: [
              "PU 006 - Akko East Primary School",
              "PU 007 - Akko East Market",
              "PU 008 - Akko East Community Hall",
              "PU 009 - Akko East Health Center",
              "PU 010 - Akko East Mosque"
            ]
          },
          "akko-west": {
            name: "Akko West",
            pollingUnits: [
              "PU 011 - Akko West Primary School",
              "PU 012 - Akko West Market",
              "PU 013 - Akko West Community Hall",
              "PU 014 - Akko West Health Center",
              "PU 015 - Akko West Mosque"
            ]
          },
          "akko-north": {
            name: "Akko North",
            pollingUnits: [
              "PU 016 - Akko North Primary School",
              "PU 017 - Akko North Market",
              "PU 018 - Akko North Community Hall",
              "PU 019 - Akko North Health Center",
              "PU 020 - Akko North Mosque"
            ]
          },
          "akko-south": {
            name: "Akko South",
            pollingUnits: [
              "PU 021 - Akko South Primary School",
              "PU 022 - Akko South Market",
              "PU 023 - Akko South Community Hall",
              "PU 024 - Akko South Health Center",
              "PU 025 - Akko South Mosque"
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
              "PU 001 - Balanga Central Market",
              "PU 002 - Balanga Central Primary School",
              "PU 003 - Balanga Central Community Hall",
              "PU 004 - Balanga Central Health Center",
              "PU 005 - Balanga Central Mosque"
            ]
          },
          "balanga-east": {
            name: "Balanga East",
            pollingUnits: [
              "PU 006 - Balanga East Primary School",
              "PU 007 - Balanga East Market",
              "PU 008 - Balanga East Community Hall",
              "PU 009 - Balanga East Health Center",
              "PU 010 - Balanga East Mosque"
            ]
          },
          "balanga-west": {
            name: "Balanga West",
            pollingUnits: [
              "PU 011 - Balanga West Primary School",
              "PU 012 - Balanga West Market",
              "PU 013 - Balanga West Community Hall",
              "PU 014 - Balanga West Health Center",
              "PU 015 - Balanga West Mosque"
            ]
          },
          "balanga-north": {
            name: "Balanga North",
            pollingUnits: [
              "PU 016 - Balanga North Primary School",
              "PU 017 - Balanga North Market",
              "PU 018 - Balanga North Community Hall",
              "PU 019 - Balanga North Health Center",
              "PU 020 - Balanga North Mosque"
            ]
          },
          "balanga-south": {
            name: "Balanga South",
            pollingUnits: [
              "PU 021 - Balanga South Primary School",
              "PU 022 - Balanga South Market",
              "PU 023 - Balanga South Community Hall",
              "PU 024 - Balanga South Health Center",
              "PU 025 - Balanga South Mosque"
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
              "PU 001 - Billiri Central Market",
              "PU 002 - Billiri Central Primary School",
              "PU 003 - Billiri Central Community Hall",
              "PU 004 - Billiri Central Health Center",
              "PU 005 - Billiri Central Mosque"
            ]
          },
          "billiri-east": {
            name: "Billiri East",
            pollingUnits: [
              "PU 006 - Billiri East Primary School",
              "PU 007 - Billiri East Market",
              "PU 008 - Billiri East Community Hall",
              "PU 009 - Billiri East Health Center",
              "PU 010 - Billiri East Mosque"
            ]
          },
          "billiri-west": {
            name: "Billiri West",
            pollingUnits: [
              "PU 011 - Billiri West Primary School",
              "PU 012 - Billiri West Market",
              "PU 013 - Billiri West Community Hall",
              "PU 014 - Billiri West Health Center",
              "PU 015 - Billiri West Mosque"
            ]
          },
          "billiri-north": {
            name: "Billiri North",
            pollingUnits: [
              "PU 016 - Billiri North Primary School",
              "PU 017 - Billiri North Market",
              "PU 018 - Billiri North Community Hall",
              "PU 019 - Billiri North Health Center",
              "PU 020 - Billiri North Mosque"
            ]
          },
          "billiri-south": {
            name: "Billiri South",
            pollingUnits: [
              "PU 021 - Billiri South Primary School",
              "PU 022 - Billiri South Market",
              "PU 023 - Billiri South Community Hall",
              "PU 024 - Billiri South Health Center",
              "PU 025 - Billiri South Mosque"
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
              "PU 001 - Dukku Central Market",
              "PU 002 - Dukku Central Primary School",
              "PU 003 - Dukku Central Community Hall",
              "PU 004 - Dukku Central Health Center",
              "PU 005 - Dukku Central Mosque"
            ]
          },
          "dukku-east": {
            name: "Dukku East",
            pollingUnits: [
              "PU 006 - Dukku East Primary School",
              "PU 007 - Dukku East Market",
              "PU 008 - Dukku East Community Hall",
              "PU 009 - Dukku East Health Center",
              "PU 010 - Dukku East Mosque"
            ]
          },
          "dukku-west": {
            name: "Dukku West",
            pollingUnits: [
              "PU 011 - Dukku West Primary School",
              "PU 012 - Dukku West Market",
              "PU 013 - Dukku West Community Hall",
              "PU 014 - Dukku West Health Center",
              "PU 015 - Dukku West Mosque"
            ]
          },
          "dukku-north": {
            name: "Dukku North",
            pollingUnits: [
              "PU 016 - Dukku North Primary School",
              "PU 017 - Dukku North Market",
              "PU 018 - Dukku North Community Hall",
              "PU 019 - Dukku North Health Center",
              "PU 020 - Dukku North Mosque"
            ]
          },
          "dukku-south": {
            name: "Dukku South",
            pollingUnits: [
              "PU 021 - Dukku South Primary School",
              "PU 022 - Dukku South Market",
              "PU 023 - Dukku South Community Hall",
              "PU 024 - Dukku South Health Center",
              "PU 025 - Dukku South Mosque"
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
              "PU 001 - Funakaye Central Market",
              "PU 002 - Funakaye Central Primary School",
              "PU 003 - Funakaye Central Community Hall",
              "PU 004 - Funakaye Central Health Center",
              "PU 005 - Funakaye Central Mosque"
            ]
          },
          "funakaye-east": {
            name: "Funakaye East",
            pollingUnits: [
              "PU 006 - Funakaye East Primary School",
              "PU 007 - Funakaye East Market",
              "PU 008 - Funakaye East Community Hall",
              "PU 009 - Funakaye East Health Center",
              "PU 010 - Funakaye East Mosque"
            ]
          },
          "funakaye-west": {
            name: "Funakaye West",
            pollingUnits: [
              "PU 011 - Funakaye West Primary School",
              "PU 012 - Funakaye West Market",
              "PU 013 - Funakaye West Community Hall",
              "PU 014 - Funakaye West Health Center",
              "PU 015 - Funakaye West Mosque"
            ]
          },
          "funakaye-north": {
            name: "Funakaye North",
            pollingUnits: [
              "PU 016 - Funakaye North Primary School",
              "PU 017 - Funakaye North Market",
              "PU 018 - Funakaye North Community Hall",
              "PU 019 - Funakaye North Health Center",
              "PU 020 - Funakaye North Mosque"
            ]
          },
          "funakaye-south": {
            name: "Funakaye South",
            pollingUnits: [
              "PU 021 - Funakaye South Primary School",
              "PU 022 - Funakaye South Market",
              "PU 023 - Funakaye South Community Hall",
              "PU 024 - Funakaye South Health Center",
              "PU 025 - Funakaye South Mosque"
            ]
          }
        }
      },
      "gombe": { name: "Gombe", wards: {} },
      "kaltungo": { name: "Kaltungo", wards: {} },
      "kwami": { name: "Kwami", wards: {} },
      "nasarawa": { name: "Nasarawa", wards: {} },
      "shongom": { name: "Shongom", wards: {} },
      "yamaltu-deba": { name: "Yamaltu Deba", wards: {} }
    }
  },
  imo: {
    name: "Imo",
    lgas: {
      "aboh-mbaise": { 
        name: "Aboh Mbaise", 
        wards: {
          "aboh-mbaise-central": {
            name: "Aboh Mbaise Central",
            pollingUnits: [
              "PU 001 - Aboh Mbaise Central Market",
              "PU 002 - Aboh Mbaise Central Primary School",
              "PU 003 - Aboh Mbaise Central Community Hall",
              "PU 004 - Aboh Mbaise Central Health Center",
              "PU 005 - Aboh Mbaise Central Church"
            ]
          },
          "aboh-mbaise-east": {
            name: "Aboh Mbaise East",
            pollingUnits: [
              "PU 006 - Aboh Mbaise East Primary School",
              "PU 007 - Aboh Mbaise East Market",
              "PU 008 - Aboh Mbaise East Community Hall",
              "PU 009 - Aboh Mbaise East Health Center",
              "PU 010 - Aboh Mbaise East Church"
            ]
          },
          "aboh-mbaise-west": {
            name: "Aboh Mbaise West",
            pollingUnits: [
              "PU 011 - Aboh Mbaise West Primary School",
              "PU 012 - Aboh Mbaise West Market",
              "PU 013 - Aboh Mbaise West Community Hall",
              "PU 014 - Aboh Mbaise West Health Center",
              "PU 015 - Aboh Mbaise West Church"
            ]
          },
          "aboh-mbaise-north": {
            name: "Aboh Mbaise North",
            pollingUnits: [
              "PU 016 - Aboh Mbaise North Primary School",
              "PU 017 - Aboh Mbaise North Market",
              "PU 018 - Aboh Mbaise North Community Hall",
              "PU 019 - Aboh Mbaise North Health Center",
              "PU 020 - Aboh Mbaise North Church"
            ]
          },
          "aboh-mbaise-south": {
            name: "Aboh Mbaise South",
            pollingUnits: [
              "PU 021 - Aboh Mbaise South Primary School",
              "PU 022 - Aboh Mbaise South Market",
              "PU 023 - Aboh Mbaise South Community Hall",
              "PU 024 - Aboh Mbaise South Health Center",
              "PU 025 - Aboh Mbaise South Church"
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
              "PU 001 - Ahiazu Mbaise Central Market",
              "PU 002 - Ahiazu Mbaise Central Primary School",
              "PU 003 - Ahiazu Mbaise Central Community Hall",
              "PU 004 - Ahiazu Mbaise Central Health Center",
              "PU 005 - Ahiazu Mbaise Central Church"
            ]
          },
          "ahiazu-mbaise-east": {
            name: "Ahiazu Mbaise East",
            pollingUnits: [
              "PU 006 - Ahiazu Mbaise East Primary School",
              "PU 007 - Ahiazu Mbaise East Market",
              "PU 008 - Ahiazu Mbaise East Community Hall",
              "PU 009 - Ahiazu Mbaise East Health Center",
              "PU 010 - Ahiazu Mbaise East Church"
            ]
          },
          "ahiazu-mbaise-west": {
            name: "Ahiazu Mbaise West",
            pollingUnits: [
              "PU 011 - Ahiazu Mbaise West Primary School",
              "PU 012 - Ahiazu Mbaise West Market",
              "PU 013 - Ahiazu Mbaise West Community Hall",
              "PU 014 - Ahiazu Mbaise West Health Center",
              "PU 015 - Ahiazu Mbaise West Church"
            ]
          },
          "ahiazu-mbaise-north": {
            name: "Ahiazu Mbaise North",
            pollingUnits: [
              "PU 016 - Ahiazu Mbaise North Primary School",
              "PU 017 - Ahiazu Mbaise North Market",
              "PU 018 - Ahiazu Mbaise North Community Hall",
              "PU 019 - Ahiazu Mbaise North Health Center",
              "PU 020 - Ahiazu Mbaise North Church"
            ]
          },
          "ahiazu-mbaise-south": {
            name: "Ahiazu Mbaise South",
            pollingUnits: [
              "PU 021 - Ahiazu Mbaise South Primary School",
              "PU 022 - Ahiazu Mbaise South Market",
              "PU 023 - Ahiazu Mbaise South Community Hall",
              "PU 024 - Ahiazu Mbaise South Health Center",
              "PU 025 - Ahiazu Mbaise South Church"
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
              "PU 001 - Ehime Mbano Central Market",
              "PU 002 - Ehime Mbano Central Primary School",
              "PU 003 - Ehime Mbano Central Community Hall",
              "PU 004 - Ehime Mbano Central Health Center",
              "PU 005 - Ehime Mbano Central Church"
            ]
          },
          "ehime-mbano-east": {
            name: "Ehime Mbano East",
            pollingUnits: [
              "PU 006 - Ehime Mbano East Primary School",
              "PU 007 - Ehime Mbano East Market",
              "PU 008 - Ehime Mbano East Community Hall",
              "PU 009 - Ehime Mbano East Health Center",
              "PU 010 - Ehime Mbano East Church"
            ]
          },
          "ehime-mbano-west": {
            name: "Ehime Mbano West",
            pollingUnits: [
              "PU 011 - Ehime Mbano West Primary School",
              "PU 012 - Ehime Mbano West Market",
              "PU 013 - Ehime Mbano West Community Hall",
              "PU 014 - Ehime Mbano West Health Center",
              "PU 015 - Ehime Mbano West Church"
            ]
          },
          "ehime-mbano-north": {
            name: "Ehime Mbano North",
            pollingUnits: [
              "PU 016 - Ehime Mbano North Primary School",
              "PU 017 - Ehime Mbano North Market",
              "PU 018 - Ehime Mbano North Community Hall",
              "PU 019 - Ehime Mbano North Health Center",
              "PU 020 - Ehime Mbano North Church"
            ]
          },
          "ehime-mbano-south": {
            name: "Ehime Mbano South",
            pollingUnits: [
              "PU 021 - Ehime Mbano South Primary School",
              "PU 022 - Ehime Mbano South Market",
              "PU 023 - Ehime Mbano South Community Hall",
              "PU 024 - Ehime Mbano South Health Center",
              "PU 025 - Ehime Mbano South Church"
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
              "PU 001 - Ezinihitte Central Market",
              "PU 002 - Ezinihitte Central Primary School",
              "PU 003 - Ezinihitte Central Community Hall",
              "PU 004 - Ezinihitte Central Health Center",
              "PU 005 - Ezinihitte Central Church"
            ]
          },
          "ezinihitte-east": {
            name: "Ezinihitte East",
            pollingUnits: [
              "PU 006 - Ezinihitte East Primary School",
              "PU 007 - Ezinihitte East Market",
              "PU 008 - Ezinihitte East Community Hall",
              "PU 009 - Ezinihitte East Health Center",
              "PU 010 - Ezinihitte East Church"
            ]
          },
          "ezinihitte-west": {
            name: "Ezinihitte West",
            pollingUnits: [
              "PU 011 - Ezinihitte West Primary School",
              "PU 012 - Ezinihitte West Market",
              "PU 013 - Ezinihitte West Community Hall",
              "PU 014 - Ezinihitte West Health Center",
              "PU 015 - Ezinihitte West Church"
            ]
          },
          "ezinihitte-north": {
            name: "Ezinihitte North",
            pollingUnits: [
              "PU 016 - Ezinihitte North Primary School",
              "PU 017 - Ezinihitte North Market",
              "PU 018 - Ezinihitte North Community Hall",
              "PU 019 - Ezinihitte North Health Center",
              "PU 020 - Ezinihitte North Church"
            ]
          },
          "ezinihitte-south": {
            name: "Ezinihitte South",
            pollingUnits: [
              "PU 021 - Ezinihitte South Primary School",
              "PU 022 - Ezinihitte South Market",
              "PU 023 - Ezinihitte South Community Hall",
              "PU 024 - Ezinihitte South Health Center",
              "PU 025 - Ezinihitte South Church"
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
              "PU 001 - Ideato North Central Market",
              "PU 002 - Ideato North Central Primary School",
              "PU 003 - Ideato North Central Community Hall",
              "PU 004 - Ideato North Central Health Center",
              "PU 005 - Ideato North Central Church"
            ]
          },
          "ideato-north-east": {
            name: "Ideato North East",
            pollingUnits: [
              "PU 006 - Ideato North East Primary School",
              "PU 007 - Ideato North East Market",
              "PU 008 - Ideato North East Community Hall",
              "PU 009 - Ideato North East Health Center",
              "PU 010 - Ideato North East Church"
            ]
          },
          "ideato-north-west": {
            name: "Ideato North West",
            pollingUnits: [
              "PU 011 - Ideato North West Primary School",
              "PU 012 - Ideato North West Market",
              "PU 013 - Ideato North West Community Hall",
              "PU 014 - Ideato North West Health Center",
              "PU 015 - Ideato North West Church"
            ]
          },
          "ideato-north-north": {
            name: "Ideato North North",
            pollingUnits: [
              "PU 016 - Ideato North North Primary School",
              "PU 017 - Ideato North North Market",
              "PU 018 - Ideato North North Community Hall",
              "PU 019 - Ideato North North Health Center",
              "PU 020 - Ideato North North Church"
            ]
          },
          "ideato-north-south": {
            name: "Ideato North South",
            pollingUnits: [
              "PU 021 - Ideato North South Primary School",
              "PU 022 - Ideato North South Market",
              "PU 023 - Ideato North South Community Hall",
              "PU 024 - Ideato North South Health Center",
              "PU 025 - Ideato North South Church"
            ]
          }
        }
      },
      "ideato-south": { name: "Ideato South", wards: {} },
      "ihitte-uboma": { name: "Ihitte Uboma", wards: {} },
      "ikeduru": { name: "Ikeduru", wards: {} },
      "isiala-mbano": { name: "Isiala Mbano", wards: {} },
      "isu": { name: "Isu", wards: {} },
      "mbaitoli": { name: "Mbaitoli", wards: {} },
      "ngor-okpala": { name: "Ngor Okpala", wards: {} },
      "njaba": { name: "Njaba", wards: {} },
      "nkwerre": { name: "Nkwerre", wards: {} },
      "nwangele": { name: "Nwangele", wards: {} },
      "obowo": { name: "Obowo", wards: {} },
      "oguta": { name: "Oguta", wards: {} },
      "ohaji-egbema": { name: "Ohaji Egbema", wards: {} },
      "okigwe": { name: "Okigwe", wards: {} },
      "onimo": { name: "Onimo", wards: {} },
      "orlu": { name: "Orlu", wards: {} },
      "orsu": { name: "Orsu", wards: {} },
      "oru-east": { name: "Oru East", wards: {} },
      "oru-west": { name: "Oru West", wards: {} },
      "owerri-municipal": { name: "Owerri Municipal", wards: {} },
      "owerri-north": { name: "Owerri North", wards: {} },
      "owerri-west": { name: "Owerri West", wards: {} },
      "unuimo": { name: "Unuimo", wards: {} }
    }
  },
  jigawa: {
    name: "Jigawa",
    lgas: {
      "auyo": { 
        name: "Auyo", 
        wards: {
          "auyo-central": {
            name: "Auyo Central",
            pollingUnits: [
              "PU 001 - Auyo Central Market",
              "PU 002 - Auyo Central Primary School",
              "PU 003 - Auyo Central Community Hall",
              "PU 004 - Auyo Central Health Center",
              "PU 005 - Auyo Central Mosque"
            ]
          },
          "auyo-east": {
            name: "Auyo East",
            pollingUnits: [
              "PU 006 - Auyo East Primary School",
              "PU 007 - Auyo East Market",
              "PU 008 - Auyo East Community Hall",
              "PU 009 - Auyo East Health Center",
              "PU 010 - Auyo East Mosque"
            ]
          },
          "auyo-west": {
            name: "Auyo West",
            pollingUnits: [
              "PU 011 - Auyo West Primary School",
              "PU 012 - Auyo West Market",
              "PU 013 - Auyo West Community Hall",
              "PU 014 - Auyo West Health Center",
              "PU 015 - Auyo West Mosque"
            ]
          },
          "auyo-north": {
            name: "Auyo North",
            pollingUnits: [
              "PU 016 - Auyo North Primary School",
              "PU 017 - Auyo North Market",
              "PU 018 - Auyo North Community Hall",
              "PU 019 - Auyo North Health Center",
              "PU 020 - Auyo North Mosque"
            ]
          },
          "auyo-south": {
            name: "Auyo South",
            pollingUnits: [
              "PU 021 - Auyo South Primary School",
              "PU 022 - Auyo South Market",
              "PU 023 - Auyo South Community Hall",
              "PU 024 - Auyo South Health Center",
              "PU 025 - Auyo South Mosque"
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
              "PU 001 - Babura Central Market",
              "PU 002 - Babura Central Primary School",
              "PU 003 - Babura Central Community Hall",
              "PU 004 - Babura Central Health Center",
              "PU 005 - Babura Central Mosque"
            ]
          },
          "babura-east": {
            name: "Babura East",
            pollingUnits: [
              "PU 006 - Babura East Primary School",
              "PU 007 - Babura East Market",
              "PU 008 - Babura East Community Hall",
              "PU 009 - Babura East Health Center",
              "PU 010 - Babura East Mosque"
            ]
          },
          "babura-west": {
            name: "Babura West",
            pollingUnits: [
              "PU 011 - Babura West Primary School",
              "PU 012 - Babura West Market",
              "PU 013 - Babura West Community Hall",
              "PU 014 - Babura West Health Center",
              "PU 015 - Babura West Mosque"
            ]
          },
          "babura-north": {
            name: "Babura North",
            pollingUnits: [
              "PU 016 - Babura North Primary School",
              "PU 017 - Babura North Market",
              "PU 018 - Babura North Community Hall",
              "PU 019 - Babura North Health Center",
              "PU 020 - Babura North Mosque"
            ]
          },
          "babura-south": {
            name: "Babura South",
            pollingUnits: [
              "PU 021 - Babura South Primary School",
              "PU 022 - Babura South Market",
              "PU 023 - Babura South Community Hall",
              "PU 024 - Babura South Health Center",
              "PU 025 - Babura South Mosque"
            ]
          }
        }
      },
      "biriniwa": { 
        name: "Biriniwa", 
        wards: {
          "biriniwa-central": {
            name: "Biriniwa Central",
            pollingUnits: [
              "PU 001 - Biriniwa Central Market",
              "PU 002 - Biriniwa Central Primary School",
              "PU 003 - Biriniwa Central Community Hall",
              "PU 004 - Biriniwa Central Health Center",
              "PU 005 - Biriniwa Central Mosque"
            ]
          },
          "biriniwa-east": {
            name: "Biriniwa East",
            pollingUnits: [
              "PU 006 - Biriniwa East Primary School",
              "PU 007 - Biriniwa East Market",
              "PU 008 - Biriniwa East Community Hall",
              "PU 009 - Biriniwa East Health Center",
              "PU 010 - Biriniwa East Mosque"
            ]
          },
          "biriniwa-west": {
            name: "Biriniwa West",
            pollingUnits: [
              "PU 011 - Biriniwa West Primary School",
              "PU 012 - Biriniwa West Market",
              "PU 013 - Biriniwa West Community Hall",
              "PU 014 - Biriniwa West Health Center",
              "PU 015 - Biriniwa West Mosque"
            ]
          },
          "biriniwa-north": {
            name: "Biriniwa North",
            pollingUnits: [
              "PU 016 - Biriniwa North Primary School",
              "PU 017 - Biriniwa North Market",
              "PU 018 - Biriniwa North Community Hall",
              "PU 019 - Biriniwa North Health Center",
              "PU 020 - Biriniwa North Mosque"
            ]
          },
          "biriniwa-south": {
            name: "Biriniwa South",
            pollingUnits: [
              "PU 021 - Biriniwa South Primary School",
              "PU 022 - Biriniwa South Market",
              "PU 023 - Biriniwa South Community Hall",
              "PU 024 - Biriniwa South Health Center",
              "PU 025 - Biriniwa South Mosque"
            ]
          }
        }
      },
      "birnin-kudu": { 
        name: "Birnin Kudu", 
        wards: {
          "birnin-kudu-central": {
            name: "Birnin Kudu Central",
            pollingUnits: [
              "PU 001 - Birnin Kudu Central Market",
              "PU 002 - Birnin Kudu Central Primary School",
              "PU 003 - Birnin Kudu Central Community Hall",
              "PU 004 - Birnin Kudu Central Health Center",
              "PU 005 - Birnin Kudu Central Mosque"
            ]
          },
          "birnin-kudu-east": {
            name: "Birnin Kudu East",
            pollingUnits: [
              "PU 006 - Birnin Kudu East Primary School",
              "PU 007 - Birnin Kudu East Market",
              "PU 008 - Birnin Kudu East Community Hall",
              "PU 009 - Birnin Kudu East Health Center",
              "PU 010 - Birnin Kudu East Mosque"
            ]
          },
          "birnin-kudu-west": {
            name: "Birnin Kudu West",
            pollingUnits: [
              "PU 011 - Birnin Kudu West Primary School",
              "PU 012 - Birnin Kudu West Market",
              "PU 013 - Birnin Kudu West Community Hall",
              "PU 014 - Birnin Kudu West Health Center",
              "PU 015 - Birnin Kudu West Mosque"
            ]
          },
          "birnin-kudu-north": {
            name: "Birnin Kudu North",
            pollingUnits: [
              "PU 016 - Birnin Kudu North Primary School",
              "PU 017 - Birnin Kudu North Market",
              "PU 018 - Birnin Kudu North Community Hall",
              "PU 019 - Birnin Kudu North Health Center",
              "PU 020 - Birnin Kudu North Mosque"
            ]
          },
          "birnin-kudu-south": {
            name: "Birnin Kudu South",
            pollingUnits: [
              "PU 021 - Birnin Kudu South Primary School",
              "PU 022 - Birnin Kudu South Market",
              "PU 023 - Birnin Kudu South Community Hall",
              "PU 024 - Birnin Kudu South Health Center",
              "PU 025 - Birnin Kudu South Mosque"
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
              "PU 001 - Buji Central Market",
              "PU 002 - Buji Central Primary School",
              "PU 003 - Buji Central Community Hall",
              "PU 004 - Buji Central Health Center",
              "PU 005 - Buji Central Mosque"
            ]
          },
          "buji-east": {
            name: "Buji East",
            pollingUnits: [
              "PU 006 - Buji East Primary School",
              "PU 007 - Buji East Market",
              "PU 008 - Buji East Community Hall",
              "PU 009 - Buji East Health Center",
              "PU 010 - Buji East Mosque"
            ]
          },
          "buji-west": {
            name: "Buji West",
            pollingUnits: [
              "PU 011 - Buji West Primary School",
              "PU 012 - Buji West Market",
              "PU 013 - Buji West Community Hall",
              "PU 014 - Buji West Health Center",
              "PU 015 - Buji West Mosque"
            ]
          },
          "buji-north": {
            name: "Buji North",
            pollingUnits: [
              "PU 016 - Buji North Primary School",
              "PU 017 - Buji North Market",
              "PU 018 - Buji North Community Hall",
              "PU 019 - Buji North Health Center",
              "PU 020 - Buji North Mosque"
            ]
          },
          "buji-south": {
            name: "Buji South",
            pollingUnits: [
              "PU 021 - Buji South Primary School",
              "PU 022 - Buji South Market",
              "PU 023 - Buji South Community Hall",
              "PU 024 - Buji South Health Center",
              "PU 025 - Buji South Mosque"
            ]
          }
        }
      },
      "dutse": { name: "Dutse", wards: {} },
      "gagarawa": { name: "Gagarawa", wards: {} },
      "garki": { name: "Garki", wards: {} },
      "gumel": { name: "Gumel", wards: {} },
      "guri": { name: "Guri", wards: {} },
      "gwaram": { name: "Gwaram", wards: {} },
      "gwiwa": { name: "Gwiwa", wards: {} },
      "hadejia": { name: "Hadejia", wards: {} },
      "jahun": { name: "Jahun", wards: {} },
      "kafin-hausa": { name: "Kafin Hausa", wards: {} },
      "kaugama": { name: "Kaugama", wards: {} },
      "kazaure": { name: "Kazaure", wards: {} },
      "kiri-kasamma": { name: "Kiri Kasamma", wards: {} },
      "kiyawa": { name: "Kiyawa", wards: {} },
      "maigatari": { name: "Maigatari", wards: {} },
      "malam-madori": { name: "Malam Madori", wards: {} },
      "miga": { name: "Miga", wards: {} },
      "ringim": { name: "Ringim", wards: {} },
      "roni": { name: "Roni", wards: {} },
      "sule-tankarkar": { name: "Sule Tankarkar", wards: {} },
      "tauri": { name: "Tauri", wards: {} },
      "yankwashi": { name: "Yankwashi", wards: {} }
    }
  },
  kaduna: {
    name: "Kaduna",
    lgas: {
      "birnin-gwari": { 
        name: "Birnin Gwari", 
        wards: {
          "birnin-gwari-central": {
            name: "Birnin Gwari Central",
            pollingUnits: [
              "PU 001 - Birnin Gwari Central Market",
              "PU 002 - Birnin Gwari Central Primary School",
              "PU 003 - Birnin Gwari Central Community Hall",
              "PU 004 - Birnin Gwari Central Health Center",
              "PU 005 - Birnin Gwari Central Mosque"
            ]
          },
          "birnin-gwari-east": {
            name: "Birnin Gwari East",
            pollingUnits: [
              "PU 006 - Birnin Gwari East Primary School",
              "PU 007 - Birnin Gwari East Market",
              "PU 008 - Birnin Gwari East Community Hall",
              "PU 009 - Birnin Gwari East Health Center",
              "PU 010 - Birnin Gwari East Mosque"
            ]
          },
          "birnin-gwari-west": {
            name: "Birnin Gwari West",
            pollingUnits: [
              "PU 011 - Birnin Gwari West Primary School",
              "PU 012 - Birnin Gwari West Market",
              "PU 013 - Birnin Gwari West Community Hall",
              "PU 014 - Birnin Gwari West Health Center",
              "PU 015 - Birnin Gwari West Mosque"
            ]
          },
          "birnin-gwari-north": {
            name: "Birnin Gwari North",
            pollingUnits: [
              "PU 016 - Birnin Gwari North Primary School",
              "PU 017 - Birnin Gwari North Market",
              "PU 018 - Birnin Gwari North Community Hall",
              "PU 019 - Birnin Gwari North Health Center",
              "PU 020 - Birnin Gwari North Mosque"
            ]
          },
          "birnin-gwari-south": {
            name: "Birnin Gwari South",
            pollingUnits: [
              "PU 021 - Birnin Gwari South Primary School",
              "PU 022 - Birnin Gwari South Market",
              "PU 023 - Birnin Gwari South Community Hall",
              "PU 024 - Birnin Gwari South Health Center",
              "PU 025 - Birnin Gwari South Mosque"
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
              "PU 001 - Chikun Central Market",
              "PU 002 - Chikun Central Primary School",
              "PU 003 - Chikun Central Community Hall",
              "PU 004 - Chikun Central Health Center",
              "PU 005 - Chikun Central Mosque"
            ]
          },
          "chikun-east": {
            name: "Chikun East",
            pollingUnits: [
              "PU 006 - Chikun East Primary School",
              "PU 007 - Chikun East Market",
              "PU 008 - Chikun East Community Hall",
              "PU 009 - Chikun East Health Center",
              "PU 010 - Chikun East Mosque"
            ]
          },
          "chikun-west": {
            name: "Chikun West",
            pollingUnits: [
              "PU 011 - Chikun West Primary School",
              "PU 012 - Chikun West Market",
              "PU 013 - Chikun West Community Hall",
              "PU 014 - Chikun West Health Center",
              "PU 015 - Chikun West Mosque"
            ]
          },
          "chikun-north": {
            name: "Chikun North",
            pollingUnits: [
              "PU 016 - Chikun North Primary School",
              "PU 017 - Chikun North Market",
              "PU 018 - Chikun North Community Hall",
              "PU 019 - Chikun North Health Center",
              "PU 020 - Chikun North Mosque"
            ]
          },
          "chikun-south": {
            name: "Chikun South",
            pollingUnits: [
              "PU 021 - Chikun South Primary School",
              "PU 022 - Chikun South Market",
              "PU 023 - Chikun South Community Hall",
              "PU 024 - Chikun South Health Center",
              "PU 025 - Chikun South Mosque"
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
              "PU 001 - Giwa Central Market",
              "PU 002 - Giwa Central Primary School",
              "PU 003 - Giwa Central Community Hall",
              "PU 004 - Giwa Central Health Center",
              "PU 005 - Giwa Central Mosque"
            ]
          },
          "giwa-east": {
            name: "Giwa East",
            pollingUnits: [
              "PU 006 - Giwa East Primary School",
              "PU 007 - Giwa East Market",
              "PU 008 - Giwa East Community Hall",
              "PU 009 - Giwa East Health Center",
              "PU 010 - Giwa East Mosque"
            ]
          },
          "giwa-west": {
            name: "Giwa West",
            pollingUnits: [
              "PU 011 - Giwa West Primary School",
              "PU 012 - Giwa West Market",
              "PU 013 - Giwa West Community Hall",
              "PU 014 - Giwa West Health Center",
              "PU 015 - Giwa West Mosque"
            ]
          },
          "giwa-north": {
            name: "Giwa North",
            pollingUnits: [
              "PU 016 - Giwa North Primary School",
              "PU 017 - Giwa North Market",
              "PU 018 - Giwa North Community Hall",
              "PU 019 - Giwa North Health Center",
              "PU 020 - Giwa North Mosque"
            ]
          },
          "giwa-south": {
            name: "Giwa South",
            pollingUnits: [
              "PU 021 - Giwa South Primary School",
              "PU 022 - Giwa South Market",
              "PU 023 - Giwa South Community Hall",
              "PU 024 - Giwa South Health Center",
              "PU 025 - Giwa South Mosque"
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
              "PU 001 - Igabi Central Market",
              "PU 002 - Igabi Central Primary School",
              "PU 003 - Igabi Central Community Hall",
              "PU 004 - Igabi Central Health Center",
              "PU 005 - Igabi Central Mosque"
            ]
          },
          "igabi-east": {
            name: "Igabi East",
            pollingUnits: [
              "PU 006 - Igabi East Primary School",
              "PU 007 - Igabi East Market",
              "PU 008 - Igabi East Community Hall",
              "PU 009 - Igabi East Health Center",
              "PU 010 - Igabi East Mosque"
            ]
          },
          "igabi-west": {
            name: "Igabi West",
            pollingUnits: [
              "PU 011 - Igabi West Primary School",
              "PU 012 - Igabi West Market",
              "PU 013 - Igabi West Community Hall",
              "PU 014 - Igabi West Health Center",
              "PU 015 - Igabi West Mosque"
            ]
          },
          "igabi-north": {
            name: "Igabi North",
            pollingUnits: [
              "PU 016 - Igabi North Primary School",
              "PU 017 - Igabi North Market",
              "PU 018 - Igabi North Community Hall",
              "PU 019 - Igabi North Health Center",
              "PU 020 - Igabi North Mosque"
            ]
          },
          "igabi-south": {
            name: "Igabi South",
            pollingUnits: [
              "PU 021 - Igabi South Primary School",
              "PU 022 - Igabi South Market",
              "PU 023 - Igabi South Community Hall",
              "PU 024 - Igabi South Health Center",
              "PU 025 - Igabi South Mosque"
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
              "PU 001 - Jaba Central Market",
              "PU 002 - Jaba Central Primary School",
              "PU 003 - Jaba Central Community Hall",
              "PU 004 - Jaba Central Health Center",
              "PU 005 - Jaba Central Mosque"
            ]
          },
          "jaba-east": {
            name: "Jaba East",
            pollingUnits: [
              "PU 006 - Jaba East Primary School",
              "PU 007 - Jaba East Market",
              "PU 008 - Jaba East Community Hall",
              "PU 009 - Jaba East Health Center",
              "PU 010 - Jaba East Mosque"
            ]
          },
          "jaba-west": {
            name: "Jaba West",
            pollingUnits: [
              "PU 011 - Jaba West Primary School",
              "PU 012 - Jaba West Market",
              "PU 013 - Jaba West Community Hall",
              "PU 014 - Jaba West Health Center",
              "PU 015 - Jaba West Mosque"
            ]
          },
          "jaba-north": {
            name: "Jaba North",
            pollingUnits: [
              "PU 016 - Jaba North Primary School",
              "PU 017 - Jaba North Market",
              "PU 018 - Jaba North Community Hall",
              "PU 019 - Jaba North Health Center",
              "PU 020 - Jaba North Mosque"
            ]
          },
          "jaba-south": {
            name: "Jaba South",
            pollingUnits: [
              "PU 021 - Jaba South Primary School",
              "PU 022 - Jaba South Market",
              "PU 023 - Jaba South Community Hall",
              "PU 024 - Jaba South Health Center",
              "PU 025 - Jaba South Mosque"
            ]
          }
        }
      },
      "jemaa": { name: "Jemaa", wards: {} },
      "kachia": { name: "Kachia", wards: {} },
      "kaduna-north": { name: "Kaduna North", wards: {} },
      "kaduna-south": { name: "Kaduna South", wards: {} },
      "kagarko": { name: "Kagarko", wards: {} },
      "kajuru": { name: "Kajuru", wards: {} },
      "kaura": { name: "Kaura", wards: {} },
      "kauru": { name: "Kauru", wards: {} },
      "kubau": { name: "Kubau", wards: {} },
      "kudan": { name: "Kudan", wards: {} },
      "lere": { name: "Lere", wards: {} },
      "makarfi": { name: "Makarfi", wards: {} },
      "sabon-gari": { name: "Sabon Gari", wards: {} },
      "sanga": { name: "Sanga", wards: {} },
      "soba": { name: "Soba", wards: {} },
      "zangon-kataf": { name: "Zangon Kataf", wards: {} },
      "zaria": { name: "Zaria", wards: {} }
    }
  },
  kano: {
    name: "Kano",
    lgas: {
      "ajingi": { 
        name: "Ajingi", 
        wards: {
          "ajingi-central": {
            name: "Ajingi Central",
            pollingUnits: [
              "PU 001 - Ajingi Central Market",
              "PU 002 - Ajingi Central Primary School",
              "PU 003 - Ajingi Central Mosque",
              "PU 004 - Ajingi Central Health Center",
              "PU 005 - Ajingi Central Post Office"
            ]
          },
          "ajingi-east": {
            name: "Ajingi East",
            pollingUnits: [
              "PU 006 - Ajingi East Primary School",
              "PU 007 - Ajingi East Market",
              "PU 008 - Ajingi East Community Hall",
              "PU 009 - Ajingi East Health Center",
              "PU 010 - Ajingi East Mosque"
            ]
          },
          "ajingi-west": {
            name: "Ajingi West",
            pollingUnits: [
              "PU 011 - Ajingi West Primary School",
              "PU 012 - Ajingi West Market",
              "PU 013 - Ajingi West Community Hall",
              "PU 014 - Ajingi West Health Center",
              "PU 015 - Ajingi West Church"
            ]
          },
          "ajingi-north": {
            name: "Ajingi North",
            pollingUnits: [
              "PU 016 - Ajingi North Primary School",
              "PU 017 - Ajingi North Market",
              "PU 018 - Ajingi North Community Hall",
              "PU 019 - Ajingi North Health Center",
              "PU 020 - Ajingi North Mosque"
            ]
          },
          "ajingi-south": {
            name: "Ajingi South",
            pollingUnits: [
              "PU 021 - Ajingi South Primary School",
              "PU 022 - Ajingi South Market",
              "PU 023 - Ajingi South Community Hall",
              "PU 024 - Ajingi South Health Center",
              "PU 025 - Ajingi South Church"
            ]
          }
        }
      },
      "albasu": { 
        name: "Albasu", 
        wards: {
          "albasu-central": {
            name: "Albasu Central",
            pollingUnits: [
              "PU 001 - Albasu Central Market",
              "PU 002 - Albasu Central Primary School",
              "PU 003 - Albasu Central Mosque",
              "PU 004 - Albasu Central Health Center",
              "PU 005 - Albasu Central Post Office"
            ]
          },
          "albasu-east": {
            name: "Albasu East",
            pollingUnits: [
              "PU 006 - Albasu East Primary School",
              "PU 007 - Albasu East Market",
              "PU 008 - Albasu East Community Hall",
              "PU 009 - Albasu East Health Center",
              "PU 010 - Albasu East Mosque"
            ]
          },
          "albasu-west": {
            name: "Albasu West",
            pollingUnits: [
              "PU 011 - Albasu West Primary School",
              "PU 012 - Albasu West Market",
              "PU 013 - Albasu West Community Hall",
              "PU 014 - Albasu West Health Center",
              "PU 015 - Albasu West Church"
            ]
          },
          "albasu-north": {
            name: "Albasu North",
            pollingUnits: [
              "PU 016 - Albasu North Primary School",
              "PU 017 - Albasu North Market",
              "PU 018 - Albasu North Community Hall",
              "PU 019 - Albasu North Health Center",
              "PU 020 - Albasu North Mosque"
            ]
          },
          "albasu-south": {
            name: "Albasu South",
            pollingUnits: [
              "PU 021 - Albasu South Primary School",
              "PU 022 - Albasu South Market",
              "PU 023 - Albasu South Community Hall",
              "PU 024 - Albasu South Health Center",
              "PU 025 - Albasu South Church"
            ]
          }
        }
      },
      "bagwai": { 
        name: "Bagwai", 
        wards: {
          "bagwai-central": {
            name: "Bagwai Central",
            pollingUnits: [
              "PU 001 - Bagwai Central Market",
              "PU 002 - Bagwai Central Primary School",
              "PU 003 - Bagwai Central Mosque",
              "PU 004 - Bagwai Central Health Center",
              "PU 005 - Bagwai Central Post Office"
            ]
          },
          "bagwai-east": {
            name: "Bagwai East",
            pollingUnits: [
              "PU 006 - Bagwai East Primary School",
              "PU 007 - Bagwai East Market",
              "PU 008 - Bagwai East Community Hall",
              "PU 009 - Bagwai East Health Center",
              "PU 010 - Bagwai East Mosque"
            ]
          },
          "bagwai-west": {
            name: "Bagwai West",
            pollingUnits: [
              "PU 011 - Bagwai West Primary School",
              "PU 012 - Bagwai West Market",
              "PU 013 - Bagwai West Community Hall",
              "PU 014 - Bagwai West Health Center",
              "PU 015 - Bagwai West Church"
            ]
          },
          "bagwai-north": {
            name: "Bagwai North",
            pollingUnits: [
              "PU 016 - Bagwai North Primary School",
              "PU 017 - Bagwai North Market",
              "PU 018 - Bagwai North Community Hall",
              "PU 019 - Bagwai North Health Center",
              "PU 020 - Bagwai North Mosque"
            ]
          },
          "bagwai-south": {
            name: "Bagwai South",
            pollingUnits: [
              "PU 021 - Bagwai South Primary School",
              "PU 022 - Bagwai South Market",
              "PU 023 - Bagwai South Community Hall",
              "PU 024 - Bagwai South Health Center",
              "PU 025 - Bagwai South Church"
            ]
          }
        }
      },
      "bebeji": { 
        name: "Bebeji", 
        wards: {
          "bebeji-central": {
            name: "Bebeji Central",
            pollingUnits: [
              "PU 001 - Bebeji Central Market",
              "PU 002 - Bebeji Central Primary School",
              "PU 003 - Bebeji Central Mosque",
              "PU 004 - Bebeji Central Health Center",
              "PU 005 - Bebeji Central Post Office"
            ]
          },
          "bebeji-east": {
            name: "Bebeji East",
            pollingUnits: [
              "PU 006 - Bebeji East Primary School",
              "PU 007 - Bebeji East Market",
              "PU 008 - Bebeji East Community Hall",
              "PU 009 - Bebeji East Health Center",
              "PU 010 - Bebeji East Mosque"
            ]
          },
          "bebeji-west": {
            name: "Bebeji West",
            pollingUnits: [
              "PU 011 - Bebeji West Primary School",
              "PU 012 - Bebeji West Market",
              "PU 013 - Bebeji West Community Hall",
              "PU 014 - Bebeji West Health Center",
              "PU 015 - Bebeji West Church"
            ]
          },
          "bebeji-north": {
            name: "Bebeji North",
            pollingUnits: [
              "PU 016 - Bebeji North Primary School",
              "PU 017 - Bebeji North Market",
              "PU 018 - Bebeji North Community Hall",
              "PU 019 - Bebeji North Health Center",
              "PU 020 - Bebeji North Mosque"
            ]
          },
          "bebeji-south": {
            name: "Bebeji South",
            pollingUnits: [
              "PU 021 - Bebeji South Primary School",
              "PU 022 - Bebeji South Market",
              "PU 023 - Bebeji South Community Hall",
              "PU 024 - Bebeji South Health Center",
              "PU 025 - Bebeji South Church"
            ]
          }
        }
      },
      "bichi": { 
        name: "Bichi", 
        wards: {
          "bichi-central": {
            name: "Bichi Central",
            pollingUnits: [
              "PU 001 - Bichi Central Market",
              "PU 002 - Bichi Central Primary School",
              "PU 003 - Bichi Central Mosque",
              "PU 004 - Bichi Central Health Center",
              "PU 005 - Bichi Central Post Office"
            ]
          },
          "bichi-east": {
            name: "Bichi East",
            pollingUnits: [
              "PU 006 - Bichi East Primary School",
              "PU 007 - Bichi East Market",
              "PU 008 - Bichi East Community Hall",
              "PU 009 - Bichi East Health Center",
              "PU 010 - Bichi East Mosque"
            ]
          },
          "bichi-west": {
            name: "Bichi West",
            pollingUnits: [
              "PU 011 - Bichi West Primary School",
              "PU 012 - Bichi West Market",
              "PU 013 - Bichi West Community Hall",
              "PU 014 - Bichi West Health Center",
              "PU 015 - Bichi West Church"
            ]
          },
          "bichi-north": {
            name: "Bichi North",
            pollingUnits: [
              "PU 016 - Bichi North Primary School",
              "PU 017 - Bichi North Market",
              "PU 018 - Bichi North Community Hall",
              "PU 019 - Bichi North Health Center",
              "PU 020 - Bichi North Mosque"
            ]
          },
          "bichi-south": {
            name: "Bichi South",
            pollingUnits: [
              "PU 021 - Bichi South Primary School",
              "PU 022 - Bichi South Market",
              "PU 023 - Bichi South Community Hall",
              "PU 024 - Bichi South Health Center",
              "PU 025 - Bichi South Church"
            ]
          }
        }
      },
      "bunkure": { 
        name: "Bunkure", 
        wards: {
          "bunkure-central": {
            name: "Bunkure Central",
            pollingUnits: [
              "PU 001 - Bunkure Central Market",
              "PU 002 - Bunkure Central Primary School",
              "PU 003 - Bunkure Central Mosque",
              "PU 004 - Bunkure Central Health Center",
              "PU 005 - Bunkure Central Post Office"
            ]
          },
          "bunkure-east": {
            name: "Bunkure East",
            pollingUnits: [
              "PU 006 - Bunkure East Primary School",
              "PU 007 - Bunkure East Market",
              "PU 008 - Bunkure East Community Hall",
              "PU 009 - Bunkure East Health Center",
              "PU 010 - Bunkure East Mosque"
            ]
          },
          "bunkure-west": {
            name: "Bunkure West",
            pollingUnits: [
              "PU 011 - Bunkure West Primary School",
              "PU 012 - Bunkure West Market",
              "PU 013 - Bunkure West Community Hall",
              "PU 014 - Bunkure West Health Center",
              "PU 015 - Bunkure West Church"
            ]
          },
          "bunkure-north": {
            name: "Bunkure North",
            pollingUnits: [
              "PU 016 - Bunkure North Primary School",
              "PU 017 - Bunkure North Market",
              "PU 018 - Bunkure North Community Hall",
              "PU 019 - Bunkure North Health Center",
              "PU 020 - Bunkure North Mosque"
            ]
          },
          "bunkure-south": {
            name: "Bunkure South",
            pollingUnits: [
              "PU 021 - Bunkure South Primary School",
              "PU 022 - Bunkure South Market",
              "PU 023 - Bunkure South Community Hall",
              "PU 024 - Bunkure South Health Center",
              "PU 025 - Bunkure South Church"
            ]
          }
        }
      },
      "dala": { 
        name: "Dala", 
        wards: {
          "dala-central": {
            name: "Dala Central",
            pollingUnits: [
              "PU 001 - Dala Central Market",
              "PU 002 - Dala Central Primary School",
              "PU 003 - Dala Central Mosque",
              "PU 004 - Dala Central Health Center",
              "PU 005 - Dala Central Post Office"
            ]
          },
          "dala-east": {
            name: "Dala East",
            pollingUnits: [
              "PU 006 - Dala East Primary School",
              "PU 007 - Dala East Market",
              "PU 008 - Dala East Community Hall",
              "PU 009 - Dala East Health Center",
              "PU 010 - Dala East Mosque"
            ]
          },
          "dala-west": {
            name: "Dala West",
            pollingUnits: [
              "PU 011 - Dala West Primary School",
              "PU 012 - Dala West Market",
              "PU 013 - Dala West Community Hall",
              "PU 014 - Dala West Health Center",
              "PU 015 - Dala West Church"
            ]
          },
          "dala-north": {
            name: "Dala North",
            pollingUnits: [
              "PU 016 - Dala North Primary School",
              "PU 017 - Dala North Market",
              "PU 018 - Dala North Community Hall",
              "PU 019 - Dala North Health Center",
              "PU 020 - Dala North Mosque"
            ]
          },
          "dala-south": {
            name: "Dala South",
            pollingUnits: [
              "PU 021 - Dala South Primary School",
              "PU 022 - Dala South Market",
              "PU 023 - Dala South Community Hall",
              "PU 024 - Dala South Health Center",
              "PU 025 - Dala South Church"
            ]
          }
        }
      },
      "dambatta": { 
        name: "Dambatta", 
        wards: {
          "dambatta-central": {
            name: "Dambatta Central",
            pollingUnits: [
              "PU 001 - Dambatta Central Market",
              "PU 002 - Dambatta Central Primary School",
              "PU 003 - Dambatta Central Mosque",
              "PU 004 - Dambatta Central Health Center",
              "PU 005 - Dambatta Central Post Office"
            ]
          },
          "dambatta-east": {
            name: "Dambatta East",
            pollingUnits: [
              "PU 006 - Dambatta East Primary School",
              "PU 007 - Dambatta East Market",
              "PU 008 - Dambatta East Community Hall",
              "PU 009 - Dambatta East Health Center",
              "PU 010 - Dambatta East Mosque"
            ]
          },
          "dambatta-west": {
            name: "Dambatta West",
            pollingUnits: [
              "PU 011 - Dambatta West Primary School",
              "PU 012 - Dambatta West Market",
              "PU 013 - Dambatta West Community Hall",
              "PU 014 - Dambatta West Health Center",
              "PU 015 - Dambatta West Church"
            ]
          },
          "dambatta-north": {
            name: "Dambatta North",
            pollingUnits: [
              "PU 016 - Dambatta North Primary School",
              "PU 017 - Dambatta North Market",
              "PU 018 - Dambatta North Community Hall",
              "PU 019 - Dambatta North Health Center",
              "PU 020 - Dambatta North Mosque"
            ]
          },
          "dambatta-south": {
            name: "Dambatta South",
            pollingUnits: [
              "PU 021 - Dambatta South Primary School",
              "PU 022 - Dambatta South Market",
              "PU 023 - Dambatta South Community Hall",
              "PU 024 - Dambatta South Health Center",
              "PU 025 - Dambatta South Church"
            ]
          }
        }
      },
      "fagge": { name: "Fagge", wards: {} },
      "gabasawa": { name: "Gabasawa", wards: {} },
      "garko": { name: "Garko", wards: {} },
      "garum-mallam": { name: "Garum Mallam", wards: {} },
      "gaya": { name: "Gaya", wards: {} },
      "gezawa": { name: "Gezawa", wards: {} },
      "gwarzo": { name: "Gwarzo", wards: {} },
      "kabo": { name: "Kabo", wards: {} },
      "kano-municipal": { name: "Kano Municipal", wards: {} },
      "karaye": { name: "Karaye", wards: {} },
      "kibiya": { name: "Kibiya", wards: {} },
      "kiru": { name: "Kiru", wards: {} },
      "kumbotso": { name: "Kumbotso", wards: {} },
      "kunchi": { name: "Kunchi", wards: {} },
      "kura": { name: "Kura", wards: {} },
      "madobi": { name: "Madobi", wards: {} },
      "makoda": { name: "Makoda", wards: {} },
      "minjibir": { name: "Minjibir", wards: {} },
      "nasarawa": { name: "Nasarawa", wards: {} },
      "rano": { name: "Rano", wards: {} },
      "rimin-gado": { name: "Rimin Gado", wards: {} },
      "rogo": { name: "Rogo", wards: {} },
      "shanono": { name: "Shanono", wards: {} },
      "sumaila": { name: "Sumaila", wards: {} },
      "takai": { name: "Takai", wards: {} },
      "tarauni": { name: "Tarauni", wards: {} },
      "tofa": { name: "Tofa", wards: {} },
      "tsanyawa": { name: "Tsanyawa", wards: {} },
      "tudun-wada": { name: "Tudun Wada", wards: {} },
      "ungogo": { name: "Ungogo", wards: {} },
      "warawa": { name: "Warawa", wards: {} },
      "wudil": { name: "Wudil", wards: {} }
    }
  },
  katsina: {
    name: "Katsina",
    lgas: {
      "bakori": { 
        name: "Bakori", 
        wards: {
          "bakori-central": {
            name: "Bakori Central",
            pollingUnits: [
              "PU 001 - Bakori Central Market",
              "PU 002 - Bakori Central Primary School",
              "PU 003 - Bakori Central Community Hall",
              "PU 004 - Bakori Central Health Center",
              "PU 005 - Bakori Central Mosque"
            ]
          },
          "bakori-east": {
            name: "Bakori East",
            pollingUnits: [
              "PU 006 - Bakori East Primary School",
              "PU 007 - Bakori East Market",
              "PU 008 - Bakori East Community Hall",
              "PU 009 - Bakori East Health Center",
              "PU 010 - Bakori East Mosque"
            ]
          },
          "bakori-west": {
            name: "Bakori West",
            pollingUnits: [
              "PU 011 - Bakori West Primary School",
              "PU 012 - Bakori West Market",
              "PU 013 - Bakori West Community Hall",
              "PU 014 - Bakori West Health Center",
              "PU 015 - Bakori West Mosque"
            ]
          },
          "bakori-north": {
            name: "Bakori North",
            pollingUnits: [
              "PU 016 - Bakori North Primary School",
              "PU 017 - Bakori North Market",
              "PU 018 - Bakori North Community Hall",
              "PU 019 - Bakori North Health Center",
              "PU 020 - Bakori North Mosque"
            ]
          },
          "bakori-south": {
            name: "Bakori South",
            pollingUnits: [
              "PU 021 - Bakori South Primary School",
              "PU 022 - Bakori South Market",
              "PU 023 - Bakori South Community Hall",
              "PU 024 - Bakori South Health Center",
              "PU 025 - Bakori South Mosque"
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
              "PU 001 - Batagarawa Central Market",
              "PU 002 - Batagarawa Central Primary School",
              "PU 003 - Batagarawa Central Community Hall",
              "PU 004 - Batagarawa Central Health Center",
              "PU 005 - Batagarawa Central Mosque"
            ]
          },
          "batagarawa-east": {
            name: "Batagarawa East",
            pollingUnits: [
              "PU 006 - Batagarawa East Primary School",
              "PU 007 - Batagarawa East Market",
              "PU 008 - Batagarawa East Community Hall",
              "PU 009 - Batagarawa East Health Center",
              "PU 010 - Batagarawa East Mosque"
            ]
          },
          "batagarawa-west": {
            name: "Batagarawa West",
            pollingUnits: [
              "PU 011 - Batagarawa West Primary School",
              "PU 012 - Batagarawa West Market",
              "PU 013 - Batagarawa West Community Hall",
              "PU 014 - Batagarawa West Health Center",
              "PU 015 - Batagarawa West Mosque"
            ]
          },
          "batagarawa-north": {
            name: "Batagarawa North",
            pollingUnits: [
              "PU 016 - Batagarawa North Primary School",
              "PU 017 - Batagarawa North Market",
              "PU 018 - Batagarawa North Community Hall",
              "PU 019 - Batagarawa North Health Center",
              "PU 020 - Batagarawa North Mosque"
            ]
          },
          "batagarawa-south": {
            name: "Batagarawa South",
            pollingUnits: [
              "PU 021 - Batagarawa South Primary School",
              "PU 022 - Batagarawa South Market",
              "PU 023 - Batagarawa South Community Hall",
              "PU 024 - Batagarawa South Health Center",
              "PU 025 - Batagarawa South Mosque"
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
              "PU 001 - Batsari Central Market",
              "PU 002 - Batsari Central Primary School",
              "PU 003 - Batsari Central Community Hall",
              "PU 004 - Batsari Central Health Center",
              "PU 005 - Batsari Central Mosque"
            ]
          },
          "batsari-east": {
            name: "Batsari East",
            pollingUnits: [
              "PU 006 - Batsari East Primary School",
              "PU 007 - Batsari East Market",
              "PU 008 - Batsari East Community Hall",
              "PU 009 - Batsari East Health Center",
              "PU 010 - Batsari East Mosque"
            ]
          },
          "batsari-west": {
            name: "Batsari West",
            pollingUnits: [
              "PU 011 - Batsari West Primary School",
              "PU 012 - Batsari West Market",
              "PU 013 - Batsari West Community Hall",
              "PU 014 - Batsari West Health Center",
              "PU 015 - Batsari West Mosque"
            ]
          },
          "batsari-north": {
            name: "Batsari North",
            pollingUnits: [
              "PU 016 - Batsari North Primary School",
              "PU 017 - Batsari North Market",
              "PU 018 - Batsari North Community Hall",
              "PU 019 - Batsari North Health Center",
              "PU 020 - Batsari North Mosque"
            ]
          },
          "batsari-south": {
            name: "Batsari South",
            pollingUnits: [
              "PU 021 - Batsari South Primary School",
              "PU 022 - Batsari South Market",
              "PU 023 - Batsari South Community Hall",
              "PU 024 - Batsari South Health Center",
              "PU 025 - Batsari South Mosque"
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
              "PU 001 - Baure Central Market",
              "PU 002 - Baure Central Primary School",
              "PU 003 - Baure Central Community Hall",
              "PU 004 - Baure Central Health Center",
              "PU 005 - Baure Central Mosque"
            ]
          },
          "baure-east": {
            name: "Baure East",
            pollingUnits: [
              "PU 006 - Baure East Primary School",
              "PU 007 - Baure East Market",
              "PU 008 - Baure East Community Hall",
              "PU 009 - Baure East Health Center",
              "PU 010 - Baure East Mosque"
            ]
          },
          "baure-west": {
            name: "Baure West",
            pollingUnits: [
              "PU 011 - Baure West Primary School",
              "PU 012 - Baure West Market",
              "PU 013 - Baure West Community Hall",
              "PU 014 - Baure West Health Center",
              "PU 015 - Baure West Mosque"
            ]
          },
          "baure-north": {
            name: "Baure North",
            pollingUnits: [
              "PU 016 - Baure North Primary School",
              "PU 017 - Baure North Market",
              "PU 018 - Baure North Community Hall",
              "PU 019 - Baure North Health Center",
              "PU 020 - Baure North Mosque"
            ]
          },
          "baure-south": {
            name: "Baure South",
            pollingUnits: [
              "PU 021 - Baure South Primary School",
              "PU 022 - Baure South Market",
              "PU 023 - Baure South Community Hall",
              "PU 024 - Baure South Health Center",
              "PU 025 - Baure South Mosque"
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
              "PU 001 - Bindawa Central Market",
              "PU 002 - Bindawa Central Primary School",
              "PU 003 - Bindawa Central Community Hall",
              "PU 004 - Bindawa Central Health Center",
              "PU 005 - Bindawa Central Mosque"
            ]
          },
          "bindawa-east": {
            name: "Bindawa East",
            pollingUnits: [
              "PU 006 - Bindawa East Primary School",
              "PU 007 - Bindawa East Market",
              "PU 008 - Bindawa East Community Hall",
              "PU 009 - Bindawa East Health Center",
              "PU 010 - Bindawa East Mosque"
            ]
          },
          "bindawa-west": {
            name: "Bindawa West",
            pollingUnits: [
              "PU 011 - Bindawa West Primary School",
              "PU 012 - Bindawa West Market",
              "PU 013 - Bindawa West Community Hall",
              "PU 014 - Bindawa West Health Center",
              "PU 015 - Bindawa West Mosque"
            ]
          },
          "bindawa-north": {
            name: "Bindawa North",
            pollingUnits: [
              "PU 016 - Bindawa North Primary School",
              "PU 017 - Bindawa North Market",
              "PU 018 - Bindawa North Community Hall",
              "PU 019 - Bindawa North Health Center",
              "PU 020 - Bindawa North Mosque"
            ]
          },
          "bindawa-south": {
            name: "Bindawa South",
            pollingUnits: [
              "PU 021 - Bindawa South Primary School",
              "PU 022 - Bindawa South Market",
              "PU 023 - Bindawa South Community Hall",
              "PU 024 - Bindawa South Health Center",
              "PU 025 - Bindawa South Mosque"
            ]
          }
        }
      },
      "charanchi": { name: "Charanchi", wards: {} },
      "dandume": { name: "Dandume", wards: {} },
      "danja": { name: "Danja", wards: {} },
      "dan-musa": { name: "Dan Musa", wards: {} },
      "daura": { name: "Daura", wards: {} },
      "dutsi": { name: "Dutsi", wards: {} },
      "dutsin-ma": { name: "Dutsin Ma", wards: {} },
      "faskari": { name: "Faskari", wards: {} },
      "funtua": { name: "Funtua", wards: {} },
      "ingawa": { name: "Ingawa", wards: {} },
      "jibia": { name: "Jibia", wards: {} },
      "kafur": { name: "Kafur", wards: {} },
      "kaita": { name: "Kaita", wards: {} },
      "kankara": { name: "Kankara", wards: {} },
      "kankia": { name: "Kankia", wards: {} },
      "katsina": { name: "Katsina", wards: {} },
      "kurfi": { name: "Kurfi", wards: {} },
      "kusada": { name: "Kusada", wards: {} },
      "mai-adua": { name: "Mai Adua", wards: {} },
      "malumfashi": { name: "Malumfashi", wards: {} },
      "mani": { name: "Mani", wards: {} },
      "mashi": { name: "Mashi", wards: {} },
      "matazu": { name: "Matazu", wards: {} },
      "musawa": { name: "Musawa", wards: {} },
      "remawa": { name: "Remawa", wards: {} },
      "sabuwa": { name: "Sabuwa", wards: {} },
      "safana": { name: "Safana", wards: {} },
      "sandamu": { name: "Sandamu", wards: {} },
      "zango": { name: "Zango", wards: {} }
    }
  },
  kebbi: {
    name: "Kebbi",
    lgas: {
      "aleiro": { 
        name: "Aleiro", 
        wards: {
          "aleiro-central": {
            name: "Aleiro Central",
            pollingUnits: [
              "PU 001 - Aleiro Central Market",
              "PU 002 - Aleiro Central Primary School",
              "PU 003 - Aleiro Central Community Hall",
              "PU 004 - Aleiro Central Health Center",
              "PU 005 - Aleiro Central Mosque"
            ]
          },
          "aleiro-east": {
            name: "Aleiro East",
            pollingUnits: [
              "PU 006 - Aleiro East Primary School",
              "PU 007 - Aleiro East Market",
              "PU 008 - Aleiro East Community Hall",
              "PU 009 - Aleiro East Health Center",
              "PU 010 - Aleiro East Mosque"
            ]
          },
          "aleiro-west": {
            name: "Aleiro West",
            pollingUnits: [
              "PU 011 - Aleiro West Primary School",
              "PU 012 - Aleiro West Market",
              "PU 013 - Aleiro West Community Hall",
              "PU 014 - Aleiro West Health Center",
              "PU 015 - Aleiro West Mosque"
            ]
          },
          "aleiro-north": {
            name: "Aleiro North",
            pollingUnits: [
              "PU 016 - Aleiro North Primary School",
              "PU 017 - Aleiro North Market",
              "PU 018 - Aleiro North Community Hall",
              "PU 019 - Aleiro North Health Center",
              "PU 020 - Aleiro North Mosque"
            ]
          },
          "aleiro-south": {
            name: "Aleiro South",
            pollingUnits: [
              "PU 021 - Aleiro South Primary School",
              "PU 022 - Aleiro South Market",
              "PU 023 - Aleiro South Community Hall",
              "PU 024 - Aleiro South Health Center",
              "PU 025 - Aleiro South Mosque"
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
              "PU 001 - Arewa Dandi Central Market",
              "PU 002 - Arewa Dandi Central Primary School",
              "PU 003 - Arewa Dandi Central Community Hall",
              "PU 004 - Arewa Dandi Central Health Center",
              "PU 005 - Arewa Dandi Central Mosque"
            ]
          },
          "arewa-dandi-east": {
            name: "Arewa Dandi East",
            pollingUnits: [
              "PU 006 - Arewa Dandi East Primary School",
              "PU 007 - Arewa Dandi East Market",
              "PU 008 - Arewa Dandi East Community Hall",
              "PU 009 - Arewa Dandi East Health Center",
              "PU 010 - Arewa Dandi East Mosque"
            ]
          },
          "arewa-dandi-west": {
            name: "Arewa Dandi West",
            pollingUnits: [
              "PU 011 - Arewa Dandi West Primary School",
              "PU 012 - Arewa Dandi West Market",
              "PU 013 - Arewa Dandi West Community Hall",
              "PU 014 - Arewa Dandi West Health Center",
              "PU 015 - Arewa Dandi West Mosque"
            ]
          },
          "arewa-dandi-north": {
            name: "Arewa Dandi North",
            pollingUnits: [
              "PU 016 - Arewa Dandi North Primary School",
              "PU 017 - Arewa Dandi North Market",
              "PU 018 - Arewa Dandi North Community Hall",
              "PU 019 - Arewa Dandi North Health Center",
              "PU 020 - Arewa Dandi North Mosque"
            ]
          },
          "arewa-dandi-south": {
            name: "Arewa Dandi South",
            pollingUnits: [
              "PU 021 - Arewa Dandi South Primary School",
              "PU 022 - Arewa Dandi South Market",
              "PU 023 - Arewa Dandi South Community Hall",
              "PU 024 - Arewa Dandi South Health Center",
              "PU 025 - Arewa Dandi South Mosque"
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
              "PU 001 - Argungu Central Market",
              "PU 002 - Argungu Central Primary School",
              "PU 003 - Argungu Central Community Hall",
              "PU 004 - Argungu Central Health Center",
              "PU 005 - Argungu Central Mosque"
            ]
          },
          "argungu-east": {
            name: "Argungu East",
            pollingUnits: [
              "PU 006 - Argungu East Primary School",
              "PU 007 - Argungu East Market",
              "PU 008 - Argungu East Community Hall",
              "PU 009 - Argungu East Health Center",
              "PU 010 - Argungu East Mosque"
            ]
          },
          "argungu-west": {
            name: "Argungu West",
            pollingUnits: [
              "PU 011 - Argungu West Primary School",
              "PU 012 - Argungu West Market",
              "PU 013 - Argungu West Community Hall",
              "PU 014 - Argungu West Health Center",
              "PU 015 - Argungu West Mosque"
            ]
          },
          "argungu-north": {
            name: "Argungu North",
            pollingUnits: [
              "PU 016 - Argungu North Primary School",
              "PU 017 - Argungu North Market",
              "PU 018 - Argungu North Community Hall",
              "PU 019 - Argungu North Health Center",
              "PU 020 - Argungu North Mosque"
            ]
          },
          "argungu-south": {
            name: "Argungu South",
            pollingUnits: [
              "PU 021 - Argungu South Primary School",
              "PU 022 - Argungu South Market",
              "PU 023 - Argungu South Community Hall",
              "PU 024 - Argungu South Health Center",
              "PU 025 - Argungu South Mosque"
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
              "PU 001 - Augie Central Market",
              "PU 002 - Augie Central Primary School",
              "PU 003 - Augie Central Community Hall",
              "PU 004 - Augie Central Health Center",
              "PU 005 - Augie Central Mosque"
            ]
          },
          "augie-east": {
            name: "Augie East",
            pollingUnits: [
              "PU 006 - Augie East Primary School",
              "PU 007 - Augie East Market",
              "PU 008 - Augie East Community Hall",
              "PU 009 - Augie East Health Center",
              "PU 010 - Augie East Mosque"
            ]
          },
          "augie-west": {
            name: "Augie West",
            pollingUnits: [
              "PU 011 - Augie West Primary School",
              "PU 012 - Augie West Market",
              "PU 013 - Augie West Community Hall",
              "PU 014 - Augie West Health Center",
              "PU 015 - Augie West Mosque"
            ]
          },
          "augie-north": {
            name: "Augie North",
            pollingUnits: [
              "PU 016 - Augie North Primary School",
              "PU 017 - Augie North Market",
              "PU 018 - Augie North Community Hall",
              "PU 019 - Augie North Health Center",
              "PU 020 - Augie North Mosque"
            ]
          },
          "augie-south": {
            name: "Augie South",
            pollingUnits: [
              "PU 021 - Augie South Primary School",
              "PU 022 - Augie South Market",
              "PU 023 - Augie South Community Hall",
              "PU 024 - Augie South Health Center",
              "PU 025 - Augie South Mosque"
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
              "PU 001 - Bagudo Central Market",
              "PU 002 - Bagudo Central Primary School",
              "PU 003 - Bagudo Central Community Hall",
              "PU 004 - Bagudo Central Health Center",
              "PU 005 - Bagudo Central Mosque"
            ]
          },
          "bagudo-east": {
            name: "Bagudo East",
            pollingUnits: [
              "PU 006 - Bagudo East Primary School",
              "PU 007 - Bagudo East Market",
              "PU 008 - Bagudo East Community Hall",
              "PU 009 - Bagudo East Health Center",
              "PU 010 - Bagudo East Mosque"
            ]
          },
          "bagudo-west": {
            name: "Bagudo West",
            pollingUnits: [
              "PU 011 - Bagudo West Primary School",
              "PU 012 - Bagudo West Market",
              "PU 013 - Bagudo West Community Hall",
              "PU 014 - Bagudo West Health Center",
              "PU 015 - Bagudo West Mosque"
            ]
          },
          "bagudo-north": {
            name: "Bagudo North",
            pollingUnits: [
              "PU 016 - Bagudo North Primary School",
              "PU 017 - Bagudo North Market",
              "PU 018 - Bagudo North Community Hall",
              "PU 019 - Bagudo North Health Center",
              "PU 020 - Bagudo North Mosque"
            ]
          },
          "bagudo-south": {
            name: "Bagudo South",
            pollingUnits: [
              "PU 021 - Bagudo South Primary School",
              "PU 022 - Bagudo South Market",
              "PU 023 - Bagudo South Community Hall",
              "PU 024 - Bagudo South Health Center",
              "PU 025 - Bagudo South Mosque"
            ]
          }
        }
      },
      "birnin-kebbi": { name: "Birnin Kebbi", wards: {} },
      "bunza": { name: "Bunza", wards: {} },
      "dandi": { name: "Dandi", wards: {} },
      "fakai": { name: "Fakai", wards: {} },
      "gwadabawa": { name: "Gwadabawa", wards: {} },
      "kalgo": { name: "Kalgo", wards: {} },
      "koko-besse": { name: "Koko Besse", wards: {} },
      "maiyama": { name: "Maiyama", wards: {} },
      "ngaski": { name: "Ngaski", wards: {} },
      "sakaba": { name: "Sakaba", wards: {} },
      "shanga": { name: "Shanga", wards: {} },
      "suru": { name: "Suru", wards: {} },
      "wasagu-danko": { name: "Wasagu Danko", wards: {} },
      "yauri": { name: "Yauri", wards: {} },
      "zuru": { name: "Zuru", wards: {} }
    }
  },
  kogi: {
    name: "Kogi",
    lgas: {
      "adavi": { 
        name: "Adavi", 
        wards: {
          "adavi-central": {
            name: "Adavi Central",
            pollingUnits: [
              "PU 001 - Adavi Central Market",
              "PU 002 - Adavi Central Primary School",
              "PU 003 - Adavi Central Community Hall",
              "PU 004 - Adavi Central Health Center",
              "PU 005 - Adavi Central Mosque"
            ]
          },
          "adavi-east": {
            name: "Adavi East",
            pollingUnits: [
              "PU 006 - Adavi East Primary School",
              "PU 007 - Adavi East Market",
              "PU 008 - Adavi East Community Hall",
              "PU 009 - Adavi East Health Center",
              "PU 010 - Adavi East Mosque"
            ]
          },
          "adavi-west": {
            name: "Adavi West",
            pollingUnits: [
              "PU 011 - Adavi West Primary School",
              "PU 012 - Adavi West Market",
              "PU 013 - Adavi West Community Hall",
              "PU 014 - Adavi West Health Center",
              "PU 015 - Adavi West Mosque"
            ]
          },
          "adavi-north": {
            name: "Adavi North",
            pollingUnits: [
              "PU 016 - Adavi North Primary School",
              "PU 017 - Adavi North Market",
              "PU 018 - Adavi North Community Hall",
              "PU 019 - Adavi North Health Center",
              "PU 020 - Adavi North Mosque"
            ]
          },
          "adavi-south": {
            name: "Adavi South",
            pollingUnits: [
              "PU 021 - Adavi South Primary School",
              "PU 022 - Adavi South Market",
              "PU 023 - Adavi South Community Hall",
              "PU 024 - Adavi South Health Center",
              "PU 025 - Adavi South Mosque"
            ]
          }
        }
      },
      "ajaokuta": { 
        name: "Ajaokuta", 
        wards: {
          "ajaokuta-central": {
            name: "Ajaokuta Central",
            pollingUnits: [
              "PU 001 - Ajaokuta Central Market",
              "PU 002 - Ajaokuta Central Primary School",
              "PU 003 - Ajaokuta Central Community Hall",
              "PU 004 - Ajaokuta Central Health Center",
              "PU 005 - Ajaokuta Central Mosque"
            ]
          },
          "ajaokuta-east": {
            name: "Ajaokuta East",
            pollingUnits: [
              "PU 006 - Ajaokuta East Primary School",
              "PU 007 - Ajaokuta East Market",
              "PU 008 - Ajaokuta East Community Hall",
              "PU 009 - Ajaokuta East Health Center",
              "PU 010 - Ajaokuta East Mosque"
            ]
          },
          "ajaokuta-west": {
            name: "Ajaokuta West",
            pollingUnits: [
              "PU 011 - Ajaokuta West Primary School",
              "PU 012 - Ajaokuta West Market",
              "PU 013 - Ajaokuta West Community Hall",
              "PU 014 - Ajaokuta West Health Center",
              "PU 015 - Ajaokuta West Mosque"
            ]
          },
          "ajaokuta-north": {
            name: "Ajaokuta North",
            pollingUnits: [
              "PU 016 - Ajaokuta North Primary School",
              "PU 017 - Ajaokuta North Market",
              "PU 018 - Ajaokuta North Community Hall",
              "PU 019 - Ajaokuta North Health Center",
              "PU 020 - Ajaokuta North Mosque"
            ]
          },
          "ajaokuta-south": {
            name: "Ajaokuta South",
            pollingUnits: [
              "PU 021 - Ajaokuta South Primary School",
              "PU 022 - Ajaokuta South Market",
              "PU 023 - Ajaokuta South Community Hall",
              "PU 024 - Ajaokuta South Health Center",
              "PU 025 - Ajaokuta South Mosque"
            ]
          }
        }
      },
      "ankpa": { 
        name: "Ankpa", 
        wards: {
          "ankpa-central": {
            name: "Ankpa Central",
            pollingUnits: [
              "PU 001 - Ankpa Central Market",
              "PU 002 - Ankpa Central Primary School",
              "PU 003 - Ankpa Central Community Hall",
              "PU 004 - Ankpa Central Health Center",
              "PU 005 - Ankpa Central Mosque"
            ]
          },
          "ankpa-east": {
            name: "Ankpa East",
            pollingUnits: [
              "PU 006 - Ankpa East Primary School",
              "PU 007 - Ankpa East Market",
              "PU 008 - Ankpa East Community Hall",
              "PU 009 - Ankpa East Health Center",
              "PU 010 - Ankpa East Mosque"
            ]
          },
          "ankpa-west": {
            name: "Ankpa West",
            pollingUnits: [
              "PU 011 - Ankpa West Primary School",
              "PU 012 - Ankpa West Market",
              "PU 013 - Ankpa West Community Hall",
              "PU 014 - Ankpa West Health Center",
              "PU 015 - Ankpa West Mosque"
            ]
          },
          "ankpa-north": {
            name: "Ankpa North",
            pollingUnits: [
              "PU 016 - Ankpa North Primary School",
              "PU 017 - Ankpa North Market",
              "PU 018 - Ankpa North Community Hall",
              "PU 019 - Ankpa North Health Center",
              "PU 020 - Ankpa North Mosque"
            ]
          },
          "ankpa-south": {
            name: "Ankpa South",
            pollingUnits: [
              "PU 021 - Ankpa South Primary School",
              "PU 022 - Ankpa South Market",
              "PU 023 - Ankpa South Community Hall",
              "PU 024 - Ankpa South Health Center",
              "PU 025 - Ankpa South Mosque"
            ]
          }
        }
      },
      "bassa": { 
        name: "Bassa", 
        wards: {
          "bassa-central": {
            name: "Bassa Central",
            pollingUnits: [
              "PU 001 - Bassa Central Market",
              "PU 002 - Bassa Central Primary School",
              "PU 003 - Bassa Central Community Hall",
              "PU 004 - Bassa Central Health Center",
              "PU 005 - Bassa Central Mosque"
            ]
          },
          "bassa-east": {
            name: "Bassa East",
            pollingUnits: [
              "PU 006 - Bassa East Primary School",
              "PU 007 - Bassa East Market",
              "PU 008 - Bassa East Community Hall",
              "PU 009 - Bassa East Health Center",
              "PU 010 - Bassa East Mosque"
            ]
          },
          "bassa-west": {
            name: "Bassa West",
            pollingUnits: [
              "PU 011 - Bassa West Primary School",
              "PU 012 - Bassa West Market",
              "PU 013 - Bassa West Community Hall",
              "PU 014 - Bassa West Health Center",
              "PU 015 - Bassa West Mosque"
            ]
          },
          "bassa-north": {
            name: "Bassa North",
            pollingUnits: [
              "PU 016 - Bassa North Primary School",
              "PU 017 - Bassa North Market",
              "PU 018 - Bassa North Community Hall",
              "PU 019 - Bassa North Health Center",
              "PU 020 - Bassa North Mosque"
            ]
          },
          "bassa-south": {
            name: "Bassa South",
            pollingUnits: [
              "PU 021 - Bassa South Primary School",
              "PU 022 - Bassa South Market",
              "PU 023 - Bassa South Community Hall",
              "PU 024 - Bassa South Health Center",
              "PU 025 - Bassa South Mosque"
            ]
          }
        }
      },
      "dekina": { 
        name: "Dekina", 
        wards: {
          "dekina-central": {
            name: "Dekina Central",
            pollingUnits: [
              "PU 001 - Dekina Central Market",
              "PU 002 - Dekina Central Primary School",
              "PU 003 - Dekina Central Community Hall",
              "PU 004 - Dekina Central Health Center",
              "PU 005 - Dekina Central Mosque"
            ]
          },
          "dekina-east": {
            name: "Dekina East",
            pollingUnits: [
              "PU 006 - Dekina East Primary School",
              "PU 007 - Dekina East Market",
              "PU 008 - Dekina East Community Hall",
              "PU 009 - Dekina East Health Center",
              "PU 010 - Dekina East Mosque"
            ]
          },
          "dekina-west": {
            name: "Dekina West",
            pollingUnits: [
              "PU 011 - Dekina West Primary School",
              "PU 012 - Dekina West Market",
              "PU 013 - Dekina West Community Hall",
              "PU 014 - Dekina West Health Center",
              "PU 015 - Dekina West Mosque"
            ]
          },
          "dekina-north": {
            name: "Dekina North",
            pollingUnits: [
              "PU 016 - Dekina North Primary School",
              "PU 017 - Dekina North Market",
              "PU 018 - Dekina North Community Hall",
              "PU 019 - Dekina North Health Center",
              "PU 020 - Dekina North Mosque"
            ]
          },
          "dekina-south": {
            name: "Dekina South",
            pollingUnits: [
              "PU 021 - Dekina South Primary School",
              "PU 022 - Dekina South Market",
              "PU 023 - Dekina South Community Hall",
              "PU 024 - Dekina South Health Center",
              "PU 025 - Dekina South Mosque"
            ]
          }
        }
      },
      "ibaji": { name: "Ibaji", wards: {} },
      "idah": { name: "Idah", wards: {} },
      "igalamela-odolu": { name: "Igalamela Odolu", wards: {} },
      "ijumu": { name: "Ijumu", wards: {} },
      "kabba-bunu": { name: "Kabba Bunu", wards: {} },
      "kogi": { name: "Kogi", wards: {} },
      "lokoja": { name: "Lokoja", wards: {} },
      "mopa-muro": { name: "Mopa Muro", wards: {} },
      "ofu": { name: "Ofu", wards: {} },
      "ogorimagongo": { name: "Ogori Magongo", wards: {} },
      "okene": { name: "Okene", wards: {} },
      "olamaboro": { name: "Olamaboro", wards: {} },
      "omala": { name: "Omala", wards: {} },
      "yagba-east": { name: "Yagba East", wards: {} },
      "yagba-west": { name: "Yagba West", wards: {} }
    }
  },
  kwara: {
    name: "Kwara",
    lgas: {
      "asa": { 
        name: "Asa", 
        wards: {
          "asa-central": {
            name: "Asa Central",
            pollingUnits: [
              "PU 001 - Asa Central Market",
              "PU 002 - Asa Central Primary School",
              "PU 003 - Asa Central Community Hall",
              "PU 004 - Asa Central Health Center",
              "PU 005 - Asa Central Mosque"
            ]
          },
          "asa-east": {
            name: "Asa East",
            pollingUnits: [
              "PU 006 - Asa East Primary School",
              "PU 007 - Asa East Market",
              "PU 008 - Asa East Community Hall",
              "PU 009 - Asa East Health Center",
              "PU 010 - Asa East Mosque"
            ]
          },
          "asa-west": {
            name: "Asa West",
            pollingUnits: [
              "PU 011 - Asa West Primary School",
              "PU 012 - Asa West Market",
              "PU 013 - Asa West Community Hall",
              "PU 014 - Asa West Health Center",
              "PU 015 - Asa West Mosque"
            ]
          },
          "asa-north": {
            name: "Asa North",
            pollingUnits: [
              "PU 016 - Asa North Primary School",
              "PU 017 - Asa North Market",
              "PU 018 - Asa North Community Hall",
              "PU 019 - Asa North Health Center",
              "PU 020 - Asa North Mosque"
            ]
          },
          "asa-south": {
            name: "Asa South",
            pollingUnits: [
              "PU 021 - Asa South Primary School",
              "PU 022 - Asa South Market",
              "PU 023 - Asa South Community Hall",
              "PU 024 - Asa South Health Center",
              "PU 025 - Asa South Mosque"
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
              "PU 001 - Baruten Central Market",
              "PU 002 - Baruten Central Primary School",
              "PU 003 - Baruten Central Community Hall",
              "PU 004 - Baruten Central Health Center",
              "PU 005 - Baruten Central Mosque"
            ]
          },
          "baruten-east": {
            name: "Baruten East",
            pollingUnits: [
              "PU 006 - Baruten East Primary School",
              "PU 007 - Baruten East Market",
              "PU 008 - Baruten East Community Hall",
              "PU 009 - Baruten East Health Center",
              "PU 010 - Baruten East Mosque"
            ]
          },
          "baruten-west": {
            name: "Baruten West",
            pollingUnits: [
              "PU 011 - Baruten West Primary School",
              "PU 012 - Baruten West Market",
              "PU 013 - Baruten West Community Hall",
              "PU 014 - Baruten West Health Center",
              "PU 015 - Baruten West Mosque"
            ]
          },
          "baruten-north": {
            name: "Baruten North",
            pollingUnits: [
              "PU 016 - Baruten North Primary School",
              "PU 017 - Baruten North Market",
              "PU 018 - Baruten North Community Hall",
              "PU 019 - Baruten North Health Center",
              "PU 020 - Baruten North Mosque"
            ]
          },
          "baruten-south": {
            name: "Baruten South",
            pollingUnits: [
              "PU 021 - Baruten South Primary School",
              "PU 022 - Baruten South Market",
              "PU 023 - Baruten South Community Hall",
              "PU 024 - Baruten South Health Center",
              "PU 025 - Baruten South Mosque"
            ]
          }
        }
      },
      "edu": { 
        name: "Edu", 
        wards: {
          "edu-central": {
            name: "Edu Central",
            pollingUnits: [
              "PU 001 - Edu Central Market",
              "PU 002 - Edu Central Primary School",
              "PU 003 - Edu Central Community Hall",
              "PU 004 - Edu Central Health Center",
              "PU 005 - Edu Central Mosque"
            ]
          },
          "edu-east": {
            name: "Edu East",
            pollingUnits: [
              "PU 006 - Edu East Primary School",
              "PU 007 - Edu East Market",
              "PU 008 - Edu East Community Hall",
              "PU 009 - Edu East Health Center",
              "PU 010 - Edu East Mosque"
            ]
          },
          "edu-west": {
            name: "Edu West",
            pollingUnits: [
              "PU 011 - Edu West Primary School",
              "PU 012 - Edu West Market",
              "PU 013 - Edu West Community Hall",
              "PU 014 - Edu West Health Center",
              "PU 015 - Edu West Mosque"
            ]
          },
          "edu-north": {
            name: "Edu North",
            pollingUnits: [
              "PU 016 - Edu North Primary School",
              "PU 017 - Edu North Market",
              "PU 018 - Edu North Community Hall",
              "PU 019 - Edu North Health Center",
              "PU 020 - Edu North Mosque"
            ]
          },
          "edu-south": {
            name: "Edu South",
            pollingUnits: [
              "PU 021 - Edu South Primary School",
              "PU 022 - Edu South Market",
              "PU 023 - Edu South Community Hall",
              "PU 024 - Edu South Health Center",
              "PU 025 - Edu South Mosque"
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
              "PU 001 - Ekiti Central Market",
              "PU 002 - Ekiti Central Primary School",
              "PU 003 - Ekiti Central Community Hall",
              "PU 004 - Ekiti Central Health Center",
              "PU 005 - Ekiti Central Mosque"
            ]
          },
          "ekiti-east": {
            name: "Ekiti East",
            pollingUnits: [
              "PU 006 - Ekiti East Primary School",
              "PU 007 - Ekiti East Market",
              "PU 008 - Ekiti East Community Hall",
              "PU 009 - Ekiti East Health Center",
              "PU 010 - Ekiti East Mosque"
            ]
          },
          "ekiti-west": {
            name: "Ekiti West",
            pollingUnits: [
              "PU 011 - Ekiti West Primary School",
              "PU 012 - Ekiti West Market",
              "PU 013 - Ekiti West Community Hall",
              "PU 014 - Ekiti West Health Center",
              "PU 015 - Ekiti West Mosque"
            ]
          },
          "ekiti-north": {
            name: "Ekiti North",
            pollingUnits: [
              "PU 016 - Ekiti North Primary School",
              "PU 017 - Ekiti North Market",
              "PU 018 - Ekiti North Community Hall",
              "PU 019 - Ekiti North Health Center",
              "PU 020 - Ekiti North Mosque"
            ]
          },
          "ekiti-south": {
            name: "Ekiti South",
            pollingUnits: [
              "PU 021 - Ekiti South Primary School",
              "PU 022 - Ekiti South Market",
              "PU 023 - Ekiti South Community Hall",
              "PU 024 - Ekiti South Health Center",
              "PU 025 - Ekiti South Mosque"
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
              "PU 001 - Ifelodun Central Market",
              "PU 002 - Ifelodun Central Primary School",
              "PU 003 - Ifelodun Central Community Hall",
              "PU 004 - Ifelodun Central Health Center",
              "PU 005 - Ifelodun Central Mosque"
            ]
          },
          "ifelodun-east": {
            name: "Ifelodun East",
            pollingUnits: [
              "PU 006 - Ifelodun East Primary School",
              "PU 007 - Ifelodun East Market",
              "PU 008 - Ifelodun East Community Hall",
              "PU 009 - Ifelodun East Health Center",
              "PU 010 - Ifelodun East Mosque"
            ]
          },
          "ifelodun-west": {
            name: "Ifelodun West",
            pollingUnits: [
              "PU 011 - Ifelodun West Primary School",
              "PU 012 - Ifelodun West Market",
              "PU 013 - Ifelodun West Community Hall",
              "PU 014 - Ifelodun West Health Center",
              "PU 015 - Ifelodun West Mosque"
            ]
          },
          "ifelodun-north": {
            name: "Ifelodun North",
            pollingUnits: [
              "PU 016 - Ifelodun North Primary School",
              "PU 017 - Ifelodun North Market",
              "PU 018 - Ifelodun North Community Hall",
              "PU 019 - Ifelodun North Health Center",
              "PU 020 - Ifelodun North Mosque"
            ]
          },
          "ifelodun-south": {
            name: "Ifelodun South",
            pollingUnits: [
              "PU 021 - Ifelodun South Primary School",
              "PU 022 - Ifelodun South Market",
              "PU 023 - Ifelodun South Community Hall",
              "PU 024 - Ifelodun South Health Center",
              "PU 025 - Ifelodun South Mosque"
            ]
          }
        }
      },
      "ilorin-east": { name: "Ilorin East", wards: {} },
      "ilorin-south": { name: "Ilorin South", wards: {} },
      "ilorin-west": { name: "Ilorin West", wards: {} },
      "irepodun": { name: "Irepodun", wards: {} },
      "isinde": { name: "Isinde", wards: {} },
      "kaiama": { name: "Kaiama", wards: {} },
      "moro": { name: "Moro", wards: {} },
      "offa": { name: "Offa", wards: {} },
      "oke-ero": { name: "Oke Ero", wards: {} },
      "oyun": { name: "Oyun", wards: {} },
      "pategi": { name: "Pategi", wards: {} }
    }
  },
  lagos: {
    name: "Lagos",
    lgas: {
      "agege": { 
        name: "Agege", 
        wards: {
          "agege-central": {
            name: "Agege Central",
            pollingUnits: [
              "PU 001 - Agege Central Market",
              "PU 002 - Agege Central Primary School",
              "PU 003 - Agege Central Mosque",
              "PU 004 - Agege Central Health Center",
              "PU 005 - Agege Central Post Office"
            ]
          },
          "agege-east": {
            name: "Agege East",
            pollingUnits: [
              "PU 006 - Agege East Primary School",
              "PU 007 - Agege East Market",
              "PU 008 - Agege East Community Hall",
              "PU 009 - Agege East Health Center",
              "PU 010 - Agege East Mosque"
            ]
          },
          "agege-west": {
            name: "Agege West",
            pollingUnits: [
              "PU 011 - Agege West Primary School",
              "PU 012 - Agege West Market",
              "PU 013 - Agege West Community Hall",
              "PU 014 - Agege West Health Center",
              "PU 015 - Agege West Church"
            ]
          },
          "agege-north": {
            name: "Agege North",
            pollingUnits: [
              "PU 016 - Agege North Primary School",
              "PU 017 - Agege North Market",
              "PU 018 - Agege North Community Hall",
              "PU 019 - Agege North Health Center",
              "PU 020 - Agege North Mosque"
            ]
          },
          "agege-south": {
            name: "Agege South",
            pollingUnits: [
              "PU 021 - Agege South Primary School",
              "PU 022 - Agege South Market",
              "PU 023 - Agege South Community Hall",
              "PU 024 - Agege South Health Center",
              "PU 025 - Agege South Church"
            ]
          }
        }
      },
      "ajeromi-ifelodun": { 
        name: "Ajeromi Ifelodun", 
        wards: {
          "ajeromi-central": {
            name: "Ajeromi Central",
            pollingUnits: [
              "PU 001 - Ajeromi Central Market",
              "PU 002 - Ajeromi Central Primary School",
              "PU 003 - Ajeromi Central Mosque",
              "PU 004 - Ajeromi Central Health Center",
              "PU 005 - Ajeromi Central Post Office"
            ]
          },
          "ajeromi-east": {
            name: "Ajeromi East",
            pollingUnits: [
              "PU 006 - Ajeromi East Primary School",
              "PU 007 - Ajeromi East Market",
              "PU 008 - Ajeromi East Community Hall",
              "PU 009 - Ajeromi East Health Center",
              "PU 010 - Ajeromi East Mosque"
            ]
          },
          "ajeromi-west": {
            name: "Ajeromi West",
            pollingUnits: [
              "PU 011 - Ajeromi West Primary School",
              "PU 012 - Ajeromi West Market",
              "PU 013 - Ajeromi West Community Hall",
              "PU 014 - Ajeromi West Health Center",
              "PU 015 - Ajeromi West Church"
            ]
          },
          "ajeromi-north": {
            name: "Ajeromi North",
            pollingUnits: [
              "PU 016 - Ajeromi North Primary School",
              "PU 017 - Ajeromi North Market",
              "PU 018 - Ajeromi North Community Hall",
              "PU 019 - Ajeromi North Health Center",
              "PU 020 - Ajeromi North Mosque"
            ]
          },
          "ajeromi-south": {
            name: "Ajeromi South",
            pollingUnits: [
              "PU 021 - Ajeromi South Primary School",
              "PU 022 - Ajeromi South Market",
              "PU 023 - Ajeromi South Community Hall",
              "PU 024 - Ajeromi South Health Center",
              "PU 025 - Ajeromi South Church"
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
              "PU 001 - Alimosho Central Market",
              "PU 002 - Alimosho Central Primary School",
              "PU 003 - Alimosho Central Mosque",
              "PU 004 - Alimosho Central Health Center",
              "PU 005 - Alimosho Central Post Office"
            ]
          },
          "alimosho-east": {
            name: "Alimosho East",
            pollingUnits: [
              "PU 006 - Alimosho East Primary School",
              "PU 007 - Alimosho East Market",
              "PU 008 - Alimosho East Community Hall",
              "PU 009 - Alimosho East Health Center",
              "PU 010 - Alimosho East Mosque"
            ]
          },
          "alimosho-west": {
            name: "Alimosho West",
            pollingUnits: [
              "PU 011 - Alimosho West Primary School",
              "PU 012 - Alimosho West Market",
              "PU 013 - Alimosho West Community Hall",
              "PU 014 - Alimosho West Health Center",
              "PU 015 - Alimosho West Church"
            ]
          },
          "alimosho-north": {
            name: "Alimosho North",
            pollingUnits: [
              "PU 016 - Alimosho North Primary School",
              "PU 017 - Alimosho North Market",
              "PU 018 - Alimosho North Community Hall",
              "PU 019 - Alimosho North Health Center",
              "PU 020 - Alimosho North Mosque"
            ]
          },
          "alimosho-south": {
            name: "Alimosho South",
            pollingUnits: [
              "PU 021 - Alimosho South Primary School",
              "PU 022 - Alimosho South Market",
              "PU 023 - Alimosho South Community Hall",
              "PU 024 - Alimosho South Health Center",
              "PU 025 - Alimosho South Church"
            ]
          }
        }
      },
      "amowo-odofin": { 
        name: "Amowo Odofin", 
        wards: {
          "amowo-central": {
            name: "Amowo Central",
            pollingUnits: [
              "PU 001 - Amowo Central Market",
              "PU 002 - Amowo Central Primary School",
              "PU 003 - Amowo Central Mosque",
              "PU 004 - Amowo Central Health Center",
              "PU 005 - Amowo Central Post Office"
            ]
          },
          "amowo-east": {
            name: "Amowo East",
            pollingUnits: [
              "PU 006 - Amowo East Primary School",
              "PU 007 - Amowo East Market",
              "PU 008 - Amowo East Community Hall",
              "PU 009 - Amowo East Health Center",
              "PU 010 - Amowo East Mosque"
            ]
          },
          "amowo-west": {
            name: "Amowo West",
            pollingUnits: [
              "PU 011 - Amowo West Primary School",
              "PU 012 - Amowo West Market",
              "PU 013 - Amowo West Community Hall",
              "PU 014 - Amowo West Health Center",
              "PU 015 - Amowo West Church"
            ]
          },
          "amowo-north": {
            name: "Amowo North",
            pollingUnits: [
              "PU 016 - Amowo North Primary School",
              "PU 017 - Amowo North Market",
              "PU 018 - Amowo North Community Hall",
              "PU 019 - Amowo North Health Center",
              "PU 020 - Amowo North Mosque"
            ]
          },
          "amowo-south": {
            name: "Amowo South",
            pollingUnits: [
              "PU 021 - Amowo South Primary School",
              "PU 022 - Amowo South Market",
              "PU 023 - Amowo South Community Hall",
              "PU 024 - Amowo South Health Center",
              "PU 025 - Amowo South Church"
            ]
          }
        }
      },
      "badagry": { 
        name: "Badagry", 
        wards: {
          "badagry-central": {
            name: "Badagry Central",
            pollingUnits: [
              "PU 001 - Badagry Central Market",
              "PU 002 - Badagry Central Primary School",
              "PU 003 - Badagry Central Mosque",
              "PU 004 - Badagry Central Health Center",
              "PU 005 - Badagry Central Post Office"
            ]
          },
          "badagry-east": {
            name: "Badagry East",
            pollingUnits: [
              "PU 006 - Badagry East Primary School",
              "PU 007 - Badagry East Market",
              "PU 008 - Badagry East Community Hall",
              "PU 009 - Badagry East Health Center",
              "PU 010 - Badagry East Mosque"
            ]
          },
          "badagry-west": {
            name: "Badagry West",
            pollingUnits: [
              "PU 011 - Badagry West Primary School",
              "PU 012 - Badagry West Market",
              "PU 013 - Badagry West Community Hall",
              "PU 014 - Badagry West Health Center",
              "PU 015 - Badagry West Church"
            ]
          },
          "badagry-north": {
            name: "Badagry North",
            pollingUnits: [
              "PU 016 - Badagry North Primary School",
              "PU 017 - Badagry North Market",
              "PU 018 - Badagry North Community Hall",
              "PU 019 - Badagry North Health Center",
              "PU 020 - Badagry North Mosque"
            ]
          },
          "badagry-south": {
            name: "Badagry South",
            pollingUnits: [
              "PU 021 - Badagry South Primary School",
              "PU 022 - Badagry South Market",
              "PU 023 - Badagry South Community Hall",
              "PU 024 - Badagry South Health Center",
              "PU 025 - Badagry South Church"
            ]
          }
        }
      },
      "cos": { name: "Central Office of Statistics", wards: {} },
      "epe": { 
        name: "Epe", 
        wards: {
          "epe-central": {
            name: "Epe Central",
            pollingUnits: [
              "PU 001 - Epe Central Market",
              "PU 002 - Epe Central Primary School",
              "PU 003 - Epe Central Mosque",
              "PU 004 - Epe Central Health Center",
              "PU 005 - Epe Central Post Office"
            ]
          },
          "epe-east": {
            name: "Epe East",
            pollingUnits: [
              "PU 006 - Epe East Primary School",
              "PU 007 - Epe East Market",
              "PU 008 - Epe East Community Hall",
              "PU 009 - Epe East Health Center",
              "PU 010 - Epe East Mosque"
            ]
          },
          "epe-west": {
            name: "Epe West",
            pollingUnits: [
              "PU 011 - Epe West Primary School",
              "PU 012 - Epe West Market",
              "PU 013 - Epe West Community Hall",
              "PU 014 - Epe West Health Center",
              "PU 015 - Epe West Church"
            ]
          },
          "epe-north": {
            name: "Epe North",
            pollingUnits: [
              "PU 016 - Epe North Primary School",
              "PU 017 - Epe North Market",
              "PU 018 - Epe North Community Hall",
              "PU 019 - Epe North Health Center",
              "PU 020 - Epe North Mosque"
            ]
          },
          "epe-south": {
            name: "Epe South",
            pollingUnits: [
              "PU 021 - Epe South Primary School",
              "PU 022 - Epe South Market",
              "PU 023 - Epe South Community Hall",
              "PU 024 - Epe South Health Center",
              "PU 025 - Epe South Church"
            ]
          }
        }
      },
      "etiosa": { 
        name: "Eti Osa", 
        wards: {
          "etiosa-central": {
            name: "Eti Osa Central",
            pollingUnits: [
              "PU 001 - Eti Osa Central Market",
              "PU 002 - Eti Osa Central Primary School",
              "PU 003 - Eti Osa Central Mosque",
              "PU 004 - Eti Osa Central Health Center",
              "PU 005 - Eti Osa Central Post Office"
            ]
          },
          "etiosa-east": {
            name: "Eti Osa East",
            pollingUnits: [
              "PU 006 - Eti Osa East Primary School",
              "PU 007 - Eti Osa East Market",
              "PU 008 - Eti Osa East Community Hall",
              "PU 009 - Eti Osa East Health Center",
              "PU 010 - Eti Osa East Mosque"
            ]
          },
          "etiosa-west": {
            name: "Eti Osa West",
            pollingUnits: [
              "PU 011 - Eti Osa West Primary School",
              "PU 012 - Eti Osa West Market",
              "PU 013 - Eti Osa West Community Hall",
              "PU 014 - Eti Osa West Health Center",
              "PU 015 - Eti Osa West Church"
            ]
          },
          "etiosa-north": {
            name: "Eti Osa North",
            pollingUnits: [
              "PU 016 - Eti Osa North Primary School",
              "PU 017 - Eti Osa North Market",
              "PU 018 - Eti Osa North Community Hall",
              "PU 019 - Eti Osa North Health Center",
              "PU 020 - Eti Osa North Mosque"
            ]
          },
          "etiosa-south": {
            name: "Eti Osa South",
            pollingUnits: [
              "PU 021 - Eti Osa South Primary School",
              "PU 022 - Eti Osa South Market",
              "PU 023 - Eti Osa South Community Hall",
              "PU 024 - Eti Osa South Health Center",
              "PU 025 - Eti Osa South Church"
            ]
          }
        }
      },
      "ibeju-lekki": { 
        name: "Ibeju Lekki", 
        wards: {
          "ibeju-central": {
            name: "Ibeju Central",
            pollingUnits: [
              "PU 001 - Ibeju Central Market",
              "PU 002 - Ibeju Central Primary School",
              "PU 003 - Ibeju Central Mosque",
              "PU 004 - Ibeju Central Health Center",
              "PU 005 - Ibeju Central Post Office"
            ]
          },
          "ibeju-east": {
            name: "Ibeju East",
            pollingUnits: [
              "PU 006 - Ibeju East Primary School",
              "PU 007 - Ibeju East Market",
              "PU 008 - Ibeju East Community Hall",
              "PU 009 - Ibeju East Health Center",
              "PU 010 - Ibeju East Mosque"
            ]
          },
          "ibeju-west": {
            name: "Ibeju West",
            pollingUnits: [
              "PU 011 - Ibeju West Primary School",
              "PU 012 - Ibeju West Market",
              "PU 013 - Ibeju West Community Hall",
              "PU 014 - Ibeju West Health Center",
              "PU 015 - Ibeju West Church"
            ]
          },
          "ibeju-north": {
            name: "Ibeju North",
            pollingUnits: [
              "PU 016 - Ibeju North Primary School",
              "PU 017 - Ibeju North Market",
              "PU 018 - Ibeju North Community Hall",
              "PU 019 - Ibeju North Health Center",
              "PU 020 - Ibeju North Mosque"
            ]
          },
          "ibeju-south": {
            name: "Ibeju South",
            pollingUnits: [
              "PU 021 - Ibeju South Primary School",
              "PU 022 - Ibeju South Market",
              "PU 023 - Ibeju South Community Hall",
              "PU 024 - Ibeju South Health Center",
              "PU 025 - Ibeju South Church"
            ]
          }
        }
      },
      "ifako-ijaiye": { 
        name: "Ifako Ijaiye", 
        wards: {
          "ifako-central": {
            name: "Ifako Central",
            pollingUnits: [
              "PU 001 - Ifako Central Market",
              "PU 002 - Ifako Central Primary School",
              "PU 003 - Ifako Central Mosque",
              "PU 004 - Ifako Central Health Center",
              "PU 005 - Ifako Central Post Office"
            ]
          },
          "ifako-east": {
            name: "Ifako East",
            pollingUnits: [
              "PU 006 - Ifako East Primary School",
              "PU 007 - Ifako East Market",
              "PU 008 - Ifako East Community Hall",
              "PU 009 - Ifako East Health Center",
              "PU 010 - Ifako East Mosque"
            ]
          },
          "ifako-west": {
            name: "Ifako West",
            pollingUnits: [
              "PU 011 - Ifako West Primary School",
              "PU 012 - Ifako West Market",
              "PU 013 - Ifako West Community Hall",
              "PU 014 - Ifako West Health Center",
              "PU 015 - Ifako West Church"
            ]
          },
          "ifako-north": {
            name: "Ifako North",
            pollingUnits: [
              "PU 016 - Ifako North Primary School",
              "PU 017 - Ifako North Market",
              "PU 018 - Ifako North Community Hall",
              "PU 019 - Ifako North Health Center",
              "PU 020 - Ifako North Mosque"
            ]
          },
          "ifako-south": {
            name: "Ifako South",
            pollingUnits: [
              "PU 021 - Ifako South Primary School",
              "PU 022 - Ifako South Market",
              "PU 023 - Ifako South Community Hall",
              "PU 024 - Ifako South Health Center",
              "PU 025 - Ifako South Church"
            ]
          }
        }
      },
      "ikeja": { 
        name: "Ikeja", 
        wards: {
          "ikeja-central": {
            name: "Ikeja Central",
            pollingUnits: [
              "PU 001 - Ikeja Central Market",
              "PU 002 - Ikeja Central Primary School",
              "PU 003 - Ikeja Central Mosque",
              "PU 004 - Ikeja Central Health Center",
              "PU 005 - Ikeja Central Post Office"
            ]
          },
          "ikeja-east": {
            name: "Ikeja East",
            pollingUnits: [
              "PU 006 - Ikeja East Primary School",
              "PU 007 - Ikeja East Market",
              "PU 008 - Ikeja East Community Hall",
              "PU 009 - Ikeja East Health Center",
              "PU 010 - Ikeja East Mosque"
            ]
          },
          "ikeja-west": {
            name: "Ikeja West",
            pollingUnits: [
              "PU 011 - Ikeja West Primary School",
              "PU 012 - Ikeja West Market",
              "PU 013 - Ikeja West Community Hall",
              "PU 014 - Ikeja West Health Center",
              "PU 015 - Ikeja West Church"
            ]
          },
          "ikeja-north": {
            name: "Ikeja North",
            pollingUnits: [
              "PU 016 - Ikeja North Primary School",
              "PU 017 - Ikeja North Market",
              "PU 018 - Ikeja North Community Hall",
              "PU 019 - Ikeja North Health Center",
              "PU 020 - Ikeja North Mosque"
            ]
          },
          "ikeja-south": {
            name: "Ikeja South",
            pollingUnits: [
              "PU 021 - Ikeja South Primary School",
              "PU 022 - Ikeja South Market",
              "PU 023 - Ikeja South Community Hall",
              "PU 024 - Ikeja South Health Center",
              "PU 025 - Ikeja South Church"
            ]
          }
        }
      },
      "ikorodu": { 
        name: "Ikorodu", 
        wards: {
          "ikorodu-central": {
            name: "Ikorodu Central",
            pollingUnits: [
              "PU 001 - Ikorodu Central Market",
              "PU 002 - Ikorodu Central Primary School",
              "PU 003 - Ikorodu Central Mosque",
              "PU 004 - Ikorodu Central Health Center",
              "PU 005 - Ikorodu Central Post Office"
            ]
          },
          "ikorodu-east": {
            name: "Ikorodu East",
            pollingUnits: [
              "PU 006 - Ikorodu East Primary School",
              "PU 007 - Ikorodu East Market",
              "PU 008 - Ikorodu East Community Hall",
              "PU 009 - Ikorodu East Health Center",
              "PU 010 - Ikorodu East Mosque"
            ]
          },
          "ikorodu-west": {
            name: "Ikorodu West",
            pollingUnits: [
              "PU 011 - Ikorodu West Primary School",
              "PU 012 - Ikorodu West Market",
              "PU 013 - Ikorodu West Community Hall",
              "PU 014 - Ikorodu West Health Center",
              "PU 015 - Ikorodu West Church"
            ]
          },
          "ikorodu-north": {
            name: "Ikorodu North",
            pollingUnits: [
              "PU 016 - Ikorodu North Primary School",
              "PU 017 - Ikorodu North Market",
              "PU 018 - Ikorodu North Community Hall",
              "PU 019 - Ikorodu North Health Center",
              "PU 020 - Ikorodu North Mosque"
            ]
          },
          "ikorodu-south": {
            name: "Ikorodu South",
            pollingUnits: [
              "PU 021 - Ikorodu South Primary School",
              "PU 022 - Ikorodu South Market",
              "PU 023 - Ikorodu South Community Hall",
              "PU 024 - Ikorodu South Health Center",
              "PU 025 - Ikorodu South Church"
            ]
          }
        }
      },
      "kosofe": { 
        name: "Kosofe", 
        wards: {
          "kosofe-central": {
            name: "Kosofe Central",
            pollingUnits: [
              "PU 001 - Kosofe Central Market",
              "PU 002 - Kosofe Central Primary School",
              "PU 003 - Kosofe Central Mosque",
              "PU 004 - Kosofe Central Health Center",
              "PU 005 - Kosofe Central Post Office"
            ]
          },
          "kosofe-east": {
            name: "Kosofe East",
            pollingUnits: [
              "PU 006 - Kosofe East Primary School",
              "PU 007 - Kosofe East Market",
              "PU 008 - Kosofe East Community Hall",
              "PU 009 - Kosofe East Health Center",
              "PU 010 - Kosofe East Mosque"
            ]
          },
          "kosofe-west": {
            name: "Kosofe West",
            pollingUnits: [
              "PU 011 - Kosofe West Primary School",
              "PU 012 - Kosofe West Market",
              "PU 013 - Kosofe West Community Hall",
              "PU 014 - Kosofe West Health Center",
              "PU 015 - Kosofe West Church"
            ]
          },
          "kosofe-north": {
            name: "Kosofe North",
            pollingUnits: [
              "PU 016 - Kosofe North Primary School",
              "PU 017 - Kosofe North Market",
              "PU 018 - Kosofe North Community Hall",
              "PU 019 - Kosofe North Health Center",
              "PU 020 - Kosofe North Mosque"
            ]
          },
          "kosofe-south": {
            name: "Kosofe South",
            pollingUnits: [
              "PU 021 - Kosofe South Primary School",
              "PU 022 - Kosofe South Market",
              "PU 023 - Kosofe South Community Hall",
              "PU 024 - Kosofe South Health Center",
              "PU 025 - Kosofe South Church"
            ]
          }
        }
      },
      "lagos-island": { 
        name: "Lagos Island", 
        wards: {
          "lagos-island-central": {
            name: "Lagos Island Central",
            pollingUnits: [
              "PU 001 - Lagos Island Central Market",
              "PU 002 - Lagos Island Central Primary School",
              "PU 003 - Lagos Island Central Mosque",
              "PU 004 - Lagos Island Central Health Center",
              "PU 005 - Lagos Island Central Post Office"
            ]
          },
          "lagos-island-east": {
            name: "Lagos Island East",
            pollingUnits: [
              "PU 006 - Lagos Island East Primary School",
              "PU 007 - Lagos Island East Market",
              "PU 008 - Lagos Island East Community Hall",
              "PU 009 - Lagos Island East Health Center",
              "PU 010 - Lagos Island East Mosque"
            ]
          },
          "lagos-island-west": {
            name: "Lagos Island West",
            pollingUnits: [
              "PU 011 - Lagos Island West Primary School",
              "PU 012 - Lagos Island West Market",
              "PU 013 - Lagos Island West Community Hall",
              "PU 014 - Lagos Island West Health Center",
              "PU 015 - Lagos Island West Church"
            ]
          },
          "lagos-island-north": {
            name: "Lagos Island North",
            pollingUnits: [
              "PU 016 - Lagos Island North Primary School",
              "PU 017 - Lagos Island North Market",
              "PU 018 - Lagos Island North Community Hall",
              "PU 019 - Lagos Island North Health Center",
              "PU 020 - Lagos Island North Mosque"
            ]
          },
          "lagos-island-south": {
            name: "Lagos Island South",
            pollingUnits: [
              "PU 021 - Lagos Island South Primary School",
              "PU 022 - Lagos Island South Market",
              "PU 023 - Lagos Island South Community Hall",
              "PU 024 - Lagos Island South Health Center",
              "PU 025 - Lagos Island South Church"
            ]
          }
        }
      },
      "lagos-mainland": { 
        name: "Lagos Mainland", 
        wards: {
          "lagos-mainland-central": {
            name: "Lagos Mainland Central",
            pollingUnits: [
              "PU 001 - Lagos Mainland Central Market",
              "PU 002 - Lagos Mainland Central Primary School",
              "PU 003 - Lagos Mainland Central Mosque",
              "PU 004 - Lagos Mainland Central Health Center",
              "PU 005 - Lagos Mainland Central Post Office"
            ]
          },
          "lagos-mainland-east": {
            name: "Lagos Mainland East",
            pollingUnits: [
              "PU 006 - Lagos Mainland East Primary School",
              "PU 007 - Lagos Mainland East Market",
              "PU 008 - Lagos Mainland East Community Hall",
              "PU 009 - Lagos Mainland East Health Center",
              "PU 010 - Lagos Mainland East Mosque"
            ]
          },
          "lagos-mainland-west": {
            name: "Lagos Mainland West",
            pollingUnits: [
              "PU 011 - Lagos Mainland West Primary School",
              "PU 012 - Lagos Mainland West Market",
              "PU 013 - Lagos Mainland West Community Hall",
              "PU 014 - Lagos Mainland West Health Center",
              "PU 015 - Lagos Mainland West Church"
            ]
          },
          "lagos-mainland-north": {
            name: "Lagos Mainland North",
            pollingUnits: [
              "PU 016 - Lagos Mainland North Primary School",
              "PU 017 - Lagos Mainland North Market",
              "PU 018 - Lagos Mainland North Community Hall",
              "PU 019 - Lagos Mainland North Health Center",
              "PU 020 - Lagos Mainland North Mosque"
            ]
          },
          "lagos-mainland-south": {
            name: "Lagos Mainland South",
            pollingUnits: [
              "PU 021 - Lagos Mainland South Primary School",
              "PU 022 - Lagos Mainland South Market",
              "PU 023 - Lagos Mainland South Community Hall",
              "PU 024 - Lagos Mainland South Health Center",
              "PU 025 - Lagos Mainland South Church"
            ]
          }
        }
      },
      "mushin": { 
        name: "Mushin", 
        wards: {
          "mushin-central": {
            name: "Mushin Central",
            pollingUnits: [
              "PU 001 - Mushin Central Market",
              "PU 002 - Mushin Central Primary School",
              "PU 003 - Mushin Central Mosque",
              "PU 004 - Mushin Central Health Center",
              "PU 005 - Mushin Central Post Office"
            ]
          },
          "mushin-east": {
            name: "Mushin East",
            pollingUnits: [
              "PU 006 - Mushin East Primary School",
              "PU 007 - Mushin East Market",
              "PU 008 - Mushin East Community Hall",
              "PU 009 - Mushin East Health Center",
              "PU 010 - Mushin East Mosque"
            ]
          },
          "mushin-west": {
            name: "Mushin West",
            pollingUnits: [
              "PU 011 - Mushin West Primary School",
              "PU 012 - Mushin West Market",
              "PU 013 - Mushin West Community Hall",
              "PU 014 - Mushin West Health Center",
              "PU 015 - Mushin West Church"
            ]
          },
          "mushin-north": {
            name: "Mushin North",
            pollingUnits: [
              "PU 016 - Mushin North Primary School",
              "PU 017 - Mushin North Market",
              "PU 018 - Mushin North Community Hall",
              "PU 019 - Mushin North Health Center",
              "PU 020 - Mushin North Mosque"
            ]
          },
          "mushin-south": {
            name: "Mushin South",
            pollingUnits: [
              "PU 021 - Mushin South Primary School",
              "PU 022 - Mushin South Market",
              "PU 023 - Mushin South Community Hall",
              "PU 024 - Mushin South Health Center",
              "PU 025 - Mushin South Church"
            ]
          }
        }
      },
      "ojo": { 
        name: "Ojo", 
        wards: {
          "ojo-central": {
            name: "Ojo Central",
            pollingUnits: [
              "PU 001 - Ojo Central Market",
              "PU 002 - Ojo Central Primary School",
              "PU 003 - Ojo Central Mosque",
              "PU 004 - Ojo Central Health Center",
              "PU 005 - Ojo Central Post Office"
            ]
          },
          "ojo-east": {
            name: "Ojo East",
            pollingUnits: [
              "PU 006 - Ojo East Primary School",
              "PU 007 - Ojo East Market",
              "PU 008 - Ojo East Community Hall",
              "PU 009 - Ojo East Health Center",
              "PU 010 - Ojo East Mosque"
            ]
          },
          "ojo-west": {
            name: "Ojo West",
            pollingUnits: [
              "PU 011 - Ojo West Primary School",
              "PU 012 - Ojo West Market",
              "PU 013 - Ojo West Community Hall",
              "PU 014 - Ojo West Health Center",
              "PU 015 - Ojo West Church"
            ]
          },
          "ojo-north": {
            name: "Ojo North",
            pollingUnits: [
              "PU 016 - Ojo North Primary School",
              "PU 017 - Ojo North Market",
              "PU 018 - Ojo North Community Hall",
              "PU 019 - Ojo North Health Center",
              "PU 020 - Ojo North Mosque"
            ]
          },
          "ojo-south": {
            name: "Ojo South",
            pollingUnits: [
              "PU 021 - Ojo South Primary School",
              "PU 022 - Ojo South Market",
              "PU 023 - Ojo South Community Hall",
              "PU 024 - Ojo South Health Center",
              "PU 025 - Ojo South Church"
            ]
          }
        }
      },
      "oshodi-isolo": { 
        name: "Oshodi Isolo", 
        wards: {
          "oshodi-central": {
            name: "Oshodi Central",
            pollingUnits: [
              "PU 001 - Oshodi Central Market",
              "PU 002 - Oshodi Central Primary School",
              "PU 003 - Oshodi Central Mosque",
              "PU 004 - Oshodi Central Health Center",
              "PU 005 - Oshodi Central Post Office"
            ]
          },
          "oshodi-east": {
            name: "Oshodi East",
            pollingUnits: [
              "PU 006 - Oshodi East Primary School",
              "PU 007 - Oshodi East Market",
              "PU 008 - Oshodi East Community Hall",
              "PU 009 - Oshodi East Health Center",
              "PU 010 - Oshodi East Mosque"
            ]
          },
          "oshodi-west": {
            name: "Oshodi West",
            pollingUnits: [
              "PU 011 - Oshodi West Primary School",
              "PU 012 - Oshodi West Market",
              "PU 013 - Oshodi West Community Hall",
              "PU 014 - Oshodi West Health Center",
              "PU 015 - Oshodi West Church"
            ]
          },
          "oshodi-north": {
            name: "Oshodi North",
            pollingUnits: [
              "PU 016 - Ojo North Primary School",
              "PU 017 - Ojo North Market",
              "PU 018 - Ojo North Community Hall",
              "PU 019 - Ojo North Health Center",
              "PU 020 - Ojo North Mosque"
            ]
          },
          "oshodi-south": {
            name: "Oshodi South",
            pollingUnits: [
              "PU 021 - Ojo South Primary School",
              "PU 022 - Ojo South Market",
              "PU 023 - Ojo South Community Hall",
              "PU 024 - Ojo South Health Center",
              "PU 025 - Ojo South Church"
            ]
          }
        }
      },
      "shomolu": { 
        name: "Shomolu", 
        wards: {
          "shomolu-central": {
            name: "Shomolu Central",
            pollingUnits: [
              "PU 001 - Shomolu Central Market",
              "PU 002 - Shomolu Central Primary School",
              "PU 003 - Shomolu Central Mosque",
              "PU 004 - Shomolu Central Health Center",
              "PU 005 - Shomolu Central Post Office"
            ]
          },
          "shomolu-east": {
            name: "Shomolu East",
            pollingUnits: [
              "PU 006 - Shomolu East Primary School",
              "PU 007 - Shomolu East Market",
              "PU 008 - Shomolu East Community Hall",
              "PU 009 - Shomolu East Health Center",
              "PU 010 - Shomolu East Mosque"
            ]
          },
          "shomolu-west": {
            name: "Shomolu West",
            pollingUnits: [
              "PU 011 - Shomolu West Primary School",
              "PU 012 - Shomolu West Market",
              "PU 013 - Shomolu West Community Hall",
              "PU 014 - Shomolu West Health Center",
              "PU 015 - Shomolu West Church"
            ]
          },
          "shomolu-north": {
            name: "Shomolu North",
            pollingUnits: [
              "PU 016 - Shomolu North Primary School",
              "PU 017 - Shomolu North Market",
              "PU 018 - Shomolu North Community Hall",
              "PU 019 - Shomolu North Health Center",
              "PU 020 - Shomolu North Mosque"
            ]
          },
          "shomolu-south": {
            name: "Shomolu South",
            pollingUnits: [
              "PU 021 - Shomolu South Primary School",
              "PU 022 - Shomolu South Market",
              "PU 023 - Shomolu South Community Hall",
              "PU 024 - Shomolu South Health Center",
              "PU 025 - Shomolu South Church"
            ]
          }
        }
      },
      "surulere": { 
        name: "Surulere", 
        wards: {
          "surulere-central": {
            name: "Surulere Central",
            pollingUnits: [
              "PU 001 - Surulere Central Market",
              "PU 002 - Surulere Central Primary School",
              "PU 003 - Surulere Central Mosque",
              "PU 004 - Surulere Central Health Center",
              "PU 005 - Surulere Central Post Office"
            ]
          },
          "surulere-east": {
            name: "Surulere East",
            pollingUnits: [
              "PU 006 - Surulere East Primary School",
              "PU 007 - Surulere East Market",
              "PU 008 - Surulere East Community Hall",
              "PU 009 - Surulere East Health Center",
              "PU 010 - Surulere East Mosque"
            ]
          },
          "surulere-west": {
            name: "Surulere West",
            pollingUnits: [
              "PU 011 - Surulere West Primary School",
              "PU 012 - Surulere West Market",
              "PU 013 - Surulere West Community Hall",
              "PU 014 - Surulere West Health Center",
              "PU 015 - Surulere West Church"
            ]
          },
          "surulere-north": {
            name: "Surulere North",
            pollingUnits: [
              "PU 016 - Surulere North Primary School",
              "PU 017 - Surulere North Market",
              "PU 018 - Surulere North Community Hall",
              "PU 019 - Surulere North Health Center",
              "PU 020 - Surulere North Mosque"
            ]
          },
          "surulere-south": {
            name: "Surulere South",
            pollingUnits: [
              "PU 021 - Surulere South Primary School",
              "PU 022 - Surulere South Market",
              "PU 023 - Surulere South Community Hall",
              "PU 024 - Surulere South Health Center",
              "PU 025 - Surulere South Church"
            ]
          }
        }
      }
    }
  },
  plateau: {
    name: "Plateau",
    lgas: {
      "barikin-ladi": { 
        name: "Barikin Ladi", 
        wards: {
          "barikin-ladi-central": {
            name: "Barikin Ladi Central",
            pollingUnits: [
              "PU 001 - Barikin Ladi Central Market",
              "PU 002 - Barikin Ladi Central Primary School",
              "PU 003 - Barikin Ladi Central Community Hall",
              "PU 004 - Barikin Ladi Central Health Center",
              "PU 005 - Barikin Ladi Central Church"
            ]
          },
          "barikin-ladi-east": {
            name: "Barikin Ladi East",
            pollingUnits: [
              "PU 006 - Barikin Ladi East Primary School",
              "PU 007 - Barikin Ladi East Market",
              "PU 008 - Barikin Ladi East Community Hall",
              "PU 009 - Barikin Ladi East Health Center",
              "PU 010 - Barikin Ladi East Church"
            ]
          },
          "barikin-ladi-west": {
            name: "Barikin Ladi West",
            pollingUnits: [
              "PU 011 - Barikin Ladi West Primary School",
              "PU 012 - Barikin Ladi West Market",
              "PU 013 - Barikin Ladi West Community Hall",
              "PU 014 - Barikin Ladi West Health Center",
              "PU 015 - Barikin Ladi West Church"
            ]
          },
          "barikin-ladi-north": {
            name: "Barikin Ladi North",
            pollingUnits: [
              "PU 016 - Barikin Ladi North Primary School",
              "PU 017 - Barikin Ladi North Market",
              "PU 018 - Barikin Ladi North Community Hall",
              "PU 019 - Barikin Ladi North Health Center",
              "PU 020 - Barikin Ladi North Church"
            ]
          },
          "barikin-ladi-south": {
            name: "Barikin Ladi South",
            pollingUnits: [
              "PU 021 - Barikin Ladi South Primary School",
              "PU 022 - Barikin Ladi South Market",
              "PU 023 - Barikin Ladi South Community Hall",
              "PU 024 - Barikin Ladi South Health Center",
              "PU 025 - Barikin Ladi South Church"
            ]
          }
        }
      },
      "bassa": { 
        name: "Bassa", 
        wards: {
          "bassa-central": {
            name: "Bassa Central",
            pollingUnits: [
              "PU 001 - Bassa Central Market",
              "PU 002 - Bassa Central Primary School",
              "PU 003 - Bassa Central Community Hall",
              "PU 004 - Bassa Central Health Center",
              "PU 005 - Bassa Central Church"
            ]
          },
          "bassa-east": {
            name: "Bassa East",
            pollingUnits: [
              "PU 006 - Bassa East Primary School",
              "PU 007 - Bassa East Market",
              "PU 008 - Bassa East Community Hall",
              "PU 009 - Bassa East Health Center",
              "PU 010 - Bassa East Church"
            ]
          },
          "bassa-west": {
            name: "Bassa West",
            pollingUnits: [
              "PU 011 - Bassa West Primary School",
              "PU 012 - Bassa West Market",
              "PU 013 - Bassa West Community Hall",
              "PU 014 - Bassa West Health Center",
              "PU 015 - Bassa West Church"
            ]
          },
          "bassa-north": {
            name: "Bassa North",
            pollingUnits: [
              "PU 016 - Bassa North Primary School",
              "PU 017 - Bassa North Market",
              "PU 018 - Bassa North Community Hall",
              "PU 019 - Bassa North Health Center",
              "PU 020 - Bassa North Church"
            ]
          },
          "bassa-south": {
            name: "Bassa South",
            pollingUnits: [
              "PU 021 - Bassa South Primary School",
              "PU 022 - Bassa South Market",
              "PU 023 - Bassa South Community Hall",
              "PU 024 - Bassa South Health Center",
              "PU 025 - Bassa South Church"
            ]
          }
        }
      },
      "bokkos": { 
        name: "Bokkos", 
        wards: {
          "bokkos-central": {
            name: "Bokkos Central",
            pollingUnits: [
              "PU 001 - Bokkos Central Market",
              "PU 002 - Bokkos Central Primary School",
              "PU 003 - Bokkos Central Community Hall",
              "PU 004 - Bokkos Central Health Center",
              "PU 005 - Bokkos Central Church"
            ]
          },
          "bokkos-east": {
            name: "Bokkos East",
            pollingUnits: [
              "PU 006 - Bokkos East Primary School",
              "PU 007 - Bokkos East Market",
              "PU 008 - Bokkos East Community Hall",
              "PU 009 - Bokkos East Health Center",
              "PU 010 - Bokkos East Church"
            ]
          },
          "bokkos-west": {
            name: "Bokkos West",
            pollingUnits: [
              "PU 011 - Bokkos West Primary School",
              "PU 012 - Bokkos West Market",
              "PU 013 - Bokkos West Community Hall",
              "PU 014 - Bokkos West Health Center",
              "PU 015 - Bokkos West Church"
            ]
          },
          "bokkos-north": {
            name: "Bokkos North",
            pollingUnits: [
              "PU 016 - Bokkos North Primary School",
              "PU 017 - Bokkos North Market",
              "PU 018 - Bokkos North Community Hall",
              "PU 019 - Bokkos North Health Center",
              "PU 020 - Bokkos North Church"
            ]
          },
          "bokkos-south": {
            name: "Bokkos South",
            pollingUnits: [
              "PU 021 - Bokkos South Primary School",
              "PU 022 - Bokkos South Market",
              "PU 023 - Bokkos South Community Hall",
              "PU 024 - Bokkos South Health Center",
              "PU 025 - Bokkos South Church"
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
              "PU 001 - Jos East Central Market",
              "PU 002 - Jos East Central Primary School",
              "PU 003 - Jos East Central Community Hall",
              "PU 004 - Jos East Central Health Center",
              "PU 005 - Jos East Central Church"
            ]
          },
          "jos-east-east": {
            name: "Jos East East",
            pollingUnits: [
              "PU 006 - Jos East East Primary School",
              "PU 007 - Jos East East Market",
              "PU 008 - Jos East East Community Hall",
              "PU 009 - Jos East East Health Center",
              "PU 010 - Jos East East Church"
            ]
          },
          "jos-east-west": {
            name: "Jos East West",
            pollingUnits: [
              "PU 011 - Jos East West Primary School",
              "PU 012 - Jos East West Market",
              "PU 013 - Jos East West Community Hall",
              "PU 014 - Jos East West Health Center",
              "PU 015 - Jos East West Church"
            ]
          },
          "jos-east-north": {
            name: "Jos East North",
            pollingUnits: [
              "PU 016 - Jos East North Primary School",
              "PU 017 - Jos East North Market",
              "PU 018 - Jos East North Community Hall",
              "PU 019 - Jos East North Health Center",
              "PU 020 - Jos East North Church"
            ]
          },
          "jos-east-south": {
            name: "Jos East South",
            pollingUnits: [
              "PU 021 - Jos East South Primary School",
              "PU 022 - Jos East South Market",
              "PU 023 - Jos East South Community Hall",
              "PU 024 - Jos East South Health Center",
              "PU 025 - Jos East South Church"
            ]
          }
        }
      },
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
              "PU 005 - Jos North Central Church"
            ]
          },
          "jos-north-east": {
            name: "Jos North East",
            pollingUnits: [
              "PU 006 - Jos North East Primary School",
              "PU 007 - Jos North East Market",
              "PU 008 - Jos North East Community Hall",
              "PU 009 - Jos North East Health Center",
              "PU 010 - Jos North East Church"
            ]
          },
          "jos-north-west": {
            name: "Jos North West",
            pollingUnits: [
              "PU 011 - Jos North West Primary School",
              "PU 012 - Jos North West Market",
              "PU 013 - Jos North West Community Hall",
              "PU 014 - Jos North West Health Center",
              "PU 015 - Jos North West Church"
            ]
          },
          "jos-north-north": {
            name: "Jos North North",
            pollingUnits: [
              "PU 016 - Jos North North Primary School",
              "PU 017 - Jos North North Market",
              "PU 018 - Jos North North Community Hall",
              "PU 019 - Jos North North Health Center",
              "PU 020 - Jos North North Church"
            ]
          },
          "jos-north-south": {
            name: "Jos North South",
            pollingUnits: [
              "PU 021 - Jos North South Primary School",
              "PU 022 - Jos North South Market",
              "PU 023 - Jos North South Community Hall",
              "PU 024 - Jos North South Health Center",
              "PU 025 - Jos North South Church"
            ]
          }
        }
      },
      "jos-south": { name: "Jos South", wards: {} },
      "kanam": { name: "Kanam", wards: {} },
      "kanke": { name: "Kanke", wards: {} },
      "langtang-north": { name: "Langtang North", wards: {} },
      "langtang-south": { name: "Langtang South", wards: {} },
      "mangu": { name: "Mangu", wards: {} },
      "mikang": { name: "Mikang", wards: {} },
      "pankshin": { name: "Pankshin", wards: {} },
      "quaan-pan": { name: "Quaan Pan", wards: {} },
      "riyom": { name: "Riyom", wards: {} },
      "shendam": { name: "Shendam", wards: {} },
      "wase": { name: "Wase", wards: {} }
    }
  },
  rivers: {
    name: "Rivers",
    lgas: {
      "abua-odual": { 
        name: "Abua Odual", 
        wards: {
          "abua-central": {
            name: "Abua Central",
            pollingUnits: [
              "PU 001 - Abua Central Market",
              "PU 002 - Abua Central Primary School",
              "PU 003 - Abua Central Community Hall",
              "PU 004 - Abua Central Health Center",
              "PU 005 - Abua Central Church"
            ]
          },
          "abua-east": {
            name: "Abua East",
            pollingUnits: [
              "PU 006 - Abua East Primary School",
              "PU 007 - Abua East Market",
              "PU 008 - Abua East Community Hall",
              "PU 009 - Abua East Health Center",
              "PU 010 - Abua East Church"
            ]
          },
          "abua-west": {
            name: "Abua West",
            pollingUnits: [
              "PU 011 - Abua West Primary School",
              "PU 012 - Abua West Market",
              "PU 013 - Abua West Community Hall",
              "PU 014 - Abua West Health Center",
              "PU 015 - Abua West Church"
            ]
          },
          "abua-north": {
            name: "Abua North",
            pollingUnits: [
              "PU 016 - Abua North Primary School",
              "PU 017 - Abua North Market",
              "PU 018 - Abua North Community Hall",
              "PU 019 - Abua North Health Center",
              "PU 020 - Abua North Church"
            ]
          },
          "abua-south": {
            name: "Abua South",
            pollingUnits: [
              "PU 021 - Abua South Primary School",
              "PU 022 - Abua South Market",
              "PU 023 - Abua South Community Hall",
              "PU 024 - Abua South Health Center",
              "PU 025 - Abua South Church"
            ]
          }
        }
      },
      "ahoada-east": { 
        name: "Ahoada East", 
        wards: {
          "ahoada-central": {
            name: "Ahoada Central",
            pollingUnits: [
              "PU 001 - Ahoada Central Market",
              "PU 002 - Ahoada Central Primary School",
              "PU 003 - Ahoada Central Community Hall",
              "PU 004 - Ahoada Central Health Center",
              "PU 005 - Ahoada Central Church"
            ]
          },
          "ahoada-east": {
            name: "Ahoada East",
            pollingUnits: [
              "PU 006 - Ahoada East Primary School",
              "PU 007 - Ahoada East Market",
              "PU 008 - Ahoada East Community Hall",
              "PU 009 - Ahoada East Health Center",
              "PU 010 - Ahoada East Church"
            ]
          },
          "ahoada-west": {
            name: "Ahoada West",
            pollingUnits: [
              "PU 011 - Ahoada West Primary School",
              "PU 012 - Ahoada West Market",
              "PU 013 - Ahoada West Community Hall",
              "PU 014 - Ahoada West Health Center",
              "PU 015 - Ahoada West Church"
            ]
          },
          "ahoada-north": {
            name: "Ahoada North",
            pollingUnits: [
              "PU 016 - Ahoada North Primary School",
              "PU 017 - Ahoada North Market",
              "PU 018 - Ahoada North Community Hall",
              "PU 019 - Ahoada North Health Center",
              "PU 020 - Ahoada North Church"
            ]
          },
          "ahoada-south": {
            name: "Ahoada South",
            pollingUnits: [
              "PU 021 - Ahoada South Primary School",
              "PU 022 - Ahoada South Market",
              "PU 023 - Ahoada South Community Hall",
              "PU 024 - Ahoada South Health Center",
              "PU 025 - Ahoada South Church"
            ]
          }
        }
      },
      "ahoada-west": { 
        name: "Ahoada West", 
        wards: {
          "ahoada-west-central": {
            name: "Ahoada West Central",
            pollingUnits: [
              "PU 001 - Ahoada West Central Market",
              "PU 002 - Ahoada West Central Primary School",
              "PU 003 - Ahoada West Central Community Hall",
              "PU 004 - Ahoada West Central Health Center",
              "PU 005 - Ahoada West Central Church"
            ]
          },
          "ahoada-west-east": {
            name: "Ahoada West East",
            pollingUnits: [
              "PU 006 - Ahoada West East Primary School",
              "PU 007 - Ahoada West East Market",
              "PU 008 - Ahoada West East Community Hall",
              "PU 009 - Ahoada West East Health Center",
              "PU 010 - Ahoada West East Church"
            ]
          },
          "ahoada-west-west": {
            name: "Ahoada West West",
            pollingUnits: [
              "PU 011 - Ahoada West West Primary School",
              "PU 012 - Ahoada West West Market",
              "PU 013 - Ahoada West West Community Hall",
              "PU 014 - Ahoada West West Health Center",
              "PU 015 - Ahoada West West Church"
            ]
          },
          "ahoada-west-north": {
            name: "Ahoada West North",
            pollingUnits: [
              "PU 016 - Ahoada West North Primary School",
              "PU 017 - Ahoada West North Market",
              "PU 018 - Ahoada West North Community Hall",
              "PU 019 - Ahoada West North Health Center",
              "PU 020 - Ahoada West North Church"
            ]
          },
          "ahoada-west-south": {
            name: "Ahoada West South",
            pollingUnits: [
              "PU 021 - Ahoada West South Primary School",
              "PU 022 - Ahoada West South Market",
              "PU 023 - Ahoada West South Community Hall",
              "PU 024 - Ahoada West South Health Center",
              "PU 025 - Ahoada West South Church"
            ]
          }
        }
      },
      "akuku-toru": { 
        name: "Akuku Toru", 
        wards: {
          "akuku-central": {
            name: "Akuku Central",
            pollingUnits: [
              "PU 001 - Akuku Central Market",
              "PU 002 - Akuku Central Primary School",
              "PU 003 - Akuku Central Community Hall",
              "PU 004 - Akuku Central Health Center",
              "PU 005 - Akuku Central Church"
            ]
          },
          "akuku-east": {
            name: "Akuku East",
            pollingUnits: [
              "PU 006 - Akuku East Primary School",
              "PU 007 - Akuku East Market",
              "PU 008 - Akuku East Community Hall",
              "PU 009 - Akuku East Health Center",
              "PU 010 - Akuku East Church"
            ]
          },
          "akuku-west": {
            name: "Akuku West",
            pollingUnits: [
              "PU 011 - Akuku West Primary School",
              "PU 012 - Akuku West Market",
              "PU 013 - Akuku West Community Hall",
              "PU 014 - Akuku West Health Center",
              "PU 015 - Akuku West Church"
            ]
          },
          "akuku-north": {
            name: "Akuku North",
            pollingUnits: [
              "PU 016 - Akuku North Primary School",
              "PU 017 - Akuku North Market",
              "PU 018 - Akuku North Community Hall",
              "PU 019 - Akuku North Health Center",
              "PU 020 - Akuku North Church"
            ]
          },
          "akuku-south": {
            name: "Akuku South",
            pollingUnits: [
              "PU 021 - Akuku South Primary School",
              "PU 022 - Akuku South Market",
              "PU 023 - Akuku South Community Hall",
              "PU 024 - Akuku South Health Center",
              "PU 025 - Akuku South Church"
            ]
          }
        }
      },
      "andoni": { 
        name: "Andoni", 
        wards: {
          "andoni-central": {
            name: "Andoni Central",
            pollingUnits: [
              "PU 001 - Andoni Central Market",
              "PU 002 - Andoni Central Primary School",
              "PU 003 - Andoni Central Community Hall",
              "PU 004 - Andoni Central Health Center",
              "PU 005 - Andoni Central Church"
            ]
          },
          "andoni-east": {
            name: "Andoni East",
            pollingUnits: [
              "PU 006 - Andoni East Primary School",
              "PU 007 - Andoni East Market",
              "PU 008 - Andoni East Community Hall",
              "PU 009 - Andoni East Health Center",
              "PU 010 - Andoni East Church"
            ]
          },
          "andoni-west": {
            name: "Andoni West",
            pollingUnits: [
              "PU 011 - Andoni West Primary School",
              "PU 012 - Andoni West Market",
              "PU 013 - Andoni West Community Hall",
              "PU 014 - Andoni West Health Center",
              "PU 015 - Andoni West Church"
            ]
          },
          "andoni-north": {
            name: "Andoni North",
            pollingUnits: [
              "PU 016 - Andoni North Primary School",
              "PU 017 - Andoni North Market",
              "PU 018 - Andoni North Community Hall",
              "PU 019 - Andoni North Health Center",
              "PU 020 - Andoni North Church"
            ]
          },
          "andoni-south": {
            name: "Andoni South",
            pollingUnits: [
              "PU 021 - Andoni South Primary School",
              "PU 022 - Andoni South Market",
              "PU 023 - Andoni South Community Hall",
              "PU 024 - Andoni South Health Center",
              "PU 025 - Andoni South Church"
            ]
          }
        }
      },
      "asari-toru": { name: "Asari Toru", wards: {} },
      "bonny": { name: "Bonny", wards: {} },
      "degema": { name: "Degema", wards: {} },
      "eleme": { name: "Eleme", wards: {} },
      "emohua": { name: "Emohua", wards: {} },
      "etche": { name: "Etche", wards: {} },
      "gokana": { name: "Gokana", wards: {} },
      "ikwerre": { name: "Ikwerre", wards: {} },
      "khana": { name: "Khana", wards: {} },
      "obio-akpor": { name: "Obio Akpor", wards: {} },
      "ogba-egbema-ndoni": { name: "Ogba Egbema Ndoni", wards: {} },
      "okrika": { name: "Okrika", wards: {} },
      "omumma": { name: "Omumma", wards: {} },
      "opobo-nkoro": { name: "Opobo Nkoro", wards: {} },
      "oyigbo": { name: "Oyigbo", wards: {} },
      "port-harcourt": { name: "Port Harcourt", wards: {} },
      "tai": { name: "Tai", wards: {} }
    }
  },
  sokoto: {
    name: "Sokoto",
    lgas: {
      "binji": { 
        name: "Binji", 
        wards: {
          "binji-central": {
            name: "Binji Central",
            pollingUnits: [
              "PU 001 - Binji Central Market",
              "PU 002 - Binji Central Primary School",
              "PU 003 - Binji Central Community Hall",
              "PU 004 - Binji Central Health Center",
              "PU 005 - Binji Central Mosque"
            ]
          },
          "binji-east": {
            name: "Binji East",
            pollingUnits: [
              "PU 006 - Binji East Primary School",
              "PU 007 - Binji East Market",
              "PU 008 - Binji East Community Hall",
              "PU 009 - Binji East Health Center",
              "PU 010 - Binji East Mosque"
            ]
          },
          "binji-west": {
            name: "Binji West",
            pollingUnits: [
              "PU 011 - Binji West Primary School",
              "PU 012 - Binji West Market",
              "PU 013 - Binji West Community Hall",
              "PU 014 - Binji West Health Center",
              "PU 015 - Binji West Mosque"
            ]
          },
          "binji-north": {
            name: "Binji North",
            pollingUnits: [
              "PU 016 - Binji North Primary School",
              "PU 017 - Binji North Market",
              "PU 018 - Binji North Community Hall",
              "PU 019 - Binji North Health Center",
              "PU 020 - Binji North Mosque"
            ]
          },
          "binji-south": {
            name: "Binji South",
            pollingUnits: [
              "PU 021 - Binji South Primary School",
              "PU 022 - Binji South Market",
              "PU 023 - Binji South Community Hall",
              "PU 024 - Binji South Health Center",
              "PU 025 - Binji South Mosque"
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
              "PU 001 - Bodinga Central Market",
              "PU 002 - Bodinga Central Primary School",
              "PU 003 - Bodinga Central Community Hall",
              "PU 004 - Bodinga Central Health Center",
              "PU 005 - Bodinga Central Mosque"
            ]
          },
          "bodinga-east": {
            name: "Bodinga East",
            pollingUnits: [
              "PU 006 - Bodinga East Primary School",
              "PU 007 - Bodinga East Market",
              "PU 008 - Bodinga East Community Hall",
              "PU 009 - Bodinga East Health Center",
              "PU 010 - Bodinga East Mosque"
            ]
          },
          "bodinga-west": {
            name: "Bodinga West",
            pollingUnits: [
              "PU 011 - Bodinga West Primary School",
              "PU 012 - Bodinga West Market",
              "PU 013 - Bodinga West Community Hall",
              "PU 014 - Bodinga West Health Center",
              "PU 015 - Bodinga West Mosque"
            ]
          },
          "bodinga-north": {
            name: "Bodinga North",
            pollingUnits: [
              "PU 016 - Bodinga North Primary School",
              "PU 017 - Bodinga North Market",
              "PU 018 - Bodinga North Community Hall",
              "PU 019 - Bodinga North Health Center",
              "PU 020 - Bodinga North Mosque"
            ]
          },
          "bodinga-south": {
            name: "Bodinga South",
            pollingUnits: [
              "PU 021 - Bodinga South Primary School",
              "PU 022 - Bodinga South Market",
              "PU 023 - Bodinga South Community Hall",
              "PU 024 - Bodinga South Health Center",
              "PU 025 - Bodinga South Mosque"
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
              "PU 001 - Dange Shuni Central Market",
              "PU 002 - Dange Shuni Central Primary School",
              "PU 003 - Dange Shuni Central Community Hall",
              "PU 004 - Dange Shuni Central Health Center",
              "PU 005 - Dange Shuni Central Mosque"
            ]
          },
          "dange-shuni-east": {
            name: "Dange Shuni East",
            pollingUnits: [
              "PU 006 - Dange Shuni East Primary School",
              "PU 007 - Dange Shuni East Market",
              "PU 008 - Dange Shuni East Community Hall",
              "PU 009 - Dange Shuni East Health Center",
              "PU 010 - Dange Shuni East Mosque"
            ]
          },
          "dange-shuni-west": {
            name: "Dange Shuni West",
            pollingUnits: [
              "PU 011 - Dange Shuni West Primary School",
              "PU 012 - Dange Shuni West Market",
              "PU 013 - Dange Shuni West Community Hall",
              "PU 014 - Dange Shuni West Health Center",
              "PU 015 - Dange Shuni West Mosque"
            ]
          },
          "dange-shuni-north": {
            name: "Dange Shuni North",
            pollingUnits: [
              "PU 016 - Dange Shuni North Primary School",
              "PU 017 - Dange Shuni North Market",
              "PU 018 - Dange Shuni North Community Hall",
              "PU 019 - Dange Shuni North Health Center",
              "PU 020 - Dange Shuni North Mosque"
            ]
          },
          "dange-shuni-south": {
            name: "Dange Shuni South",
            pollingUnits: [
              "PU 021 - Dange Shuni South Primary School",
              "PU 022 - Dange Shuni South Market",
              "PU 023 - Dange Shuni South Community Hall",
              "PU 024 - Dange Shuni South Health Center",
              "PU 025 - Dange Shuni South Mosque"
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
              "PU 001 - Gada Central Market",
              "PU 002 - Gada Central Primary School",
              "PU 003 - Gada Central Community Hall",
              "PU 004 - Gada Central Health Center",
              "PU 005 - Gada Central Mosque"
            ]
          },
          "gada-east": {
            name: "Gada East",
            pollingUnits: [
              "PU 006 - Gada East Primary School",
              "PU 007 - Gada East Market",
              "PU 008 - Gada East Community Hall",
              "PU 009 - Gada East Health Center",
              "PU 010 - Gada East Mosque"
            ]
          },
          "gada-west": {
            name: "Gada West",
            pollingUnits: [
              "PU 011 - Gada West Primary School",
              "PU 012 - Gada West Market",
              "PU 013 - Gada West Community Hall",
              "PU 014 - Gada West Health Center",
              "PU 015 - Gada West Mosque"
            ]
          },
          "gada-north": {
            name: "Gada North",
            pollingUnits: [
              "PU 016 - Gada North Primary School",
              "PU 017 - Gada North Market",
              "PU 018 - Gada North Community Hall",
              "PU 019 - Gada North Health Center",
              "PU 020 - Gada North Mosque"
            ]
          },
          "gada-south": {
            name: "Gada South",
            pollingUnits: [
              "PU 021 - Gada South Primary School",
              "PU 022 - Gada South Market",
              "PU 023 - Gada South Community Hall",
              "PU 024 - Gada South Health Center",
              "PU 025 - Gada South Mosque"
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
              "PU 001 - Goronyo Central Market",
              "PU 002 - Goronyo Central Primary School",
              "PU 003 - Goronyo Central Community Hall",
              "PU 004 - Goronyo Central Health Center",
              "PU 005 - Goronyo Central Mosque"
            ]
          },
          "goronyo-east": {
            name: "Goronyo East",
            pollingUnits: [
              "PU 006 - Goronyo East Primary School",
              "PU 007 - Goronyo East Market",
              "PU 008 - Goronyo East Community Hall",
              "PU 009 - Goronyo East Health Center",
              "PU 010 - Goronyo East Mosque"
            ]
          },
          "goronyo-west": {
            name: "Goronyo West",
            pollingUnits: [
              "PU 011 - Goronyo West Primary School",
              "PU 012 - Goronyo West Market",
              "PU 013 - Goronyo West Community Hall",
              "PU 014 - Goronyo West Health Center",
              "PU 015 - Goronyo West Mosque"
            ]
          },
          "goronyo-north": {
            name: "Goronyo North",
            pollingUnits: [
              "PU 016 - Goronyo North Primary School",
              "PU 017 - Goronyo North Market",
              "PU 018 - Goronyo North Community Hall",
              "PU 019 - Goronyo North Health Center",
              "PU 020 - Goronyo North Mosque"
            ]
          },
          "goronyo-south": {
            name: "Goronyo South",
            pollingUnits: [
              "PU 021 - Goronyo South Primary School",
              "PU 022 - Goronyo South Market",
              "PU 023 - Goronyo South Community Hall",
              "PU 024 - Goronyo South Health Center",
              "PU 025 - Goronyo South Mosque"
            ]
          }
        }
      },
      "gudu": { name: "Gudu", wards: {} },
      "gwadabawa": { name: "Gwadabawa", wards: {} },
      "illela": { name: "Illela", wards: {} },
      "isa": { name: "Isa", wards: {} },
      "kebbe": { name: "Kebbe", wards: {} },
      "kware": { name: "Kware", wards: {} },
      "rabah": { name: "Rabah", wards: {} },
      "sabon-birni": { name: "Sabon Birni", wards: {} },
      "shagari": { name: "Shagari", wards: {} },
      "silame": { name: "Silame", wards: {} },
      "sokoto-north": { name: "Sokoto North", wards: {} },
      "sokoto-south": { name: "Sokoto South", wards: {} },
      "tambuwal": { name: "Tambuwal", wards: {} },
      "tangaza": { name: "Tangaza", wards: {} },
      "tureta": { name: "Tureta", wards: {} },
      "wamako": { name: "Wamako", wards: {} },
      "wurno": { name: "Wurno", wards: {} },
      "yabo": { name: "Yabo", wards: {} }
    }
  },
  oyo: {
    name: "Oyo",
    lgas: {
      "afijio": { 
        name: "Afijio", 
        wards: {
          "afijio-central": {
            name: "Afijio Central",
            pollingUnits: [
              "PU 001 - Afijio Central Market",
              "PU 002 - Afijio Central Primary School",
              "PU 003 - Afijio Central Community Hall",
              "PU 004 - Afijio Central Health Center",
              "PU 005 - Afijio Central Church"
            ]
          },
          "afijio-east": {
            name: "Afijio East",
            pollingUnits: [
              "PU 006 - Afijio East Primary School",
              "PU 007 - Afijio East Market",
              "PU 008 - Afijio East Community Hall",
              "PU 009 - Afijio East Health Center",
              "PU 010 - Afijio East Church"
            ]
          },
          "afijio-west": {
            name: "Afijio West",
            pollingUnits: [
              "PU 011 - Afijio West Primary School",
              "PU 012 - Afijio West Market",
              "PU 013 - Afijio West Community Hall",
              "PU 014 - Afijio West Health Center",
              "PU 015 - Afijio West Church"
            ]
          },
          "afijio-north": {
            name: "Afijio North",
            pollingUnits: [
              "PU 016 - Afijio North Primary School",
              "PU 017 - Afijio North Market",
              "PU 018 - Afijio North Community Hall",
              "PU 019 - Afijio North Health Center",
              "PU 020 - Afijio North Church"
            ]
          },
          "afijio-south": {
            name: "Afijio South",
            pollingUnits: [
              "PU 021 - Afijio South Primary School",
              "PU 022 - Afijio South Market",
              "PU 023 - Afijio South Community Hall",
              "PU 024 - Afijio South Health Center",
              "PU 025 - Afijio South Church"
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
              "PU 001 - Akinyele Central Market",
              "PU 002 - Akinyele Central Primary School",
              "PU 003 - Akinyele Central Community Hall",
              "PU 004 - Akinyele Central Health Center",
              "PU 005 - Akinyele Central Church"
            ]
          },
          "akinyele-east": {
            name: "Akinyele East",
            pollingUnits: [
              "PU 006 - Akinyele East Primary School",
              "PU 007 - Akinyele East Market",
              "PU 008 - Akinyele East Community Hall",
              "PU 009 - Akinyele East Health Center",
              "PU 010 - Akinyele East Church"
            ]
          },
          "akinyele-west": {
            name: "Akinyele West",
            pollingUnits: [
              "PU 011 - Akinyele West Primary School",
              "PU 012 - Akinyele West Market",
              "PU 013 - Akinyele West Community Hall",
              "PU 014 - Akinyele West Health Center",
              "PU 015 - Akinyele West Church"
            ]
          },
          "akinyele-north": {
            name: "Akinyele North",
            pollingUnits: [
              "PU 016 - Akinyele North Primary School",
              "PU 017 - Akinyele North Market",
              "PU 018 - Akinyele North Community Hall",
              "PU 019 - Akinyele North Health Center",
              "PU 020 - Akinyele North Church"
            ]
          },
          "akinyele-south": {
            name: "Akinyele South",
            pollingUnits: [
              "PU 021 - Akinyele South Primary School",
              "PU 022 - Akinyele South Market",
              "PU 023 - Akinyele South Community Hall",
              "PU 024 - Akinyele South Health Center",
              "PU 025 - Akinyele South Church"
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
              "PU 001 - Atiba Central Market",
              "PU 002 - Atiba Central Primary School",
              "PU 003 - Atiba Central Community Hall",
              "PU 004 - Atiba Central Health Center",
              "PU 005 - Atiba Central Church"
            ]
          },
          "atiba-east": {
            name: "Atiba East",
            pollingUnits: [
              "PU 006 - Atiba East Primary School",
              "PU 007 - Atiba East Market",
              "PU 008 - Atiba East Community Hall",
              "PU 009 - Atiba East Health Center",
              "PU 010 - Atiba East Church"
            ]
          },
          "atiba-west": {
            name: "Atiba West",
            pollingUnits: [
              "PU 011 - Atiba West Primary School",
              "PU 012 - Atiba West Market",
              "PU 013 - Atiba West Community Hall",
              "PU 014 - Atiba West Health Center",
              "PU 015 - Atiba West Church"
            ]
          },
          "atiba-north": {
            name: "Atiba North",
            pollingUnits: [
              "PU 016 - Atiba North Primary School",
              "PU 017 - Atiba North Market",
              "PU 018 - Atiba North Community Hall",
              "PU 019 - Atiba North Health Center",
              "PU 020 - Atiba North Church"
            ]
          },
          "atiba-south": {
            name: "Atiba South",
            pollingUnits: [
              "PU 021 - Atiba South Primary School",
              "PU 022 - Atiba South Market",
              "PU 023 - Atiba South Community Hall",
              "PU 024 - Atiba South Health Center",
              "PU 025 - Atiba South Church"
            ]
          }
        }
      },
      "atigbo": { 
        name: "Atigbo", 
        wards: {
          "atigbo-central": {
            name: "Atigbo Central",
            pollingUnits: [
              "PU 001 - Atigbo Central Market",
              "PU 002 - Atigbo Central Primary School",
              "PU 003 - Atigbo Central Community Hall",
              "PU 004 - Atigbo Central Health Center",
              "PU 005 - Atigbo Central Church"
            ]
          },
          "atigbo-east": {
            name: "Atigbo East",
            pollingUnits: [
              "PU 006 - Atigbo East Primary School",
              "PU 007 - Atigbo East Market",
              "PU 008 - Atigbo East Community Hall",
              "PU 009 - Atigbo East Health Center",
              "PU 010 - Atigbo East Church"
            ]
          },
          "atigbo-west": {
            name: "Atigbo West",
            pollingUnits: [
              "PU 011 - Atigbo West Primary School",
              "PU 012 - Atigbo West Market",
              "PU 013 - Atigbo West Community Hall",
              "PU 014 - Atigbo West Health Center",
              "PU 015 - Atigbo West Church"
            ]
          },
          "atigbo-north": {
            name: "Atigbo North",
            pollingUnits: [
              "PU 016 - Atigbo North Primary School",
              "PU 017 - Atigbo North Market",
              "PU 018 - Atigbo North Community Hall",
              "PU 019 - Atigbo North Health Center",
              "PU 020 - Atigbo North Church"
            ]
          },
          "atigbo-south": {
            name: "Atigbo South",
            pollingUnits: [
              "PU 021 - Atigbo South Primary School",
              "PU 022 - Atigbo South Market",
              "PU 023 - Atigbo South Community Hall",
              "PU 024 - Atigbo South Health Center",
              "PU 025 - Atigbo South Church"
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
              "PU 001 - Egbeda Central Market",
              "PU 002 - Egbeda Central Primary School",
              "PU 003 - Egbeda Central Community Hall",
              "PU 004 - Egbeda Central Health Center",
              "PU 005 - Egbeda Central Church"
            ]
          },
          "egbeda-east": {
            name: "Egbeda East",
            pollingUnits: [
              "PU 006 - Egbeda East Primary School",
              "PU 007 - Egbeda East Market",
              "PU 008 - Egbeda East Community Hall",
              "PU 009 - Egbeda East Health Center",
              "PU 010 - Egbeda East Church"
            ]
          },
          "egbeda-west": {
            name: "Egbeda West",
            pollingUnits: [
              "PU 011 - Egbeda West Primary School",
              "PU 012 - Egbeda West Market",
              "PU 013 - Egbeda West Community Hall",
              "PU 014 - Egbeda West Health Center",
              "PU 015 - Egbeda West Church"
            ]
          },
          "egbeda-north": {
            name: "Egbeda North",
            pollingUnits: [
              "PU 016 - Egbeda North Primary School",
              "PU 017 - Egbeda North Market",
              "PU 018 - Egbeda North Community Hall",
              "PU 019 - Egbeda North Health Center",
              "PU 020 - Egbeda North Church"
            ]
          },
          "egbeda-south": {
            name: "Egbeda South",
            pollingUnits: [
              "PU 021 - Egbeda South Primary School",
              "PU 022 - Egbeda South Market",
              "PU 023 - Egbeda South Community Hall",
              "PU 024 - Egbeda South Health Center",
              "PU 025 - Egbeda South Church"
            ]
          }
        }
      },
      "ibadan-central": { name: "Ibadan Central", wards: {} },
      "ibadan-east": { name: "Ibadan East", wards: {} },
      "ibadan-north": { name: "Ibadan North", wards: {} },
      "ibadan-north-east": { name: "Ibadan North East", wards: {} },
      "ibadan-north-west": { name: "Ibadan North West", wards: {} },
      "ibadan-south-east": { name: "Ibadan South East", wards: {} },
      "ibadan-south-west": { name: "Ibadan South West", wards: {} },
      "irepo": { name: "Irepo", wards: {} },
      "isheyin": { name: "Isheyin", wards: {} },
      "itesiwaju": { name: "Itesiwaju", wards: {} },
      "iwajowa": { name: "Iwajowa", wards: {} },
      "kajola": { name: "Kajola", wards: {} },
      "lagelu": { name: "Lagelu", wards: {} },
      "ogbomosho-north": { name: "Ogbomosho North", wards: {} },
      "ogbomosho-south": { name: "Ogbomosho South", wards: {} },
      "oyo-east": { name: "Oyo East", wards: {} },
      "oyo-west": { name: "Oyo West", wards: {} },
      "saki-east": { name: "Saki East", wards: {} },
      "saki-west": { name: "Saki West", wards: {} },
      "surulere": { name: "Surulere", wards: {} }
    }
  },
  osun: {
    name: "Osun",
    lgas: {
      "ayedaade": { 
        name: "Ayedaade", 
        wards: {
          "ayedaade-central": {
            name: "Ayedaade Central",
            pollingUnits: [
              "PU 001 - Ayedaade Central Market",
              "PU 002 - Ayedaade Central Primary School",
              "PU 003 - Ayedaade Central Community Hall",
              "PU 004 - Ayedaade Central Health Center",
              "PU 005 - Ayedaade Central Church"
            ]
          },
          "ayedaade-east": {
            name: "Ayedaade East",
            pollingUnits: [
              "PU 006 - Ayedaade East Primary School",
              "PU 007 - Ayedaade East Market",
              "PU 008 - Ayedaade East Community Hall",
              "PU 009 - Ayedaade East Health Center",
              "PU 010 - Ayedaade East Church"
            ]
          },
          "ayedaade-west": {
            name: "Ayedaade West",
            pollingUnits: [
              "PU 011 - Ayedaade West Primary School",
              "PU 012 - Ayedaade West Market",
              "PU 013 - Ayedaade West Community Hall",
              "PU 014 - Ayedaade West Health Center",
              "PU 015 - Ayedaade West Church"
            ]
          },
          "ayedaade-north": {
            name: "Ayedaade North",
            pollingUnits: [
              "PU 016 - Ayedaade North Primary School",
              "PU 017 - Ayedaade North Market",
              "PU 018 - Ayedaade North Community Hall",
              "PU 019 - Ayedaade North Health Center",
              "PU 020 - Ayedaade North Church"
            ]
          },
          "ayedaade-south": {
            name: "Ayedaade South",
            pollingUnits: [
              "PU 021 - Ayedaade South Primary School",
              "PU 022 - Ayedaade South Market",
              "PU 023 - Ayedaade South Community Hall",
              "PU 024 - Ayedaade South Health Center",
              "PU 025 - Ayedaade South Church"
            ]
          }
        }
      },
      "ayedire": { 
        name: "Ayedire", 
        wards: {
          "ayedire-central": {
            name: "Ayedire Central",
            pollingUnits: [
              "PU 001 - Ayedire Central Market",
              "PU 002 - Ayedire Central Primary School",
              "PU 003 - Ayedire Central Community Hall",
              "PU 004 - Ayedire Central Health Center",
              "PU 005 - Ayedire Central Church"
            ]
          },
          "ayedire-east": {
            name: "Ayedire East",
            pollingUnits: [
              "PU 006 - Ayedire East Primary School",
              "PU 007 - Ayedire East Market",
              "PU 008 - Ayedire East Community Hall",
              "PU 009 - Ayedire East Health Center",
              "PU 010 - Ayedire East Church"
            ]
          },
          "ayedire-west": {
            name: "Ayedire West",
            pollingUnits: [
              "PU 011 - Ayedire West Primary School",
              "PU 012 - Ayedire West Market",
              "PU 013 - Ayedire West Community Hall",
              "PU 014 - Ayedire West Health Center",
              "PU 015 - Ayedire West Church"
            ]
          },
          "ayedire-north": {
            name: "Ayedire North",
            pollingUnits: [
              "PU 016 - Ayedire North Primary School",
              "PU 017 - Ayedire North Market",
              "PU 018 - Ayedire North Community Hall",
              "PU 019 - Ayedire North Health Center",
              "PU 020 - Ayedire North Church"
            ]
          },
          "ayedire-south": {
            name: "Ayedire South",
            pollingUnits: [
              "PU 021 - Ayedire South Primary School",
              "PU 022 - Ayedire South Market",
              "PU 023 - Ayedire South Community Hall",
              "PU 024 - Ayedire South Health Center",
              "PU 025 - Ayedire South Church"
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
              "PU 001 - Atakumosa East Central Market",
              "PU 002 - Atakumosa East Central Primary School",
              "PU 003 - Atakumosa East Central Community Hall",
              "PU 004 - Atakumosa East Central Health Center",
              "PU 005 - Atakumosa East Central Church"
            ]
          },
          "atakumosa-east-east": {
            name: "Atakumosa East East",
            pollingUnits: [
              "PU 006 - Atakumosa East East Primary School",
              "PU 007 - Atakumosa East East Market",
              "PU 008 - Atakumosa East East Community Hall",
              "PU 009 - Atakumosa East East Health Center",
              "PU 010 - Atakumosa East East Church"
            ]
          },
          "atakumosa-east-west": {
            name: "Atakumosa East West",
            pollingUnits: [
              "PU 011 - Atakumosa East West Primary School",
              "PU 012 - Atakumosa East West Market",
              "PU 013 - Atakumosa East West Community Hall",
              "PU 014 - Atakumosa East West Health Center",
              "PU 015 - Atakumosa East West Church"
            ]
          },
          "atakumosa-east-north": {
            name: "Atakumosa East North",
            pollingUnits: [
              "PU 016 - Atakumosa East North Primary School",
              "PU 017 - Atakumosa East North Market",
              "PU 018 - Atakumosa East North Community Hall",
              "PU 019 - Atakumosa East North Health Center",
              "PU 020 - Atakumosa East North Church"
            ]
          },
          "atakumosa-east-south": {
            name: "Atakumosa East South",
            pollingUnits: [
              "PU 021 - Atakumosa East South Primary School",
              "PU 022 - Atakumosa East South Market",
              "PU 023 - Atakumosa East South Community Hall",
              "PU 024 - Atakumosa East South Health Center",
              "PU 025 - Atakumosa East South Church"
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
              "PU 001 - Atakumosa West Central Market",
              "PU 002 - Atakumosa West Central Primary School",
              "PU 003 - Atakumosa West Central Community Hall",
              "PU 004 - Atakumosa West Central Health Center",
              "PU 005 - Atakumosa West Central Church"
            ]
          },
          "atakumosa-west-east": {
            name: "Atakumosa West East",
            pollingUnits: [
              "PU 006 - Atakumosa West East Primary School",
              "PU 007 - Atakumosa West East Market",
              "PU 008 - Atakumosa West East Community Hall",
              "PU 009 - Atakumosa West East Health Center",
              "PU 010 - Atakumosa West East Church"
            ]
          },
          "atakumosa-west-west": {
            name: "Atakumosa West West",
            pollingUnits: [
              "PU 011 - Atakumosa West West Primary School",
              "PU 012 - Atakumosa West West Market",
              "PU 013 - Atakumosa West West Community Hall",
              "PU 014 - Atakumosa West West Health Center",
              "PU 015 - Atakumosa West West Church"
            ]
          },
          "atakumosa-west-north": {
            name: "Atakumosa West North",
            pollingUnits: [
              "PU 016 - Atakumosa West North Primary School",
              "PU 017 - Atakumosa West North Market",
              "PU 018 - Atakumosa West North Community Hall",
              "PU 019 - Atakumosa West North Health Center",
              "PU 020 - Atakumosa West North Church"
            ]
          },
          "atakumosa-west-south": {
            name: "Atakumosa West South",
            pollingUnits: [
              "PU 021 - Atakumosa West South Primary School",
              "PU 022 - Atakumosa West South Market",
              "PU 023 - Atakumosa West South Community Hall",
              "PU 024 - Atakumosa West South Health Center",
              "PU 025 - Atakumosa West South Church"
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
              "PU 001 - Boluwaduro Central Market",
              "PU 002 - Boluwaduro Central Primary School",
              "PU 003 - Boluwaduro Central Community Hall",
              "PU 004 - Boluwaduro Central Health Center",
              "PU 005 - Boluwaduro Central Church"
            ]
          },
          "boluwaduro-east": {
            name: "Boluwaduro East",
            pollingUnits: [
              "PU 006 - Boluwaduro East Primary School",
              "PU 007 - Boluwaduro East Market",
              "PU 008 - Boluwaduro East Community Hall",
              "PU 009 - Boluwaduro East Health Center",
              "PU 010 - Boluwaduro East Church"
            ]
          },
          "boluwaduro-west": {
            name: "Boluwaduro West",
            pollingUnits: [
              "PU 011 - Boluwaduro West Primary School",
              "PU 012 - Boluwaduro West Market",
              "PU 013 - Boluwaduro West Community Hall",
              "PU 014 - Boluwaduro West Health Center",
              "PU 015 - Boluwaduro West Church"
            ]
          },
          "boluwaduro-north": {
            name: "Boluwaduro North",
            pollingUnits: [
              "PU 016 - Boluwaduro North Primary School",
              "PU 017 - Boluwaduro North Market",
              "PU 018 - Boluwaduro North Community Hall",
              "PU 019 - Boluwaduro North Health Center",
              "PU 020 - Boluwaduro North Church"
            ]
          },
          "boluwaduro-south": {
            name: "Boluwaduro South",
            pollingUnits: [
              "PU 021 - Boluwaduro South Primary School",
              "PU 022 - Boluwaduro South Market",
              "PU 023 - Boluwaduro South Community Hall",
              "PU 024 - Boluwaduro South Health Center",
              "PU 025 - Boluwaduro South Church"
            ]
          }
        }
      },
      "boripe": { name: "Boripe", wards: {} },
      "ede-north": { name: "Ede North", wards: {} },
      "ede-south": { name: "Ede South", wards: {} },
      "egbedore": { name: "Egbedore", wards: {} },
      "ejigbo": { name: "Ejigbo", wards: {} },
      "ife-central": { name: "Ife Central", wards: {} },
      "ife-east": { name: "Ife East", wards: {} },
      "ife-north": { name: "Ife North", wards: {} },
      "ife-south": { name: "Ife South", wards: {} },
      "ilesa-east": { name: "Ilesa East", wards: {} },
      "ilesa-west": { name: "Ilesa West", wards: {} },
      "irepodun": { name: "Irepodun", wards: {} },
      "irewole": { name: "Irewole", wards: {} },
      "isokan": { name: "Isokan", wards: {} },
      "iwedun": { name: "Iwedun", wards: {} },
      "iyedaade": { name: "Iyedaade", wards: {} },
      "obokun": { name: "Obokun", wards: {} },
      "ode-otun": { name: "Ode Otun", wards: {} },
      "ola-oluwa": { name: "Ola Oluwa", wards: {} },
      "olorunda": { name: "Olorunda", wards: {} },
      "oriade": { name: "Oriade", wards: {} },
      "osogbo": { name: "Osogbo", wards: {} }
    }
  },
  ondo: {
    name: "Ondo",
    lgas: {
      "akoko-north-east": { 
        name: "Akoko North East", 
        wards: {
          "akoko-north-east-central": {
            name: "Akoko North East Central",
            pollingUnits: [
              "PU 001 - Akoko North East Central Market",
              "PU 002 - Akoko North East Central Primary School",
              "PU 003 - Akoko North East Central Community Hall",
              "PU 004 - Akoko North East Central Health Center",
              "PU 005 - Akoko North East Central Church"
            ]
          },
          "akoko-north-east-east": {
            name: "Akoko North East East",
            pollingUnits: [
              "PU 006 - Akoko North East East Primary School",
              "PU 007 - Akoko North East East Market",
              "PU 008 - Akoko North East East Community Hall",
              "PU 009 - Akoko North East East Health Center",
              "PU 010 - Akoko North East East Church"
            ]
          },
          "akoko-north-east-west": {
            name: "Akoko North East West",
            pollingUnits: [
              "PU 011 - Akoko North East West Primary School",
              "PU 012 - Akoko North East West Market",
              "PU 013 - Akoko North East West Community Hall",
              "PU 014 - Akoko North East West Health Center",
              "PU 015 - Akoko North East West Church"
            ]
          },
          "akoko-north-east-north": {
            name: "Akoko North East North",
            pollingUnits: [
              "PU 016 - Akoko North East North Primary School",
              "PU 017 - Akoko North East North Market",
              "PU 018 - Akoko North East North Community Hall",
              "PU 019 - Akoko North East North Health Center",
              "PU 020 - Akoko North East North Church"
            ]
          },
          "akoko-north-east-south": {
            name: "Akoko North East South",
            pollingUnits: [
              "PU 021 - Akoko North East South Primary School",
              "PU 022 - Akoko North East South Market",
              "PU 023 - Akoko North East South Community Hall",
              "PU 024 - Akoko North East South Health Center",
              "PU 025 - Akoko North East South Church"
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
              "PU 001 - Akoko North West Central Market",
              "PU 002 - Akoko North West Central Primary School",
              "PU 003 - Akoko North West Central Community Hall",
              "PU 004 - Akoko North West Central Health Center",
              "PU 005 - Akoko North West Central Church"
            ]
          },
          "akoko-north-west-east": {
            name: "Akoko North West East",
            pollingUnits: [
              "PU 006 - Akoko North West East Primary School",
              "PU 007 - Akoko North West East Market",
              "PU 008 - Akoko North West East Community Hall",
              "PU 009 - Akoko North West East Health Center",
              "PU 010 - Akoko North West East Church"
            ]
          },
          "akoko-north-west-west": {
            name: "Akoko North West West",
            pollingUnits: [
              "PU 011 - Akoko North West West Primary School",
              "PU 012 - Akoko North West West Market",
              "PU 013 - Akoko North West West Community Hall",
              "PU 014 - Akoko North West West Health Center",
              "PU 015 - Akoko North West West Church"
            ]
          },
          "akoko-north-west-north": {
            name: "Akoko North West North",
            pollingUnits: [
              "PU 016 - Akoko North West North Primary School",
              "PU 017 - Akoko North West North Market",
              "PU 018 - Akoko North West North Community Hall",
              "PU 019 - Akoko North West North Health Center",
              "PU 020 - Akoko North West North Church"
            ]
          },
          "akoko-north-west-south": {
            name: "Akoko North West South",
            pollingUnits: [
              "PU 021 - Akoko North West South Primary School",
              "PU 022 - Akoko North West South Market",
              "PU 023 - Akoko North West South Community Hall",
              "PU 024 - Akoko North West South Health Center",
              "PU 025 - Akoko North West South Church"
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
              "PU 001 - Akoko South East Central Market",
              "PU 002 - Akoko South East Central Primary School",
              "PU 003 - Akoko South East Central Community Hall",
              "PU 004 - Akoko South East Central Health Center",
              "PU 005 - Akoko South East Central Church"
            ]
          },
          "akoko-south-east-east": {
            name: "Akoko South East East",
            pollingUnits: [
              "PU 006 - Akoko South East East Primary School",
              "PU 007 - Akoko South East East Market",
              "PU 008 - Akoko South East East Community Hall",
              "PU 009 - Akoko South East East Health Center",
              "PU 010 - Akoko South East East Church"
            ]
          },
          "akoko-south-east-west": {
            name: "Akoko South East West",
            pollingUnits: [
              "PU 011 - Akoko South East West Primary School",
              "PU 012 - Akoko South East West Market",
              "PU 013 - Akoko South East West Community Hall",
              "PU 014 - Akoko South East West Health Center",
              "PU 015 - Akoko South East West Church"
            ]
          },
          "akoko-south-east-north": {
            name: "Akoko South East North",
            pollingUnits: [
              "PU 016 - Akoko South East North Primary School",
              "PU 017 - Akoko South East North Market",
              "PU 018 - Akoko South East North Community Hall",
              "PU 019 - Akoko South East North Health Center",
              "PU 020 - Akoko South East North Church"
            ]
          },
          "akoko-south-east-south": {
            name: "Akoko South East South",
            pollingUnits: [
              "PU 021 - Akoko South East South Primary School",
              "PU 022 - Akoko South East South Market",
              "PU 023 - Akoko South East South Community Hall",
              "PU 024 - Akoko South East South Health Center",
              "PU 025 - Akoko South East South Church"
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
              "PU 001 - Akoko South West Central Market",
              "PU 002 - Akoko South West Central Primary School",
              "PU 003 - Akoko South West Central Community Hall",
              "PU 004 - Akoko South West Central Health Center",
              "PU 005 - Akoko South West Central Church"
            ]
          },
          "akoko-south-west-east": {
            name: "Akoko South West East",
            pollingUnits: [
              "PU 006 - Akoko South West East Primary School",
              "PU 007 - Akoko South West East Market",
              "PU 008 - Akoko South West East Community Hall",
              "PU 009 - Akoko South West East Health Center",
              "PU 010 - Akoko South West East Church"
            ]
          },
          "akoko-south-west-west": {
            name: "Akoko South West West",
            pollingUnits: [
              "PU 011 - Akoko South West West Primary School",
              "PU 012 - Akoko South West West Market",
              "PU 013 - Akoko South West West Community Hall",
              "PU 014 - Akoko South West West Health Center",
              "PU 015 - Akoko South West West Church"
            ]
          },
          "akoko-south-west-north": {
            name: "Akoko South West North",
            pollingUnits: [
              "PU 016 - Akoko South West North Primary School",
              "PU 017 - Akoko South West North Market",
              "PU 018 - Akoko South West North Community Hall",
              "PU 019 - Akoko South West North Health Center",
              "PU 020 - Akoko South West North Church"
            ]
          },
          "akoko-south-west-south": {
            name: "Akoko South West South",
            pollingUnits: [
              "PU 021 - Akoko South West South Primary School",
              "PU 022 - Akoko South West South Market",
              "PU 023 - Akoko South West South Community Hall",
              "PU 024 - Akoko South West South Health Center",
              "PU 025 - Akoko South West South Church"
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
              "PU 001 - Akure North Central Market",
              "PU 002 - Akure North Central Primary School",
              "PU 003 - Akure North Central Community Hall",
              "PU 004 - Akure North Central Health Center",
              "PU 005 - Akure North Central Church"
            ]
          },
          "akure-north-east": {
            name: "Akure North East",
            pollingUnits: [
              "PU 006 - Akure North East Primary School",
              "PU 007 - Akure North East Market",
              "PU 008 - Akure North East Community Hall",
              "PU 009 - Akure North East Health Center",
              "PU 010 - Akure North East Church"
            ]
          },
          "akure-north-west": {
            name: "Akure North West",
            pollingUnits: [
              "PU 011 - Akure North West Primary School",
              "PU 012 - Akure North West Market",
              "PU 013 - Akure North West Community Hall",
              "PU 014 - Akure North West Health Center",
              "PU 015 - Akure North West Church"
            ]
          },
          "akure-north-north": {
            name: "Akure North North",
            pollingUnits: [
              "PU 016 - Akure North North Primary School",
              "PU 017 - Akure North North Market",
              "PU 018 - Akure North North Community Hall",
              "PU 019 - Akure North North Health Center",
              "PU 020 - Akure North North Church"
            ]
          },
          "akure-north-south": {
            name: "Akure North South",
            pollingUnits: [
              "PU 021 - Akure North South Primary School",
              "PU 022 - Akure North South Market",
              "PU 023 - Akure North South Community Hall",
              "PU 024 - Akure North South Health Center",
              "PU 025 - Akure North South Church"
            ]
          }
        }
      },
      "akure-south": { name: "Akure South", wards: {} },
      "ese-odo": { name: "Ese Odo", wards: {} },
      "idanre": { name: "Idanre", wards: {} },
      "ifedore": { name: "Ifedore", wards: {} },
      "ilaje": { name: "Ilaje", wards: {} },
      "ile-oluji-okegbo": { name: "Ile Oluji Okegbo", wards: {} },
      "irele": { name: "Irele", wards: {} },
      "odigbo": { name: "Odigbo", wards: {} },
      "okitipupa": { name: "Okitipupa", wards: {} },
      "ondo-east": { name: "Ondo East", wards: {} },
      "ondo-west": { name: "Ondo West", wards: {} },
      "ose": { name: "Ose", wards: {} },
      "owo": { name: "Owo", wards: {} }
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
              "PU 005 - Abeokuta North Central Church"
            ]
          },
          "abeokuta-north-east": {
            name: "Abeokuta North East",
            pollingUnits: [
              "PU 006 - Abeokuta North East Primary School",
              "PU 007 - Abeokuta North East Market",
              "PU 008 - Abeokuta North East Community Hall",
              "PU 009 - Abeokuta North East Health Center",
              "PU 010 - Abeokuta North East Church"
            ]
          },
          "abeokuta-north-west": {
            name: "Abeokuta North West",
            pollingUnits: [
              "PU 011 - Abeokuta North West Primary School",
              "PU 012 - Abeokuta North West Market",
              "PU 013 - Abeokuta North West Community Hall",
              "PU 014 - Abeokuta North West Health Center",
              "PU 015 - Abeokuta North West Church"
            ]
          },
          "abeokuta-north-north": {
            name: "Abeokuta North North",
            pollingUnits: [
              "PU 016 - Abeokuta North North Primary School",
              "PU 017 - Abeokuta North North Market",
              "PU 018 - Abeokuta North North Community Hall",
              "PU 019 - Abeokuta North North Health Center",
              "PU 020 - Abeokuta North North Church"
            ]
          },
          "abeokuta-north-south": {
            name: "Abeokuta North South",
            pollingUnits: [
              "PU 021 - Abeokuta North South Primary School",
              "PU 022 - Abeokuta North South Market",
              "PU 023 - Abeokuta North South Community Hall",
              "PU 024 - Abeokuta North South Health Center",
              "PU 025 - Abeokuta North South Church"
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
              "PU 001 - Abeokuta South Central Market",
              "PU 002 - Abeokuta South Central Primary School",
              "PU 003 - Abeokuta South Central Community Hall",
              "PU 004 - Abeokuta South Central Health Center",
              "PU 005 - Abeokuta South Central Church"
            ]
          },
          "abeokuta-south-east": {
            name: "Abeokuta South East",
            pollingUnits: [
              "PU 006 - Abeokuta South East Primary School",
              "PU 007 - Abeokuta South East Market",
              "PU 008 - Abeokuta South East Community Hall",
              "PU 009 - Abeokuta South East Health Center",
              "PU 010 - Abeokuta South East Church"
            ]
          },
          "abeokuta-south-west": {
            name: "Abeokuta South West",
            pollingUnits: [
              "PU 011 - Abeokuta South West Primary School",
              "PU 012 - Abeokuta South West Market",
              "PU 013 - Abeokuta South West Community Hall",
              "PU 014 - Abeokuta South West Health Center",
              "PU 015 - Abeokuta South West Church"
            ]
          },
          "abeokuta-south-north": {
            name: "Abeokuta South North",
            pollingUnits: [
              "PU 016 - Abeokuta South North Primary School",
              "PU 017 - Abeokuta South North Market",
              "PU 018 - Abeokuta South North Community Hall",
              "PU 019 - Abeokuta South North Health Center",
              "PU 020 - Abeokuta South North Church"
            ]
          },
          "abeokuta-south-south": {
            name: "Abeokuta South South",
            pollingUnits: [
              "PU 021 - Abeokuta South South Primary School",
              "PU 022 - Abeokuta South South Market",
              "PU 023 - Abeokuta South South Community Hall",
              "PU 024 - Abeokuta South South Health Center",
              "PU 025 - Abeokuta South South Church"
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
              "PU 001 - Adoodo Ota Central Market",
              "PU 002 - Adoodo Ota Central Primary School",
              "PU 003 - Adoodo Ota Central Community Hall",
              "PU 004 - Adoodo Ota Central Health Center",
              "PU 005 - Adoodo Ota Central Church"
            ]
          },
          "adoodo-ota-east": {
            name: "Adoodo Ota East",
            pollingUnits: [
              "PU 006 - Adoodo Ota East Primary School",
              "PU 007 - Adoodo Ota East Market",
              "PU 008 - Adoodo Ota East Community Hall",
              "PU 009 - Adoodo Ota East Health Center",
              "PU 010 - Adoodo Ota East Church"
            ]
          },
          "adoodo-ota-west": {
            name: "Adoodo Ota West",
            pollingUnits: [
              "PU 011 - Adoodo Ota West Primary School",
              "PU 012 - Adoodo Ota West Market",
              "PU 013 - Adoodo Ota West Community Hall",
              "PU 014 - Adoodo Ota West Health Center",
              "PU 015 - Adoodo Ota West Church"
            ]
          },
          "adoodo-ota-north": {
            name: "Adoodo Ota North",
            pollingUnits: [
              "PU 016 - Adoodo Ota North Primary School",
              "PU 017 - Adoodo Ota North Market",
              "PU 018 - Adoodo Ota North Community Hall",
              "PU 019 - Adoodo Ota North Health Center",
              "PU 020 - Adoodo Ota North Church"
            ]
          },
          "adoodo-ota-south": {
            name: "Adoodo Ota South",
            pollingUnits: [
              "PU 021 - Adoodo Ota South Primary School",
              "PU 022 - Adoodo Ota South Market",
              "PU 023 - Adoodo Ota South Community Hall",
              "PU 024 - Adoodo Ota South Health Center",
              "PU 025 - Adoodo Ota South Church"
            ]
          }
        }
      },
      "egbado-north": { 
        name: "Egbado North", 
        wards: {
          "egbado-north-central": {
            name: "Egbado North Central",
            pollingUnits: [
              "PU 001 - Egbado North Central Market",
              "PU 002 - Egbado North Central Primary School",
              "PU 003 - Egbado North Central Community Hall",
              "PU 004 - Egbado North Central Health Center",
              "PU 005 - Egbado North Central Church"
            ]
          },
          "egbado-north-east": {
            name: "Egbado North East",
            pollingUnits: [
              "PU 006 - Egbado North East Primary School",
              "PU 007 - Egbado North East Market",
              "PU 008 - Egbado North East Community Hall",
              "PU 009 - Egbado North East Health Center",
              "PU 010 - Egbado North East Church"
            ]
          },
          "egbado-north-west": {
            name: "Egbado North West",
            pollingUnits: [
              "PU 011 - Egbado North West Primary School",
              "PU 012 - Egbado North West Market",
              "PU 013 - Egbado North West Community Hall",
              "PU 014 - Egbado North West Health Center",
              "PU 015 - Egbado North West Church"
            ]
          },
          "egbado-north-north": {
            name: "Egbado North North",
            pollingUnits: [
              "PU 016 - Egbado North North Primary School",
              "PU 017 - Egbado North North Market",
              "PU 018 - Egbado North North Community Hall",
              "PU 019 - Egbado North North Health Center",
              "PU 020 - Egbado North North Church"
            ]
          },
          "egbado-north-south": {
            name: "Egbado North South",
            pollingUnits: [
              "PU 021 - Egbado North South Primary School",
              "PU 022 - Egbado North South Market",
              "PU 023 - Egbado North South Community Hall",
              "PU 024 - Egbado North South Health Center",
              "PU 025 - Egbado North South Church"
            ]
          }
        }
      },
      "egbado-south": { 
        name: "Egbado South", 
        wards: {
          "egbado-south-central": {
            name: "Egbado South Central",
            pollingUnits: [
              "PU 001 - Egbado South Central Market",
              "PU 002 - Egbado South Central Primary School",
              "PU 003 - Egbado South Central Community Hall",
              "PU 004 - Egbado South Central Health Center",
              "PU 005 - Egbado South Central Church"
            ]
          },
          "egbado-south-east": {
            name: "Egbado South East",
            pollingUnits: [
              "PU 006 - Egbado South East Primary School",
              "PU 007 - Egbado South East Market",
              "PU 008 - Egbado South East Community Hall",
              "PU 009 - Egbado South East Health Center",
              "PU 010 - Egbado South East Church"
            ]
          },
          "egbado-south-west": {
            name: "Egbado South West",
            pollingUnits: [
              "PU 011 - Egbado South West Primary School",
              "PU 012 - Egbado South West Market",
              "PU 013 - Egbado South West Community Hall",
              "PU 014 - Egbado South West Health Center",
              "PU 015 - Egbado South West Church"
            ]
          },
          "egbado-south-north": {
            name: "Egbado South North",
            pollingUnits: [
              "PU 016 - Egbado South North Primary School",
              "PU 017 - Egbado South North Market",
              "PU 018 - Egbado South North Community Hall",
              "PU 019 - Egbado South North Health Center",
              "PU 020 - Egbado South North Church"
            ]
          },
          "egbado-south-south": {
            name: "Egbado South South",
            pollingUnits: [
              "PU 021 - Egbado South South Primary School",
              "PU 022 - Egbado South South Market",
              "PU 023 - Egbado South South Community Hall",
              "PU 024 - Egbado South South Health Center",
              "PU 025 - Egbado South South Church"
            ]
          }
        }
      },
      "ijebu-east": { name: "Ijebu East", wards: {} },
      "ijebu-north": { name: "Ijebu North", wards: {} },
      "ijebu-north-east": { name: "Ijebu North East", wards: {} },
      "ijebu-ode": { name: "Ijebu Ode", wards: {} },
      "ikenne": { name: "Ikenne", wards: {} },
      "ipokia": { name: "Ipokia", wards: {} },
      "obafemi-owode": { name: "Obafemi Owode", wards: {} },
      "odeda": { name: "Odeda", wards: {} },
      "odogbolu": { name: "Odogbolu", wards: {} },
      "remo-north": { name: "Remo North", wards: {} },
      "shagamu": { name: "Shagamu", wards: {} },
      "yewa-north": { name: "Yewa North", wards: {} },
      "yewa-south": { name: "Yewa South", wards: {} }
    }
  },
  niger: {
    name: "Niger",
    lgas: {
      "agwara": { 
        name: "Agwara", 
        wards: {
          "agwara-central": {
            name: "Agwara Central",
            pollingUnits: [
              "PU 001 - Agwara Central Market",
              "PU 002 - Agwara Central Primary School",
              "PU 003 - Agwara Central Community Hall",
              "PU 004 - Agwara Central Health Center",
              "PU 005 - Agwara Central Mosque"
            ]
          },
          "agwara-east": {
            name: "Agwara East",
            pollingUnits: [
              "PU 006 - Agwara East Primary School",
              "PU 007 - Agwara East Market",
              "PU 008 - Agwara East Community Hall",
              "PU 009 - Agwara East Health Center",
              "PU 010 - Agwara East Mosque"
            ]
          },
          "agwara-west": {
            name: "Agwara West",
            pollingUnits: [
              "PU 011 - Agwara West Primary School",
              "PU 012 - Agwara West Market",
              "PU 013 - Agwara West Community Hall",
              "PU 014 - Agwara West Health Center",
              "PU 015 - Agwara West Mosque"
            ]
          },
          "agwara-north": {
            name: "Agwara North",
            pollingUnits: [
              "PU 016 - Agwara North Primary School",
              "PU 017 - Agwara North Market",
              "PU 018 - Agwara North Community Hall",
              "PU 019 - Agwara North Health Center",
              "PU 020 - Agwara North Mosque"
            ]
          },
          "agwara-south": {
            name: "Agwara South",
            pollingUnits: [
              "PU 021 - Agwara South Primary School",
              "PU 022 - Agwara South Market",
              "PU 023 - Agwara South Community Hall",
              "PU 024 - Agwara South Health Center",
              "PU 025 - Agwara South Mosque"
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
              "PU 001 - Bida Central Market",
              "PU 002 - Bida Central Primary School",
              "PU 003 - Bida Central Community Hall",
              "PU 004 - Bida Central Health Center",
              "PU 005 - Bida Central Mosque"
            ]
          },
          "bida-east": {
            name: "Bida East",
            pollingUnits: [
              "PU 006 - Bida East Primary School",
              "PU 007 - Bida East Market",
              "PU 008 - Bida East Community Hall",
              "PU 009 - Bida East Health Center",
              "PU 010 - Bida East Mosque"
            ]
          },
          "bida-west": {
            name: "Bida West",
            pollingUnits: [
              "PU 011 - Bida West Primary School",
              "PU 012 - Bida West Market",
              "PU 013 - Bida West Community Hall",
              "PU 014 - Bida West Health Center",
              "PU 015 - Bida West Mosque"
            ]
          },
          "bida-north": {
            name: "Bida North",
            pollingUnits: [
              "PU 016 - Bida North Primary School",
              "PU 017 - Bida North Market",
              "PU 018 - Bida North Community Hall",
              "PU 019 - Bida North Health Center",
              "PU 020 - Bida North Mosque"
            ]
          },
          "bida-south": {
            name: "Bida South",
            pollingUnits: [
              "PU 021 - Bida South Primary School",
              "PU 022 - Bida South Market",
              "PU 023 - Bida South Community Hall",
              "PU 024 - Bida South Health Center",
              "PU 025 - Bida South Mosque"
            ]
          }
        }
      },
      "borgu": { 
        name: "Borgu", 
        wards: {
          "borgu-central": {
            name: "Borgu Central",
            pollingUnits: [
              "PU 001 - Borgu Central Market",
              "PU 002 - Borgu Central Primary School",
              "PU 003 - Borgu Central Community Hall",
              "PU 004 - Borgu Central Health Center",
              "PU 005 - Borgu Central Mosque"
            ]
          },
          "borgu-east": {
            name: "Borgu East",
            pollingUnits: [
              "PU 006 - Borgu East Primary School",
              "PU 007 - Borgu East Market",
              "PU 008 - Borgu East Community Hall",
              "PU 009 - Borgu East Health Center",
              "PU 010 - Borgu East Mosque"
            ]
          },
          "borgu-west": {
            name: "Borgu West",
            pollingUnits: [
              "PU 011 - Borgu West Primary School",
              "PU 012 - Borgu West Market",
              "PU 013 - Borgu West Community Hall",
              "PU 014 - Borgu West Health Center",
              "PU 015 - Borgu West Mosque"
            ]
          },
          "borgu-north": {
            name: "Borgu North",
            pollingUnits: [
              "PU 016 - Borgu North Primary School",
              "PU 017 - Borgu North Market",
              "PU 018 - Borgu North Community Hall",
              "PU 019 - Borgu North Health Center",
              "PU 020 - Borgu North Mosque"
            ]
          },
          "borgu-south": {
            name: "Borgu South",
            pollingUnits: [
              "PU 021 - Borgu South Primary School",
              "PU 022 - Borgu South Market",
              "PU 023 - Borgu South Community Hall",
              "PU 024 - Borgu South Health Center",
              "PU 025 - Borgu South Mosque"
            ]
          }
        }
      },
      "bosso": { 
        name: "Bosso", 
        wards: {
          "bosso-central": {
            name: "Bosso Central",
            pollingUnits: [
              "PU 001 - Bosso Central Market",
              "PU 002 - Bosso Central Primary School",
              "PU 003 - Bosso Central Community Hall",
              "PU 004 - Bosso Central Health Center",
              "PU 005 - Bosso Central Mosque"
            ]
          },
          "bosso-east": {
            name: "Bosso East",
            pollingUnits: [
              "PU 006 - Bosso East Primary School",
              "PU 007 - Bosso East Market",
              "PU 008 - Bosso East Community Hall",
              "PU 009 - Bosso East Health Center",
              "PU 010 - Bosso East Mosque"
            ]
          },
          "bosso-west": {
            name: "Bosso West",
            pollingUnits: [
              "PU 011 - Bosso West Primary School",
              "PU 012 - Bosso West Market",
              "PU 013 - Bosso West Community Hall",
              "PU 014 - Bosso West Health Center",
              "PU 015 - Bosso West Mosque"
            ]
          },
          "bosso-north": {
            name: "Bosso North",
            pollingUnits: [
              "PU 016 - Bosso North Primary School",
              "PU 017 - Bosso North Market",
              "PU 018 - Bosso North Community Hall",
              "PU 019 - Bosso North Health Center",
              "PU 020 - Bosso North Mosque"
            ]
          },
          "bosso-south": {
            name: "Bosso South",
            pollingUnits: [
              "PU 021 - Bosso South Primary School",
              "PU 022 - Bosso South Market",
              "PU 023 - Bosso South Community Hall",
              "PU 024 - Bosso South Health Center",
              "PU 025 - Bosso South Mosque"
            ]
          }
        }
      },
      "chanchaga": { 
        name: "Chanchaga", 
        wards: {
          "chanchaga-central": {
            name: "Chanchaga Central",
            pollingUnits: [
              "PU 001 - Chanchaga Central Market",
              "PU 002 - Chanchaga Central Primary School",
              "PU 003 - Chanchaga Central Community Hall",
              "PU 004 - Chanchaga Central Health Center",
              "PU 005 - Chanchaga Central Mosque"
            ]
          },
          "chanchaga-east": {
            name: "Chanchaga East",
            pollingUnits: [
              "PU 006 - Chanchaga East Primary School",
              "PU 007 - Chanchaga East Market",
              "PU 008 - Chanchaga East Community Hall",
              "PU 009 - Chanchaga East Health Center",
              "PU 010 - Chanchaga East Mosque"
            ]
          },
          "chanchaga-west": {
            name: "Chanchaga West",
            pollingUnits: [
              "PU 011 - Chanchaga West Primary School",
              "PU 012 - Chanchaga West Market",
              "PU 013 - Chanchaga West Community Hall",
              "PU 014 - Chanchaga West Health Center",
              "PU 015 - Chanchaga West Mosque"
            ]
          },
          "chanchaga-north": {
            name: "Chanchaga North",
            pollingUnits: [
              "PU 016 - Chanchaga North Primary School",
              "PU 017 - Chanchaga North Market",
              "PU 018 - Chanchaga North Community Hall",
              "PU 019 - Chanchaga North Health Center",
              "PU 020 - Chanchaga North Mosque"
            ]
          },
          "chanchaga-south": {
            name: "Chanchaga South",
            pollingUnits: [
              "PU 021 - Chanchaga South Primary School",
              "PU 022 - Chanchaga South Market",
              "PU 023 - Chanchaga South Community Hall",
              "PU 024 - Chanchaga South Health Center",
              "PU 025 - Chanchaga South Mosque"
            ]
          }
        }
      },
      "edati": { name: "Edati", wards: {} },
      "gurara": { name: "Gurara", wards: {} },
      "katcha": { name: "Katcha", wards: {} },
      "kontagora": { name: "Kontagora", wards: {} },
      "lapai": { name: "Lapai", wards: {} },
      "lavun": { name: "Lavun", wards: {} },
      "magama": { name: "Magama", wards: {} },
      "mariga": { name: "Mariga", wards: {} },
      "mashegu": { name: "Mashegu", wards: {} },
      "mokwa": { name: "Mokwa", wards: {} },
      "moya": { name: "Moya", wards: {} },
      "paikoro": { name: "Paikoro", wards: {} },
      "rafi": { name: "Rafi", wards: {} },
      "rijau": { name: "Rijau", wards: {} },
      "shiroro": { name: "Shiroro", wards: {} },
      "suleja": { name: "Suleja", wards: {} },
      "tafa": { name: "Tafa", wards: {} },
      "wushishi": { name: "Wushishi", wards: {} }
    }
  },
  taraba: {
    name: "Taraba",
    lgas: {
      "ardo-kola": { 
        name: "Ardo Kola", 
        wards: {
          "ardo-kola-central": {
            name: "Ardo Kola Central",
            pollingUnits: [
              "PU 001 - Ardo Kola Central Market",
              "PU 002 - Ardo Kola Central Primary School",
              "PU 003 - Ardo Kola Central Community Hall",
              "PU 004 - Ardo Kola Central Health Center",
              "PU 005 - Ardo Kola Central Church"
            ]
          },
          "ardo-kola-east": {
            name: "Ardo Kola East",
            pollingUnits: [
              "PU 006 - Ardo Kola East Primary School",
              "PU 007 - Ardo Kola East Market",
              "PU 008 - Ardo Kola East Community Hall",
              "PU 009 - Ardo Kola East Health Center",
              "PU 010 - Ardo Kola East Church"
            ]
          },
          "ardo-kola-west": {
            name: "Ardo Kola West",
            pollingUnits: [
              "PU 011 - Ardo Kola West Primary School",
              "PU 012 - Ardo Kola West Market",
              "PU 013 - Ardo Kola West Community Hall",
              "PU 014 - Ardo Kola West Health Center",
              "PU 015 - Ardo Kola West Church"
            ]
          },
          "ardo-kola-north": {
            name: "Ardo Kola North",
            pollingUnits: [
              "PU 016 - Ardo Kola North Primary School",
              "PU 017 - Ardo Kola North Market",
              "PU 018 - Ardo Kola North Community Hall",
              "PU 019 - Ardo Kola North Health Center",
              "PU 020 - Ardo Kola North Church"
            ]
          },
          "ardo-kola-south": {
            name: "Ardo Kola South",
            pollingUnits: [
              "PU 021 - Ardo Kola South Primary School",
              "PU 022 - Ardo Kola South Market",
              "PU 023 - Ardo Kola South Community Hall",
              "PU 024 - Ardo Kola South Health Center",
              "PU 025 - Ardo Kola South Church"
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
              "PU 001 - Bali Central Market",
              "PU 002 - Bali Central Primary School",
              "PU 003 - Bali Central Community Hall",
              "PU 004 - Bali Central Health Center",
              "PU 005 - Bali Central Church"
            ]
          },
          "bali-east": {
            name: "Bali East",
            pollingUnits: [
              "PU 006 - Bali East Primary School",
              "PU 007 - Bali East Market",
              "PU 008 - Bali East Community Hall",
              "PU 009 - Bali East Health Center",
              "PU 010 - Bali East Church"
            ]
          },
          "bali-west": {
            name: "Bali West",
            pollingUnits: [
              "PU 011 - Bali West Primary School",
              "PU 012 - Bali West Market",
              "PU 013 - Bali West Community Hall",
              "PU 014 - Bali West Health Center",
              "PU 015 - Bali West Church"
            ]
          },
          "bali-north": {
            name: "Bali North",
            pollingUnits: [
              "PU 016 - Bali North Primary School",
              "PU 017 - Bali North Market",
              "PU 018 - Bali North Community Hall",
              "PU 019 - Bali North Health Center",
              "PU 020 - Bali North Church"
            ]
          },
          "bali-south": {
            name: "Bali South",
            pollingUnits: [
              "PU 021 - Bali South Primary School",
              "PU 022 - Bali South Market",
              "PU 023 - Bali South Community Hall",
              "PU 024 - Bali South Health Center",
              "PU 025 - Bali South Church"
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
              "PU 001 - Donga Central Market",
              "PU 002 - Donga Central Primary School",
              "PU 003 - Donga Central Community Hall",
              "PU 004 - Donga Central Health Center",
              "PU 005 - Donga Central Church"
            ]
          },
          "donga-east": {
            name: "Donga East",
            pollingUnits: [
              "PU 006 - Donga East Primary School",
              "PU 007 - Donga East Market",
              "PU 008 - Donga East Community Hall",
              "PU 009 - Donga East Health Center",
              "PU 010 - Donga East Church"
            ]
          },
          "donga-west": {
            name: "Donga West",
            pollingUnits: [
              "PU 011 - Donga West Primary School",
              "PU 012 - Donga West Market",
              "PU 013 - Donga West Community Hall",
              "PU 014 - Donga West Health Center",
              "PU 015 - Donga West Church"
            ]
          },
          "donga-north": {
            name: "Donga North",
            pollingUnits: [
              "PU 016 - Donga North Primary School",
              "PU 017 - Donga North Market",
              "PU 018 - Donga North Community Hall",
              "PU 019 - Donga North Health Center",
              "PU 020 - Donga North Church"
            ]
          },
          "donga-south": {
            name: "Donga South",
            pollingUnits: [
              "PU 021 - Donga South Primary School",
              "PU 022 - Donga South Market",
              "PU 023 - Donga South Community Hall",
              "PU 024 - Donga South Health Center",
              "PU 025 - Donga South Church"
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
              "PU 001 - Gashaka Central Market",
              "PU 002 - Gashaka Central Primary School",
              "PU 003 - Gashaka Central Community Hall",
              "PU 004 - Gashaka Central Health Center",
              "PU 005 - Gashaka Central Church"
            ]
          },
          "gashaka-east": {
            name: "Gashaka East",
            pollingUnits: [
              "PU 006 - Gashaka East Primary School",
              "PU 007 - Gashaka East Market",
              "PU 008 - Gashaka East Community Hall",
              "PU 009 - Gashaka East Health Center",
              "PU 010 - Gashaka East Church"
            ]
          },
          "gashaka-west": {
            name: "Gashaka West",
            pollingUnits: [
              "PU 011 - Gashaka West Primary School",
              "PU 012 - Gashaka West Market",
              "PU 013 - Gashaka West Community Hall",
              "PU 014 - Gashaka West Health Center",
              "PU 015 - Gashaka West Church"
            ]
          },
          "gashaka-north": {
            name: "Gashaka North",
            pollingUnits: [
              "PU 016 - Gashaka North Primary School",
              "PU 017 - Gashaka North Market",
              "PU 018 - Gashaka North Community Hall",
              "PU 019 - Gashaka North Health Center",
              "PU 020 - Gashaka North Church"
            ]
          },
          "gashaka-south": {
            name: "Gashaka South",
            pollingUnits: [
              "PU 021 - Gashaka South Primary School",
              "PU 022 - Gashaka South Market",
              "PU 023 - Gashaka South Community Hall",
              "PU 024 - Gashaka South Health Center",
              "PU 025 - Gashaka South Church"
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
              "PU 001 - Gassol Central Market",
              "PU 002 - Gassol Central Primary School",
              "PU 003 - Gassol Central Community Hall",
              "PU 004 - Gassol Central Health Center",
              "PU 005 - Gassol Central Church"
            ]
          },
          "gassol-east": {
            name: "Gassol East",
            pollingUnits: [
              "PU 006 - Gassol East Primary School",
              "PU 007 - Gassol East Market",
              "PU 008 - Gassol East Community Hall",
              "PU 009 - Gassol East Health Center",
              "PU 010 - Gassol East Church"
            ]
          },
          "gassol-west": {
            name: "Gassol West",
            pollingUnits: [
              "PU 011 - Gassol West Primary School",
              "PU 012 - Gassol West Market",
              "PU 013 - Gassol West Community Hall",
              "PU 014 - Gassol West Health Center",
              "PU 015 - Gassol West Church"
            ]
          },
          "gassol-north": {
            name: "Gassol North",
            pollingUnits: [
              "PU 016 - Gassol North Primary School",
              "PU 017 - Gassol North Market",
              "PU 018 - Gassol North Community Hall",
              "PU 019 - Gassol North Health Center",
              "PU 020 - Gassol North Church"
            ]
          },
          "gassol-south": {
            name: "Gassol South",
            pollingUnits: [
              "PU 021 - Gassol South Primary School",
              "PU 022 - Gassol South Market",
              "PU 023 - Gassol South Community Hall",
              "PU 024 - Gassol South Health Center",
              "PU 025 - Gassol South Church"
            ]
          }
        }
      },
      "ibi": { name: "Ibi", wards: {} },
      "jalingo": { name: "Jalingo", wards: {} },
      "karim-lamido": { name: "Karim Lamido", wards: {} },
      "kurmi": { name: "Kurmi", wards: {} },
      "lau": { name: "Lau", wards: {} },
      "sardauna": { name: "Sardauna", wards: {} },
      "takum": { name: "Takum", wards: {} },
      "ussa": { name: "Ussa", wards: {} },
      "wukari": { name: "Wukari", wards: {} },
      "yorro": { name: "Yorro", wards: {} },
      "zungur": { name: "Zungur", wards: {} }
    }
  },
  yobe: {
    name: "Yobe",
    lgas: {
      "bade": { 
        name: "Bade", 
        wards: {
          "bade-central": {
            name: "Bade Central",
            pollingUnits: [
              "PU 001 - Bade Central Market",
              "PU 002 - Bade Central Primary School",
              "PU 003 - Bade Central Community Hall",
              "PU 004 - Bade Central Health Center",
              "PU 005 - Bade Central Mosque"
            ]
          },
          "bade-east": {
            name: "Bade East",
            pollingUnits: [
              "PU 006 - Bade East Primary School",
              "PU 007 - Bade East Market",
              "PU 008 - Bade East Community Hall",
              "PU 009 - Bade East Health Center",
              "PU 010 - Bade East Mosque"
            ]
          },
          "bade-west": {
            name: "Bade West",
            pollingUnits: [
              "PU 011 - Bade West Primary School",
              "PU 012 - Bade West Market",
              "PU 013 - Bade West Community Hall",
              "PU 014 - Bade West Health Center",
              "PU 015 - Bade West Mosque"
            ]
          },
          "bade-north": {
            name: "Bade North",
            pollingUnits: [
              "PU 016 - Bade North Primary School",
              "PU 017 - Bade North Market",
              "PU 018 - Bade North Community Hall",
              "PU 019 - Bade North Health Center",
              "PU 020 - Bade North Mosque"
            ]
          },
          "bade-south": {
            name: "Bade South",
            pollingUnits: [
              "PU 021 - Bade South Primary School",
              "PU 022 - Bade South Market",
              "PU 023 - Bade South Community Hall",
              "PU 024 - Bade South Health Center",
              "PU 025 - Bade South Mosque"
            ]
          }
        }
      },
      "bursari": { 
        name: "Bursari", 
        wards: {
          "bursari-central": {
            name: "Bursari Central",
            pollingUnits: [
              "PU 001 - Bursari Central Market",
              "PU 002 - Bursari Central Primary School",
              "PU 003 - Bursari Central Community Hall",
              "PU 004 - Bursari Central Health Center",
              "PU 005 - Bursari Central Mosque"
            ]
          },
          "bursari-east": {
            name: "Bursari East",
            pollingUnits: [
              "PU 006 - Bursari East Primary School",
              "PU 007 - Bursari East Market",
              "PU 008 - Bursari East Community Hall",
              "PU 009 - Bursari East Health Center",
              "PU 010 - Bursari East Mosque"
            ]
          },
          "bursari-west": {
            name: "Bursari West",
            pollingUnits: [
              "PU 011 - Bursari West Primary School",
              "PU 012 - Bursari West Market",
              "PU 013 - Bursari West Community Hall",
              "PU 014 - Bursari West Health Center",
              "PU 015 - Bursari West Mosque"
            ]
          },
          "bursari-north": {
            name: "Bursari North",
            pollingUnits: [
              "PU 016 - Bursari North Primary School",
              "PU 017 - Bursari North Market",
              "PU 018 - Bursari North Community Hall",
              "PU 019 - Bursari North Health Center",
              "PU 020 - Bursari North Mosque"
            ]
          },
          "bursari-south": {
            name: "Bursari South",
            pollingUnits: [
              "PU 021 - Bursari South Primary School",
              "PU 022 - Bursari South Market",
              "PU 023 - Bursari South Community Hall",
              "PU 024 - Bursari South Health Center",
              "PU 025 - Bursari South Mosque"
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
              "PU 001 - Damaturu Central Market",
              "PU 002 - Damaturu Central Primary School",
              "PU 003 - Damaturu Central Community Hall",
              "PU 004 - Damaturu Central Health Center",
              "PU 005 - Damaturu Central Mosque"
            ]
          },
          "damaturu-east": {
            name: "Damaturu East",
            pollingUnits: [
              "PU 006 - Damaturu East Primary School",
              "PU 007 - Damaturu East Market",
              "PU 008 - Damaturu East Community Hall",
              "PU 009 - Damaturu East Health Center",
              "PU 010 - Damaturu East Mosque"
            ]
          },
          "damaturu-west": {
            name: "Damaturu West",
            pollingUnits: [
              "PU 011 - Damaturu West Primary School",
              "PU 012 - Damaturu West Market",
              "PU 013 - Damaturu West Community Hall",
              "PU 014 - Damaturu West Health Center",
              "PU 015 - Damaturu West Mosque"
            ]
          },
          "damaturu-north": {
            name: "Damaturu North",
            pollingUnits: [
              "PU 016 - Damaturu North Primary School",
              "PU 017 - Damaturu North Market",
              "PU 018 - Damaturu North Community Hall",
              "PU 019 - Damaturu North Health Center",
              "PU 020 - Damaturu North Mosque"
            ]
          },
          "damaturu-south": {
            name: "Damaturu South",
            pollingUnits: [
              "PU 021 - Damaturu South Primary School",
              "PU 022 - Damaturu South Market",
              "PU 023 - Damaturu South Community Hall",
              "PU 024 - Damaturu South Health Center",
              "PU 025 - Damaturu South Mosque"
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
              "PU 001 - Fika Central Market",
              "PU 002 - Fika Central Primary School",
              "PU 003 - Fika Central Community Hall",
              "PU 004 - Fika Central Health Center",
              "PU 005 - Fika Central Mosque"
            ]
          },
          "fika-east": {
            name: "Fika East",
            pollingUnits: [
              "PU 006 - Fika East Primary School",
              "PU 007 - Fika East Market",
              "PU 008 - Fika East Community Hall",
              "PU 009 - Fika East Health Center",
              "PU 010 - Fika East Mosque"
            ]
          },
          "fika-west": {
            name: "Fika West",
            pollingUnits: [
              "PU 011 - Fika West Primary School",
              "PU 012 - Fika West Market",
              "PU 013 - Fika West Community Hall",
              "PU 014 - Fika West Health Center",
              "PU 015 - Fika West Mosque"
            ]
          },
          "fika-north": {
            name: "Fika North",
            pollingUnits: [
              "PU 016 - Fika North Primary School",
              "PU 017 - Fika North Market",
              "PU 018 - Fika North Community Hall",
              "PU 019 - Fika North Health Center",
              "PU 020 - Fika North Mosque"
            ]
          },
          "fika-south": {
            name: "Fika South",
            pollingUnits: [
              "PU 021 - Fika South Primary School",
              "PU 022 - Fika South Market",
              "PU 023 - Fika South Community Hall",
              "PU 024 - Fika South Health Center",
              "PU 025 - Fika South Mosque"
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
              "PU 001 - Fune Central Market",
              "PU 002 - Fune Central Primary School",
              "PU 003 - Fune Central Community Hall",
              "PU 004 - Fune Central Health Center",
              "PU 005 - Fune Central Mosque"
            ]
          },
          "fune-east": {
            name: "Fune East",
            pollingUnits: [
              "PU 006 - Fune East Primary School",
              "PU 007 - Fune East Market",
              "PU 008 - Fune East Community Hall",
              "PU 009 - Fune East Health Center",
              "PU 010 - Fune East Mosque"
            ]
          },
          "fune-west": {
            name: "Fune West",
            pollingUnits: [
              "PU 011 - Fune West Primary School",
              "PU 012 - Fune West Market",
              "PU 013 - Fune West Community Hall",
              "PU 014 - Fune West Health Center",
              "PU 015 - Fune West Mosque"
            ]
          },
          "fune-north": {
            name: "Fune North",
            pollingUnits: [
              "PU 016 - Fune North Primary School",
              "PU 017 - Fune North Market",
              "PU 018 - Fune North Community Hall",
              "PU 019 - Fune North Health Center",
              "PU 020 - Fune North Mosque"
            ]
          },
          "fune-south": {
            name: "Fune South",
            pollingUnits: [
              "PU 021 - Fune South Primary School",
              "PU 022 - Fune South Market",
              "PU 023 - Fune South Community Hall",
              "PU 024 - Fune South Health Center",
              "PU 025 - Fune South Mosque"
            ]
          }
        }
      },
      "geidam": { name: "Geidam", wards: {} },
      "gujba": { name: "Gujba", wards: {} },
      "gulani": { name: "Gulani", wards: {} },
      "jakusko": { name: "Jakusko", wards: {} },
      "karasuwa": { name: "Karasuwa", wards: {} },
      "machina": { name: "Machina", wards: {} },
      "nangere": { name: "Nangere", wards: {} },
      "nguru": { name: "Nguru", wards: {} },
      "potiskum": { name: "Potiskum", wards: {} },
      "tarmuwa": { name: "Tarmuwa", wards: {} },
      "yunusari": { name: "Yunusari", wards: {} },
      "yusufari": { name: "Yusufari", wards: {} }
    }
  }
};

// Helper functions to access the data
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
  
  return ward.pollingUnits.map((pu, index) => ({
    key: `pu-${index + 1}`,
    name: pu
  }));
};