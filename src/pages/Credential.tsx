import { useEffect, useState } from "react"
import Button from "../components/Button"
import { BiEdit, BiCheck } from "react-icons/bi"
import { useAppState } from "../AppContext";

const Credential = () => {
  const { state, setState } = useAppState();

  const currentNim: Record<string, string> = {
    ferdi: "20090159",
    asrof: "20090101",
    reziq: "20090127",
    yusron: "20090034",
  }

  const selectedNim = currentNim[state.name];

  const [edit, setEdit] = useState(true);
  const [value, setValue] = useState(selectedNim);

  useEffect(() => setState({ ...state, nim: selectedNim }), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replace(/[^0-9]/g, ''));
    setState({ ...state, nim: e.target.value })
  };

  return (
    <>
      <p className="text-white my-3">Bener ini NIM kamu?</p>
      <div className="flex">
        <input
          type="text"
          value={value}
          disabled={edit}
          placeholder="typing . . ."
          onChange={handleInputChange}
          className={`border-b-2 border-b-white bg-transparent pl-2 rounded-md focus:outline-none 
          ${edit ? 'bg-white text-teal-600 rounded-l-md transition-all duration-300' : 'text-white'}`}
        />
        <div className={`p-3 ml-3 cursor-pointer`} onClick={() => setEdit(!edit)}>
          {edit ? <BiEdit color='white' size={26} /> : <BiCheck color='white' size={26} />}
        </div>
      </div>
      <Button text="Lanjut" href="/todo" />
    </>
  )
}

export default Credential