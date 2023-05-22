import { Component, DoCheck, OnInit } from "@angular/core";
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-employee-info",
    templateUrl: "./employee-info.component.html",
    styleUrls: ["./employee-info.component.scss"],
})
export class EmployeeInfoComponent implements OnInit, DoCheck {
    formSubmit = false;
    addNewSkill = false;
    employeeForm: FormGroup;
    items!: FormArray;
    skillArr: any = [];
    addNewProject = false;
    constructor(private fb: FormBuilder, private toaster: ToastrService) {
        this.employeeForm = fb.group({
            userName: new FormControl("", [Validators.required]),
            email: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
            ]),
            password: new FormControl("", Validators.required),
            graduationYear: new FormControl("", Validators.required),
            college: new FormControl("", Validators.required),
            experiance: new FormControl("", Validators.required),
            projectDetails: new FormArray([]),
            skillSet: new FormArray([]),
        });
    }
    ngDoCheck(): void {
        if (this.skillSet.length > 0) {
            this.skillArr = this.skillSet.value.filter((el: any) => el.name !== "");
        }
    }
    ngOnInit(): void {
        this.addSkills("");
        this.addProjects("");
    }

    get skillSet(): FormArray {
        return this.employeeForm.controls.skillSet as FormArray;
    }
    get projectDetails(): FormArray {
        return this.employeeForm.controls.projectDetails as FormArray;
    }

    newSkills(): FormGroup {
        return this.fb.group({
            name: new FormControl("", [Validators.required]),
        });
    }
    newProject(): FormGroup {
        return this.fb.group({
            name: new FormControl("", [Validators.required]),
            client: new FormControl("", [Validators.required]),
            role: new FormControl("", [Validators.required]),
            teamSize: new FormControl("", [Validators.required]),
            projectFrom: new FormControl("", [Validators.required]),
            projectTill: new FormControl("", [Validators.required]),
            technologyUsed: new FormControl("", [Validators.required]),
            description: new FormControl("", [Validators.required]),
            updates: new FormControl("", [Validators.required]),
        });
    }
    get form() {
        return this.employeeForm.controls;
    }

    get formSkills() {
        return this.skillSet.controls;
    }

    addSkills(type: string) {
        if (type) {
            this.addNewSkill = true;
        }
        if (this.skillSet.valid) {
            this.addNewSkill = false;
            this.skillSet.push(this.newSkills());
            this.formSubmit = false;
        }
    }

    removeSkills(index: number) {
        const control = <FormArray>this.employeeForm.controls["skillSet"];
        control.removeAt(index);
    }
    addProjects(type: string) {
        if (type) {
            this.addNewProject = true;
        }
        if (this.employeeForm.valid && this.skillSet.valid) {
            this.projectDetails.push(this.newProject());
            this.addNewProject = false;
            this.formSubmit = false;
        }
    }
    removeProject(index: number) {
        const control = <FormArray>this.employeeForm.controls["projectDetails"];
        control.removeAt(index);
    }
    addInfo(form: boolean) {
        console.log(this.employeeForm.value)
        this.formSubmit = true;
        if (form) {
            this.toaster.success("Project add successfully done!");
        }
    }
}
