package com.green.WildHorse.charts.service;


import com.green.WildHorse.charts.vo.DiVO;

import com.green.WildHorse.charts.vo.EfhVO;

import com.green.WildHorse.charts.vo.TempRegAvgVO;
import com.green.WildHorse.charts.vo.TempVO;

import java.util.List;

public interface ChartsService {

    TempVO selectDailyTemp(String toDay);
    EfhVO mainEfh(String toDay);
    TempRegAvgVO mainReh(String toDay);
    List<TempRegAvgVO> selectReg();
    List<DiVO> selectDi(String toDay);
    List<DiVO> selectTime(String toDay);
    DiVO selectPerDay(String toDay);
}
