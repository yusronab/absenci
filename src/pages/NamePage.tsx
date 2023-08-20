import { motion } from "framer-motion";
import { useState } from "react";
import { useAppState } from "../AppContext";
import Button from "../components/Button";
import { fadeIn } from "../variants";
import { BiHappyBeaming } from "react-icons/bi";

interface Entry {
    name: string;
    nim: string;
    presence: string;
    timestamp: string;
    todo: string;
}

const NamePage = () => {
    const { state, setState } = useAppState();
    const [isPresence, setIsPresence] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIsLoading(true);

        const selectedName = event.target.value;

        setState({ ...state, name: selectedName });

        filterCurrent(selectedName)
    };

    const filterCurrent = async (name: string) => {
        const today = new Date().toLocaleDateString();

        await fetch('https://sheetdb.io/api/v1/gfre646e6awhx')
            .then((response) => response.json())
            .then((data: Entry[]) => {

                const filteredData = data.filter((entry) => {
                    const currentDate = new Date(entry.timestamp).toLocaleDateString();
                    
                    return entry.name === name && currentDate === today;
                });

                if (filteredData.length > 0) {
                    console.log("Kamu sudah memiliki data hari ini");
                    setIsPresence(true);
                } else {
                    console.log("Kamu belum memiliki data hari ini");
                }
            });

        setIsLoading(false);
    }

    if (isPresence) {
        return (
            <motion.div
                variants={fadeIn('', 0.2)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="w-screen h-screen flex justify-center items-center bg-gradient-to-l from-green-700
                to-teal-700 gap-3">
                <BiHappyBeaming color='white' size={26} />
                <p className="text-white">Kamu sudah melakukan presensi hari ini.</p>
            </motion.div>
        );
    }

    return (
        <>
            <p className="text-white my-3">Nama kamu siapa?</p>
            <div>
                <select
                    className="p-3 rounded-md"
                    onChange={handleSelectChange}
                    value={state.name}
                    required
                >
                    <option value="" disabled>Pilih nama</option>
                    <option value="ferdi">Ferdi Setyo Amanda</option>
                    <option value="asrof">M. Asyrofurizqi</option>
                    <option value="reziq">M. Reziq Darusman</option>
                    <option value="yusron">Yusron Arly Bazarah</option>
                </select>
            </div>
            <Button text="Lanjut" href="/nim" disable={isLoading} />
        </>
    )
}

export default NamePage;