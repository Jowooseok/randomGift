import React, {useEffect, useState, useRef} from 'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import {Button, Row, Typography} from "antd";
import {useRouter} from 'next/router'
import {collection, doc, getFirestore, setDoc, getDoc, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";

const {Title} = Typography;

const firebaseConfig = {
    apiKey: "AIzaSyBkFs_bDa_hXYRygEITp86cOyhO9-7nqRc",
    authDomain: "souvenir-a2436.firebaseapp.com",
    projectId: "souvenir-a2436",
    storageBucket: "souvenir-a2436.appspot.com",
    messagingSenderId: "156198257947",
    appId: "1:156198257947:web:4b46c6bd9b6d86d73f3fbe",
    measurementId: "G-5L5ET271RT"
};

const prizes = [
    {
        image: '/images/14.jpg',
    },
    {
        image: '/images/1.jpg',
    },
    {
        image: '/images/2.jpg',
    },
    {
        image: '/images/3.jpg',
    },
    {
        image: '/images/4.jpg',
    },
    {
        image: '/images/5.jpg',
    },
    {
        image: '/images/6.jpg',
    },
    {
        image: '/images/7.jpg',
    },
    {
        image: '/images/8.jpg',
    },
    {
        image: '/images/9.jpg',
    }, {
        image: '/images/10.jpg',
    },
    {
        image: '/images/11.jpg',
    },
    {
        image: '/images/12.jpg',
    },
    {
        image: '/images/13.jpg',
    },
];

const winPrizeIndex = 0;

const reproductionArray = (array = [], length = 0) => [
    ...Array(length)
        .fill('_')
        .map(() => array[Math.floor(Math.random() * array.length)]),
];

const reproducedPrizeList = [
    ...prizes,
    ...reproductionArray(prizes, prizes.length * 3),
    ...prizes,
    ...reproductionArray(prizes, prizes.length),
];

const generateId = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;


const prizeList = reproducedPrizeList.map((prize) => ({
    ...prize,
    id: generateId(),
}));


const itemCheck = () => {
    const [start, setStart] = useState(false);
    const prizeIndex = prizes.length * 4 + winPrizeIndex;
    const router = useRouter()
    const {phoneNumber, name} = router.query;

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const handleStart = async () => {
        setStart((prevState) => !prevState);
        const rand_1_14 = Math.floor(Math.random() * 14) + 1;

        const docRef = doc(db, "login", "UHGsPPaf4Q5YHjOCMFFP");
        const data = {
            [phoneNumber] : {
                "check" : rand_1_14,
                "name" : name,
            }
        }
        await updateDoc(docRef, data);
        setInterval(()=>{
            router.push(`/itemResult?result=${rand_1_14}&&phoneNumber=${phoneNumber}&&name=${name}`)
        },3000);
    };

    const handlePrizeDefined = () => {
        console.log('🥳 Prize defined! 🥳');
    };


    return (
        <div>
            <Row justify={'center'}>
                <Title>기념품 확인 페이지</Title>
            </Row>
            <Row>
                <RoulettePro
                    prizes={prizeList}
                    prizeIndex={prizeIndex}
                    start={start}
                    onPrizeDefined={handlePrizeDefined}
                />
            </Row>
            <br/>
            <Button type={"primary"} onClick={handleStart} style={{width: "100%"}}>Start</Button>
        </div>
    );
};

export default itemCheck;