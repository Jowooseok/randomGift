import {Row, Col} from 'antd';
import {initializeApp} from "firebase/app";
import {getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc ,doc, getDocs, collection } from "firebase/firestore";
import {useEffect} from "react";

export default function App({Component, pageProps}) {

    const firebaseConfig = {
        apiKey: "AIzaSyBkFs_bDa_hXYRygEITp86cOyhO9-7nqRc",
        authDomain: "souvenir-a2436.firebaseapp.com",
        projectId: "souvenir-a2436",
        storageBucket: "souvenir-a2436.appspot.com",
        messagingSenderId: "156198257947",
        appId: "1:156198257947:web:4b46c6bd9b6d86d73f3fbe",
        measurementId: "G-5L5ET271RT"
    };

    let app,analytics,db;

    useEffect(()=>{
        app = initializeApp(firebaseConfig);
        analytics = getAnalytics(app);
        db = getFirestore(app);
    },[])

    const onClickTEST= async () =>{
        // const querySnapshot = await getDocs(collection(db, "login"));
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        // });
    }

    return <Row style={{height: "100vh"}}>

        <Col span={24} onClick={onClickTEST}>
            <Component {...pageProps} />
        </Col>

    </Row>
}
