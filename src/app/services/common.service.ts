import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { Subject } from "rxjs";
import { environment } from "../../environment/environment";
import { loginInterface } from "../model/login.interface";

@Injectable({
    providedIn: "root",
})
export class CommonService {
    logToken = new Subject();

    getDecryptedItem(data: string | null) {
        if (data) {
            const bcrypt = CryptoJS.AES.decrypt(
                data
                    .replace("xMl3Jk", "+")
                    .replace("Por21Ld", "/")
                    .replace("Ml32", "=")
                    .replace("xMl3Jk", "+")
                    .replace("Por21Ld", "/")
                    .replace("Ml32", "=")
                    .replace("xMl3Jk", "+")
                    .replace("Por21Ld", "/")
                    .replace("Ml32", "="),
                environment.S_KEY,
            );
            if (bcrypt.toString()) {
                return JSON.parse(bcrypt.toString(CryptoJS.enc.Utf8));
            }
            return data;
        }
        return false;
    }

    getEncryptedItem(data: loginInterface) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), environment.S_KEY)
            .toString()
            .replace("+", "xMl3Jk")
            .replace("/", "Por21Ld")
            .replace("=", "Ml32")
            .replace("+", "xMl3Jk")
            .replace("/", "Por21Ld")
            .replace("=", "Ml32")
            .replace("+", "xMl3Jk")
            .replace("/", "Por21Ld")
            .replace("=", "Ml32");
    }

    getToken() {
        if (localStorage.getItem("loginToken")) {
            return true;
        }
        return false;
    }
}
