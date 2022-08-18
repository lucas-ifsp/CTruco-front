import { useEffect, useState } from "react";

const useAxios = () => {
    const [response, setResponse] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [controller, setController] = useState()

    const sendRequest = async (configObject) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObject

        try {
            setLoading(true)
            const ctrl = new AbortController()
            setController(ctrl);

            console.log(`Received: ${url}`)
            const res = await axiosInstance[method.toLowerCase()](url, requestConfig.data, {
                headers: requestConfig.headers,
                signal: ctrl.signal
            })
            console.log('data: ')
            console.log(res.data)
            setResponse(res.data)
        } catch (error) {
            console.log(error)
            setError(error?.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        return (() => controller && controller.abort())
    }, [controller])

    return { response, error, loading, sendRequest }

}

export default useAxios