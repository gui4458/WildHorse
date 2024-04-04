package com.green.WildHorse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Admin {

    @GetMapping("/admin")
    public String front(){
        return "/admin/admin";
    }

}
