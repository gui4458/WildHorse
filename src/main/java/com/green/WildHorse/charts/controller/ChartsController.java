package com.green.WildHorse.charts.controller;

import com.green.WildHorse.charts.service.ChartsService;
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
    private String chartMain() {
        return "content/main/main";
    }

    @ResponseBody
    @PostMapping("/main")
    private List<TempVO> getTemp() {
        List<TempVO> tempsList = chartsService.selectDailyTemp();
        return tempsList;
    }

    @GetMapping("/efh")
    private String efh() {
        return "content/main/efh";
    }
    @ResponseBody
    @PostMapping("/efh")
    private List<EfhVO> getEfh(){
        List<EfhVO> efhList = chartsService.selectEfh();
        System.out.println(efhList);
        return efhList;
    }
}
