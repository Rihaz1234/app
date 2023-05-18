import {AbstractControl} from "@angular/forms";
import {parsePhoneNumberFromString,  findPhoneNumbersInText } from "libphonenumber-js";

export function _validatePhoneNumberInput(c: AbstractControl): object {
    let value = c?.value || "";
    let inputValue: string = value.toString();
    if (inputValue !== "") {
        let c_number = findPhoneNumbersInText(inputValue);
        let c_code = c_number[0]?.number?.country;
        let c_num = c_number[0]?.number?.nationalNumber;
        let phoneNumber: any;
       
        if(c_code && c_num) {
            
            phoneNumber = parsePhoneNumberFromString(c_num.toString(), c_code);
        }
        if(c_code === 'IN' && c_num[0] === '1'){
            if(c_num.length !== 10){
                return {
                    phoneNumberInvalid: true
                }
            }
        }else{
            if(phoneNumber){
                if(phoneNumber.isValid()){
                    return null;
                } else {
                    return {
                        phoneNumberInvalid: true
                    }
                }
            } 
            else {
                return {
                    phoneNumberInvalid: true
                }
            }
        }
        
    }
}
