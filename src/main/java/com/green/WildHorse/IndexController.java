package com.green.WildHorse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping("/")
    public String maim(){
        return "redirect:/charts/main";
    }
}
