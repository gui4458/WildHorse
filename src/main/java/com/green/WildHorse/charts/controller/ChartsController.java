package com.green.WildHorse.charts.controller;

import com.green.WildHorse.charts.service.ChartsService;
import com.green.WildHorse.charts.vo.DiVO;
import com.green.WildHorse.charts.vo.EfhVO;
import com.green.WildHorse.charts.vo.TempVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

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
    public List<TempVO> getTemp() {
        List<TempVO> tempsList = chartsService.selectDailyTemp();
        return tempsList;
    }

    @GetMapping("/efh")
    public String efh(){
        return "content/efh";
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
}
