import {useEffect, useState} from "react";

const isValidJson = (rawValue: string): boolean => {
    try {
        JSON.parse(rawValue)
        return true
    } catch {
        return false
    }
}

const useJsonValidator = () => {
    const [rawValue, setRawValue] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(isValidJson(rawValue))
    }, [rawValue]);

    return { rawValue, setRawValue, isValid }
}

const JsonValidator = () => {
    const { rawValue, setRawValue, isValid } = useJsonValidator()

    const getMessage = () => {
        if (rawValue.length <= 0) return <></>
        else return isValid ? <p>Is valid</p> : <p>Is not valid</p>
    }

    return (
        <form>
            <label htmlFor="json-validator-input">Enter your json:</label>
            <input
                type="text"
                id="json-validator-input"
                value={rawValue}
                onChange={(e) => setRawValue(e.target.value)}
            />
            { getMessage() }
        </form>
    )
}

export default JsonValidator