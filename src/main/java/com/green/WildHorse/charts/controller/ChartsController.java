package com.green.WildHorse.charts.controller;

import com.green.WildHorse.charts.service.ChartsService;
import com.green.WildHorse.charts.vo.DiVO;
import com.green.WildHorse.charts.vo.EfhVO;
import com.green.WildHorse.charts.vo.TempRegAvgVO;
import com.green.WildHorse.charts.vo.TempVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/charts")
public class ChartsController {
    @Resource(name = "chartsService")
    private ChartsService chartsService;

    @GetMapping("/main")

    public String chartMain() {


        return "content/main/main";
    }

    @ResponseBody
    @PostMapping("/main")
    public Map<String,Object> getTemp(HttpSession session) {
        Map<String,Object> data =new HashMap<String,Object>();
        List<TempVO> tempsList = chartsService.selectDailyTemp();
        List<TempRegAvgVO> regList = chartsService.selectReg();
        data.put("tempsList",tempsList);
        data.put("regList",regList);
        session.setAttribute("data",data);

        List<DiVO> timeList=chartsService.selectTime();
        data.put("timeList",timeList);
        System.out.println(data.get("timeList"));
        return data;
    }

    @GetMapping("/efh")
    public String efh(){
        return "content/main/efh";
    }

    @ResponseBody
    @PostMapping("/efh")
    public List<EfhVO> efhList(){
        List<EfhVO> efhList = chartsService.selectEfh();
        return efhList;

    }

    @GetMapping("/test")
    public String test(){
        return "content/hyeTest";
    }

    @ResponseBody
    @PostMapping("/test")
    public List<DiVO> hyeTest(){
       List<DiVO> diList = chartsService.selectDi();
       return diList;

    }
    @GetMapping("/copyAdmin")
    public String copyTest(){
        return "admin/copy_admin";
    }



}
