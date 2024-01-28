import {doc, getDoc} from "firebase/firestore";
import {db} from "../config/firebase";

const fetchBrands = async () => {

    const docRef = doc(db, "vehicle", "brands");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document (vehicle/brands)!");
        return {};
    }
}
const fetchModels = async () => {

    const docRef = doc(db, "vehicle", "models");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document (vehicle/models)!");
        return {};
    }
}
const fetchCars = async () => {

    const docRef = doc(db, "vehicle", "cars");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document (vehicle/cars)!");
        return {};
    }
}

const fetchLocations = async () => {

    const docRef = doc(db, "vehicle", "locations");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document (vehicle/locations)!");
        return {};
    }
}


export {fetchBrands, fetchModels, fetchCars, fetchLocations}