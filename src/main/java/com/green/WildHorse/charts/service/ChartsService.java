package com.green.WildHorse.charts.service;


import com.green.WildHorse.charts.vo.DiVO;

import com.green.WildHorse.charts.vo.EfhVO;

import com.green.WildHorse.charts.vo.TempVO;

import java.util.List;

public interface ChartsService {

    List<TempVO> selectDailyTemp();
    List<EfhVO> selectEfh();

    List<DiVO> selectDi();
}
