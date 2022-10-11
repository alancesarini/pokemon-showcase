export interface PokemonItemType {
    name: string;
    url: string;
}

export interface PokemonDetailType {
    name: string;
    picture_front: string;
    picture_back: string;
    abilities: string[];
    forms: string[];
    height: number;
    species: string;
};
