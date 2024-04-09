package com.green.WildHorse.controller;

import com.green.WildHorse.charts.service.ChartsService;
import com.green.WildHorse.charts.vo.TempRegAvgVO;
import com.green.WildHorse.charts.vo.TempVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class Admin {
    @Resource(name = "chartsService")
    private ChartsService chartsService;

    @GetMapping("/admin")
    public String front(HttpSession session){
        Map<String,Object> data =new HashMap<String,Object>();
        List<TempVO> tempsList = chartsService.selectDailyTemp();
        List<TempRegAvgVO> regList = chartsService.selectReg();
        data.put("tempsList",tempsList);
        data.put("regList",regList);
        session.setAttribute("data",data);
        System.out.println(data);
        return "/admin/admin";
    }

}
