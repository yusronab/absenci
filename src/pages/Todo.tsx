import { useAppState } from "../AppContext";
import Button from "../components/Button"

const Todo = () => {
    const { state, setState } = useAppState();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, todo: e.target.value });
    }

    return (
        <>
            <p className="text-white my-5">Apa rencana buat proyek kamu hari ini?</p>
            <div className="flex">
                <input
                    type="text"
                    value={state.todo}
                    placeholder="type something . . ."
                    required
                    autoFocus
                    onChange={handleInputChange}
                    className="border-b-2 border-b-white bg-transparent pl-px focus:outline-none
                    text-white"
                />
            </div>
            <Button text="Lanjut" href="/scan" />
        </>
    )
}

export default Todo