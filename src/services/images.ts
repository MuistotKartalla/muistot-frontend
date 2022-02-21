import axios from "axios";

export const getImageURL = (image: string) => axios.defaults.baseURL + '/images/' + image