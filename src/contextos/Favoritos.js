import { createContext, useContext, useState } from "react";

export const FavoritosContext = createContext();
FavoritosContext.displayName = "Favoritos";

export default function FavoritosProvider({ children }) {

    const [favoritos, setFavoritos] = useState([]);

    return (
        <FavoritosContext.Provider value={{ favoritos, setFavoritos }} >
            {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritoContext() {

    const { favoritos, setFavoritos } = useContext(FavoritosContext);

    function adicionarFavorito(novoFavorito) {

        const favoritoRepetido = favoritos.some(favorito => favorito.id === novoFavorito.id);

        let novaLista = [...favoritos];

        if(!favoritoRepetido) {
            novaLista.push(novoFavorito);
            return setFavoritos(novaLista);
        }

        novaLista = favoritos.filter((item) => item.id !== novoFavorito.id);
        return setFavoritos(novaLista);
    }

    return {
        favoritos,
        adicionarFavorito
    }
}