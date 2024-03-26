const demoBrands = {
    "0": "Mercedes",
    "1": "Hyundai",
    "2": "BMW",
    "3": "Opel",
    "4": "Toyota",
    "5": "Nissan",
    "6": "Mazda"
}
const demoModels = {
    "0": {
        "brandId": 0,
        "models": {
            "0": "C200"
        }
    },
    "1": {
        "models": {
            "0": "Bayon",
            "1": "i20"
        },
        "brandId": 1
    },
    "2": {
        "brandId": 2,
        "models": {
            "0": "320d",
            "1": "520i"
        }
    },
    "3": {
        "models": {
            "0": "Astra"
        },
        "brandId": 3
    },
    "4": {
        "brandId": 4,
        "models": {
            "0": "Corolla"
        }
    },
    "5": {
        "brandId": 5,
        "models": {
            "0": "Qashqai"
        }
    }
}
const demoCars = {
    "0": {
        "fuelType": "Gas",
        "gearbox": "automatic",
        "availableLocations": [
            "4",
            "3"
        ],
        "carCount": 35,
        "modelId": 0,
        "power": "184 hp",
        "engineSize": "1991 cc",
        "brandId": 0,
        "bodyType": "Sedan",
        "image": "https://firebasestorage.googleapis.com/v0/b/rentacar-reactjs.appspot.com/o/vehicle-images%2Fmercedes-c200.png?alt=media&token=4231b8bd-2e9b-4fc1-8a7b-2f6f73bf5323"
    },
    "1": {
        "availableLocations": [
            "1",
            "2"
        ],
        "image": "https://firebasestorage.googleapis.com/v0/b/rentacar-reactjs.appspot.com/o/vehicle-images%2Fbayon.png?alt=media&token=302cada4-5ef7-4ab1-bc9b-4634cd06fc4b",
        "carCount": 25,
        "bodyType": "Hatchback",
        "brandId": 1,
        "power": "100 hp",
        "fuelType": "Gas",
        "engineSize": "1368 cc",
        "modelId": 0,
        "gearbox": "automatic"
    },
    "2": {
        "engineSize": "1197 cc",
        "image": "https://firebasestorage.googleapis.com/v0/b/rentacar-reactjs.appspot.com/o/vehicle-images%2Fi20.png?alt=media&token=90569c4c-8ee3-4714-a6fe-e79fc266aff0",
        "carCount": 12,
        "availableLocations": [
            "4"
        ],
        "brandId": 1,
        "bodyType": "Hatchback",
        "modelId": 1,
        "power": "84 hp",
        "fuelType": "Gas",
        "gearbox": "automatic"
    },
    "3": {
        "modelId": 0,
        "engineSize": "2000 cc",
        "gearbox": "automatic",
        "bodyType": "Sedan",
        "image": "https://firebasestorage.googleapis.com/v0/b/rentacar-reactjs.appspot.com/o/vehicle-images%2F320d.png?alt=media&token=ded4a19f-10b2-4597-8242-8af8d81bc9cb",
        "fuelType": "Diesel",
        "power": "120 hp",
        "availableLocations": [
            "0"
        ],
        "brandId": 2,
        "carCount": 9
    },
    "4": {
        "availableLocations": [
            "2",
            "3"
        ],
        "carCount": 6,
        "image": "https://firebasestorage.googleapis.com/v0/b/rentacar-reactjs.appspot.com/o/vehicle-images%2F520i.png?alt=media&token=760398ec-6353-482d-a856-bdb94896bb79",
        "fuelType": "Gas",
        "power": "170 hp",
        "modelId": 1,
        "engineSize": "1597 cc",
        "gearbox": "automatic",
        "bodyType": "Sedan",
        "brandId": 2
    },
    "5": {
        "brandId": 3,
        "fuelType": "Gas",
        "availableLocations": [
            "0",
            "1",
            "2",
            "3",
            "4"
        ],
        "power": "130 hp",
        "bodyType": "Hatchback",
        "carCount": 13,
        "engineSize": "1199 cc",
        "gearbox": "automatic",
        "modelId": 0,
        "image": "https://firebasestorage.googleapis.com/v0/b/rentacar-reactjs.appspot.com/o/vehicle-images%2Fastra.png?alt=media&token=38f806a7-6bc5-4b79-ae82-48bca7095b19"
    },
    "6": {
        "modelId": 0,
        "engineSize": "1490 cc",
        "bodyType": "Sedan",
        "fuelType": "Hybrid",
        "image": "https://firebasestorage.googleapis.com/v0/b/rentacar-reactjs.appspot.com/o/vehicle-images%2Fcorolla.png?alt=media&token=8feec6e0-95d8-4ccf-ade4-83e5c7d99cb6",
        "availableLocations": [
            "0",
            "1",
            "2",
            "3"
        ],
        "gearbox": "automatic",
        "carCount": 17,
        "brandId": 4,
        "power": "123 hp"
    },
    "7": {
        "fuelType": "Gas",
        "carCount": 11,
        "brandId": 5,
        "availableLocations": [
            "2",
            "3"
        ],
        "engineSize": "1332",
        "gearbox": "automatic",
        "modelId": 0,
        "power": "116 hp",
        "image": "https://firebasestorage.googleapis.com/v0/b/rentacar-reactjs.appspot.com/o/vehicle-images%2Fqashqai.png?alt=media&token=8b886da9-d376-427a-8b6e-09faa361303b",
        "bodyType": "SUV"
    }
}
const demoLocations = {
    "0": "Paris, France",
    "1": "Rome, Italy",
    "2": "Helsinki, Finland",
    "3": "Amsterdam, Netherlands",
    "4": "Istanbul, Turkey"
}

export { demoBrands, demoModels, demoCars, demoLocations }