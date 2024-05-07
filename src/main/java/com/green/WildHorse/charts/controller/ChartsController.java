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
        String toDay=chartsService.toDay();
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

        List<DiVO> diPerDay= chartsService.selectPerDay(toDay);
        model.addAttribute("diPerDay",diPerDay);
        System.out.println(diPerDay);

        List<DiVO> selectTab= chartsService.selectTab(toDay);
        model.addAttribute("selectTab",selectTab);
        return "content/main";
    }

    @ResponseBody
    @PostMapping("/main")
    public Map<String,Object> getTemp(HttpSession session,@RequestBody Map<String,Object> data) {
        System.out.println("post 시작~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.println(data.get("toDay"));
        List<TempRegAvgVO> regList = chartsService.selectReg();
        data.put("regList",regList);
        TempRegAvgVO avg = chartsService.mainReh((String) data.get("toDay"));
        data.put("avg",avg);
        List<DiVO> timeList=chartsService.selectTime((String) data.get("toDay"));
        data.put("timeList",timeList);
        System.out.println(data.get("timeList"));
        List<DiVO> diPerDay= chartsService.selectPerDay((String) data.get("toDay"));
        data.put("diPerDay",diPerDay);
        TempVO temps = chartsService.selectDailyTemp((String) data.get("toDay"));
        data.put("temps",temps);
        EfhVO efh = chartsService.mainEfh((String) data.get("toDay"));
        data.put("efh",efh);

        session.setAttribute("data",data);
        return data;
    }

    @GetMapping("/efh")
    public String efh(Model model){
        String toDay= chartsService.toDay();
        EfhVO toDayEfh = chartsService.mainEfh(toDay);
        model.addAttribute("toDayEfh",toDayEfh);
        List<EfhVO> EfhList = chartsService.detailEfhList(toDay);
        model.addAttribute("EfhList",EfhList);
        model.addAttribute("toDay",toDay);
        return "content/efh";
    }

    @ResponseBody
    @PostMapping("/efh")
    public Map<String,Object> efhList(@RequestBody Map<String,Object> efhData){
        List<EfhVO> efhList = chartsService.detailEfhList((String)efhData.get("selectDay"));
        EfhVO toDayEfh = chartsService.mainEfh((String)efhData.get("selectDay"));
//        Map<String,Object> efhData = new HashMap<String, Object>();
        efhData.put("efhList",efhList);
        efhData.put("toDayEfh",toDayEfh);
        return efhData;
    }

    @ResponseBody
    @PostMapping("/selectChangeData")
    public Map<String,Object> selectChangeData(@RequestBody Map<String,Object> efhData){
        System.out.println("post실행~");
        System.out.println(efhData);
        List<EfhVO> efhList = chartsService.detailEfhList((String)efhData.get("selectDay"));
        EfhVO toDayEfh = chartsService.mainEfh((String)efhData.get("selectDay"));
        efhData.put("efhList",efhList);
        efhData.put("toDayEfh",toDayEfh);
        System.out.println(efhData);
        System.out.println(efhList);
        System.out.println(toDayEfh);
        return efhData;
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
