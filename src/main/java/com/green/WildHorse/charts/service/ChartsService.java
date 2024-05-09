package com.green.WildHorse.charts.service;


import com.green.WildHorse.charts.vo.*;

import java.util.List;

public interface ChartsService {

    TempVO selectDailyTemp(String toDay);
    EfhVO mainEfh(String toDay);
    TempRegAvgVO mainReh(String toDay);
    List<TempRegAvgVO> selectReg();
    List<DiVO> selectDi(String toDay);
    List<DiVO> selectTime(String toDay);
    List<EfhVO> detailEfhList(String selectDay);
    String toDay();
    List<DiVO> selectPerDay(String toDay);
    List<DiVO> selectTab(String toDay);
    //불쾌지수 페이지에서 한 달동안의 일일 평균 온도, 습도, di 조회를 위한 쿼리
    List<TempRegDiAvgVO> getTempRegDiAvg(String month);
    //비디에 저장된 년월 조회 (셀렉트 박스 사용 용도)
    List<String> getMonthList();


    String maxDay();
    String minDay();

    //불쾌지수 페이지 띄워줄 데이터
    MaxMinAvgAll getMaxMinAvgAll(String month);
    //202202 월데이터 불쾌지수 페이지 들어갈때 넣어줄 월
    String month();



}
