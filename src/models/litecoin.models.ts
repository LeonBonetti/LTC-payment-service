import {clientRequest} from '../config/litecoin.config'

export const getNewAddress = async () => {
    const request = await clientRequest<string>("getnewaddress", [])
    return request
}