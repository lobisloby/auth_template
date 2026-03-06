import { XCircle, CheckCircle } from "lucide-react"

export const FormError = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-2 text-red-600 text-sm border shadow-sm bg-red-200 p-2 rounded-md">
            <XCircle className="w-4 h-4" />
            {message}
        </div>
    )
}

export const FormSuccess = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-2 text-green-600 text-sm border shadow-sm bg-green-200 p-2 rounded-md">
            <CheckCircle className="w-4 h-4" />
            {message}
        </div>
    )
}