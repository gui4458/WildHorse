package com.green.WildHorse.controller;

import com.green.WildHorse.charts.service.ChartsService;
import com.green.WildHorse.charts.vo.DiVO;
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
        String toDay="2021-12-20";
        Map<String,Object> data =new HashMap<String,Object>();
        List<TempRegAvgVO> regList = chartsService.selectReg();
        data.put("regList",regList);
        session.setAttribute("data",data);
        System.out.println(data);

        List<DiVO> timeList=chartsService.selectTime(toDay);
        data.put("timeList",timeList);
        System.out.println(data.get("timeList"));
        return "/admin/admin";
    }

}
