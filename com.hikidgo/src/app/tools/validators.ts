import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

interface ValidationResult {
    [key: string]: boolean;
}


export class CustomValidators {
    
    public static requireTrue(control: FormControl): ValidationResult {
        if(control.value == true){
            return null;
        }

        return { requireTrue: true };
    }

    public static username(control: FormControl): ValidationResult {
        if (!control.value) {
            return null;
        }

        var regexAlphaNumeric = /^[a-zA-Z0-9_]{3,16}$/;
        var valid = regexAlphaNumeric.test(control.value);
        if (valid) {
            return null;
        }
        return { username: true };
    }

    public static numeric(control: FormControl): ValidationResult {
        if (!control.value) {
            return null;
        }

        var regexNumeric = /^\d+$/;
        var valid = regexNumeric.test(control.value);
        if (valid) {
            return null;
        }
        return { numeric: true };
    }

    public static guid(control: FormControl): ValidationResult {
        if (!control.value) {
            return null;
        }

        var regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
        var valid = regex.test(control.value);
        if (valid) {
            return null;
        }
        return { guid: true };
    }

    public static email(control: FormControl): ValidationResult {
        var fail = { email: true };
        if (!control.value) {
            return null;
        }
        var value = control.value;
        if (value.length > 255) {
            return fail;
        }

        if (value.length < 5) {
            return fail;
        }

        var reg = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/;
        value = value.toLowerCase();
        var valid = reg.test(value);
        if (valid) {
            return null;
        }
        return fail;
    }

    public static password(control: FormControl): ValidationResult {
        var fail = { password: true };
        if (!control.value) {
            return null;
        }
        var value = control.value;
        if (value.length > 255) {
            return fail;
        }

        if (value.length < 6) {
            return fail;
        }

        //require non letter or digit
        if (!(/[$-/:-?{-~!"#^_`\[\]]/.test(value))) {
            return fail;
        }

        //Require a digit
        if (!(/\d/.test(value))) {
            return fail;
        }

        //require a upper
        if (!(/[A-Z]/.test(value))) {
            return fail;
        }

        //require a lower
        if (!(/[a-z]/.test(value))) {
            return fail;
        }

        return null;
    }
    
    static dateMinimum(mindate: Date): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            var fail = { minDateExceeded: true };
            if (control.value == null) {
                return null;
            }
            const controlDate = moment(control.value, '01/01/1990');
            if (!controlDate.isValid()) {
                return null;
            }

            const validationDate = moment(mindate);

            return controlDate.isBefore(validationDate) ? fail : null;
        };
    }

    public static postalCode(control: FormControl): ValidationResult {
        var fail = { postalCode: true };
        if (!control.value) {
            return null;
        }
        var value = control.value;

        //Require a digit
        if (!(/^\d{5}$/.test(value))) {
            return fail;
        }

        return null;
    }

    public static matchControls(controlName1:string, controlName2:string) {
        return (group : FormGroup) => {
            var c1 = group.controls[controlName1];
            var c2 = group.controls[controlName2];

            if (c1.value === c2.value) {
                return null;
            }

            return  c2.setErrors({notEquivalent:true});
        };
    }

    public static controlDate1LessThanOrEqualToControlDate2(controlName1: string, controlName2: string) {
        return (group: FormGroup) => {
                      
            var c1 = group.controls[controlName1];
            var c2 = group.controls[controlName2];

            if(c1.value === null && c2.value === null){
                return null;
            }
            
            if(c1.value !== null && c2.value !== null && c1.value.isSameOrBefore(c2.value)) {
                return null;
            }
            
            return c2.setErrors({ notValidDateRange: true });
        };
    }

    public static valuesMatch(controlName1: string, controlName2: string) {
        return (group: FormGroup) => {
                      
            var c1 = group.controls[controlName1];
            var c2 = group.controls[controlName2];

            if(c1.value === null && c2.value === null){
                return null;
            }
            
            if(c1.value == c2.value) {
                return null;
            }
            
            return c2.setErrors({ notMatch: true });
        };
    }
}