package com.green.WildHorse.charts.controller;

import com.green.WildHorse.charts.service.ChartsService;
import com.green.WildHorse.charts.vo.*;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/charts")
public class ChartsController {
    @Resource(name = "chartsService")
    private ChartsService chartsService;

    @GetMapping("/main")
    public String chartMain(Model model,HttpSession session) {
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

        String maxDay = chartsService.maxDay();
        session.setAttribute("maxDay",maxDay);
        String minDay = chartsService.minDay();
        session.setAttribute("minDay",minDay);
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
        System.out.println("셀렉트탭ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ");
        List<DiVO> selectTab= chartsService.selectTab((String) data.get("toDay"));
        data.put("selectTab",selectTab);
        session.setAttribute("data",data);
        return data;
    }

    @GetMapping("/efh")
    public String efh(Model model){
        String toDay= chartsService.toDay();
        EfhVO toDayEfh = chartsService.mainEfh(toDay);
        model.addAttribute("toDayEfh",toDayEfh);
        List<EfhVO> EfhList = chartsService.detailEfhList(toDay);
        model.addAttribute("efhList",EfhList);
        model.addAttribute("toDay",toDay);
        return "content/efh copy";
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
    public String test(Model model){

        //샐랙트 박스에 뿌려줄 월 데이터 조회
        model.addAttribute("monthList", chartsService.getMonthList());
        String month =chartsService.month();
        double temperMax=0.0;
        double temperMin=0.0;
        double temperAvg=0.0;
        //System.out.println(tempRegAvg.get(1));

//        if (temperMax>tempRegAvg.get(1).getTemperAvg()){
//            temperMax = tempRegAvg.get(1).getTemperAvg();
//            System.out.println(temperMax);
//        }


        // model.addAttribute("allData",chartsService.getMaxMinAvgAll(month));
        //System.out.println("data : "+model.addAttribute("allData",chartsService.getMaxMinAvgAll(month)));
        return "content/hyeTest";
    }

    @ResponseBody
    @PostMapping("/test")
    public Map<String, Object> hyeTest(@RequestParam(name = "detailMonth", required = false, defaultValue = "202202") String detailMonth
            , @RequestParam(name = "compareMonth1", required = false, defaultValue = "202202") String compareMonth1
            , @RequestParam(name = "compareMonth2", required = false, defaultValue = "202202") String compareMonth2){


        //월별 일일 평균 온도,습도,di 조회
        //최초 조회 시 2021-09월 데이터 조회
        List<TempRegDiAvgVO> tempRegDiAvgList1 = chartsService.getTempRegDiAvg(detailMonth);

        List<TempRegDiAvgVO> tempRegDiAvgList2 = chartsService.getTempRegDiAvg(compareMonth1);
        List<TempRegDiAvgVO> tempRegDiAvgList3 = chartsService.getTempRegDiAvg(compareMonth2);

        Map<String, Object> result = new HashMap<>();


        result.put("detailList", tempRegDiAvgList1);
        result.put("compareList1", tempRegDiAvgList2);
        result.put("compareList2", tempRegDiAvgList3);

        return result;
    }

    //샐랙트 박스에서 날짜 변경 시 실행
    @ResponseBody
    @PostMapping("/reTest")
    public List<TempRegDiAvgVO> hyeTest(@RequestParam(name = "month") String month){

        List<TempRegDiAvgVO> chartData = chartsService.getTempRegDiAvg(month.replace("-", ""));
        return chartData;
    }

    @GetMapping("/copyAdmin")
    public String copyTest(){
        return "admin/copy_admin";
    }



}
