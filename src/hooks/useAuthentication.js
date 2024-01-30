import { useState } from "react";
import { useDispatch } from "react-redux";
import { db, auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { clearUserData, setUser } from "../redux/features/UserSlice";

const useAuthentication = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const signInCall = async ({email, password}) => {

        setIsLoading (true);
        try {
            const {user} = await signInWithEmailAndPassword(auth,
                email,
                password
            );

            const q = query(collection(db, "users"), where("userUID", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const docData = querySnapshot.docs[0].data();

            const userData = {...user, ...docData};

            dispatch(setUser(userData));

            setMessage({
                content: "You are successfully logged in!",
                isError: false
            });
        }
        catch (err) {
            console.log(err);

            setMessage({
                content: "Incorrect mail or password, please try again!",
                isError: true
            });

        } finally {
            setIsLoading (false);
        }
    };

    const signUpCall = async ({email, password}) => {

        setIsLoading (true);

        try {
            const {user} = await createUserWithEmailAndPassword(auth,
                email,
                password
            );

            const docData = {
                userUID: user.uid,
                email: email,
                role: "user"
            };

            await addDoc(collection(db, "users"), docData);

            const userData = {...user, ...docData};

            dispatch(setUser(userData));

            setMessage({
                content: "You are successfully signed up!",
                isError: false
            });

        } catch (err) {

            console.log(err);
            setMessage({
                content: err.message,
                isError: true
            });
        }
        finally {
            setIsLoading(false);
        }
    };

    const signOutCall = async () => {

        setIsLoading (true);

        try {
            await signOut (auth);
            dispatch(clearUserData());

            setMessage({
                content: "You are successfully logged out!",
                isError: false
            });
        }
        catch (err) {
            console.log(err);

            setMessage({
                content: err,
                isError: true
            });
        }
        finally {
            setIsLoading (false);
        }
    };

    return {isLoading, message, signInCall, signUpCall, signOutCall};
}

export default useAuthentication;