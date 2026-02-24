

import { LiaExclamationTriangleSolid } from "react-icons/lia"
import { BackButton } from "./back-button"
import { CardWrapper } from "./card-wrapper"
import { Header } from "./header"




export const ErrorCard = ()=>{
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong!"
            backButtonHref="/auth/error"
            backButtonLabel="Back to login"
        >
            <div
              className="
                w-full flex justify-center items-center
              "
            >
              <LiaExclamationTriangleSolid className="text-destructive text-5xl"/>
            </div>
        </CardWrapper>
    )
}