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
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/charts")
public class ChartsController {
    @Resource(name = "chartsService")
    private ChartsService chartsService;

    @GetMapping("/main")
    public String chartMain(Model model) {
        String toDay="2021-12-10";
        model.addAttribute("toDay",toDay);

        TempVO temps = chartsService.selectDailyTemp(toDay);
        model.addAttribute("temps",temps);

        List<TempRegAvgVO> regList = chartsService.selectReg();
        model.addAttribute("regList",regList);

        List<DiVO> timeList=chartsService.selectTime(toDay);
        model.addAttribute("timeList",timeList);

        EfhVO efh = chartsService.mainEfh(toDay);
        model.addAttribute("efh",efh);

        TempRegAvgVO avg = chartsService.mainReh(toDay);
        model.addAttribute("avg",avg);

        return "content/main";
    }

    @ResponseBody
    @PostMapping("/main")
    public Map<String,Object> getTemp(HttpSession session,@RequestBody Map<String,String> toDay) {
        System.out.println("post 시작~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.println(toDay.get("toDay"));
        Map<String,Object> data =new HashMap<String,Object>();
        List<TempRegAvgVO> regList = chartsService.selectReg();
        data.put("regList",regList);
        TempRegAvgVO avg = chartsService.mainReh(toDay.get("toDay"));
        data.put("avg",avg);
        List<DiVO> timeList=chartsService.selectTime(toDay.get("toDay"));
        data.put("timeList",timeList);
        System.out.println(data.get("timeList"));
        session.setAttribute("data",data);
        return data;
    }

    @GetMapping("/efh")
    public String efh(){
        return "content/efh";
    }

    @ResponseBody
    @PostMapping("/efh")
    public void efhList(){

    }

    @GetMapping("/test")
    public String test(){
        return "content/hyeTest";
    }

    @ResponseBody
    @PostMapping("/test")
    public List<DiVO> hyeTest(){
       List<DiVO> diList = chartsService.selectDi("2021-12-20");
       return diList;

    }
    @GetMapping("/copyAdmin")
    public String copyTest(){
        return "admin/copy_admin";
    }



}
