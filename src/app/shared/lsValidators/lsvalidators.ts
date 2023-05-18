import { AbstractControl } from "@angular/forms";

export class LSvalidators {
    static charsOnly(control: AbstractControl): { [key: string]: boolean } | null {
        let patternToMatch = /^[a-zA-Z ]+$/;
        if (control.value !== null && control.value !== undefined && !patternToMatch.test(control.value)) {
            return { 'mustCharsOnly': true };
        }
        return null;
    }

    static numericsOnly(control: AbstractControl): { [key: string]: boolean } | null {
        let patternToMatch = /^[0-9]+$/;
        if (control.value !== null && control.value !== undefined && control.value !== "" && !patternToMatch.test(control.value)) {
            return { 'mustNumbersOnly': true };
        }
        return null;
    }

    static validValueForWeightAndHeigth(control: AbstractControl): { [key: string]: boolean } | null {
        let patternToMatch = /^[0-9.]+$/;
        if (control?.value && !patternToMatch.test(control.value)) {
            return { 'invalidWeightAndHeightValue': true };
        }
        return null;
    }

    static biosensorPattern(control: AbstractControl): { [key: string]: boolean } | null {
        let patternToMatch = /^[a-zA-Z]{1}[a-zA-Z0-9]*$/;
        if (control.value !== null &&  control.value !== undefined  && control.value.length !== 0   && !patternToMatch.test(control.value)) {
            return { 'biosensorPattern': true };
        }
        return null;
    }

    static validatePatientId(control: AbstractControl): { [key: string]: boolean } | null {
        let patternToMatch = /^[a-zA-Z0-9]*$/;
        if (control.value !== undefined && !patternToMatch.test(control.value)) {
            return { 'validatePatientId': true };
        }
        return null;
    }

    static validatePatientName(control: AbstractControl): { [key: string]: boolean } | null { 
        let patternToMatch = /^[a-zA-Z][a-zA-Z. ]*$/;
        if (control.value !== null && control.value !== undefined && control.value !== "" && !patternToMatch.test(control.value)) {
            return { 'mustCharsOnly': true };
        }
        return null;
    }

    static validatePatientNameMinMaxLength(control: AbstractControl): { [key: string]: boolean } | null { 
        if (control.value !== null && control.value !== undefined  && control.value !== "" && (control.value.length > 25)) {
            return { 'invalidRange': true };
        }
        return null;
    }

    static maxHeightCM(control: AbstractControl): { [key: string]: boolean } | null { 
        if (control.value !== null && control.value !== undefined && (control.value > 300 || control.value < 80)) {
            return { 'invalidHeightCM': true };
        }
        return null;
    }

    static maxHeightINCH(control: AbstractControl): { [key: string]: boolean } | null { 
        if (control.value !== null && control.value !== undefined && (control.value > 119 || control.value < 31.5)) {
            return { 'invalidHeightINCH': true };
        }
        return null;
    }

    static maxWeightKG(control: AbstractControl): { [key: string]: boolean } | null { 
        if (control.value !== null && control.value !== undefined && (control.value > 250 || control.value < 20)) {
            return { 'invalidWeightKG': true };
        }
        return null;
    }

    static maxWeightPOUND(control: AbstractControl): { [key: string]: boolean } | null { 
        if (control.value !== null && control.value !== undefined && (control.value > 552 || control.value < 44)) {
            return { 'invalidWeightPOUND': true };
        }
        return null;
    }

    static max30days(control: AbstractControl): { [key: string]: boolean } | null { 
        if (control.value !== null && control.value !== undefined && control.value !== "" && control.value > 30) {
            return { 'max30days': true };
        }
        return null;
    }
}
