import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../config/firebase";

const fetchUsers = async () => {

    const querySnapshot = await getDocs(collection(db, "users"));
    const compareByName = (a, b) => {
        const isRoleSame = a.role === b.role;
        return isRoleSame ? a.email.localeCompare(b.email) : a.role.localeCompare(b.role);
    }

    if (querySnapshot.docs) {

        const resultData = querySnapshot.docs.map(i => Object.assign({id: i.id}, i.data()));
        resultData.sort(compareByName);

        console.log(resultData)
        return resultData;
    } else {
        console.log("No such document (users)!");
        return {};
    }
}

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
        console.log(docSnap.data())
        return docSnap.data();
    } else {
        console.log("No such document (vehicle/locations)!");
        return {};
    }
}

const fetchReservations = async (owner) => {

    let q;
    if(owner)
        q = query(collection(db, "rentals"), where("reservationOwner", "==", owner));
    else
        q = collection(db, "rentals");

    const querySnapshot = await getDocs(q);

    if(querySnapshot.docs.length){

        return querySnapshot.docs.map(doc => {

            let result = doc.data();
            result["documentId"] = doc.id;
            return result;
        });
    }
    else {
        return null;
    }
}

const fetchContactForms = async () => {

    const querySnapshot = await getDocs(collection(db, "forms"));

    if (querySnapshot.docs) {

        const resultData = querySnapshot.docs.map(i => Object.assign({id: i.id}, i.data()));
        return resultData;
    } else {
        console.log("No such document (forms)!");
        return {};
    }
}


export {fetchUsers, fetchBrands, fetchModels, fetchCars, fetchLocations, fetchReservations, fetchContactForms}