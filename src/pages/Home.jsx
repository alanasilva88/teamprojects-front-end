import Projetos from "../components/projetos";
import Equipes from "../components/Equipes";
import Tarefas from "../components/tarefas";

function Home() {
    return (

        <>
            <h1 className="text-center">Hello world!</h1>
            <Projetos />
            <Equipes />
            <Tarefas />
        </>

    );
}

export default Home;