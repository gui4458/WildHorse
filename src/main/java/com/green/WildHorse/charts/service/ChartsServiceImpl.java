package com.green.WildHorse.charts.service;


import com.green.WildHorse.charts.vo.*;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("chartsService")
public class ChartsServiceImpl implements ChartsService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public TempVO selectDailyTemp(String toDay) {
        return sqlSession.selectOne("chartsMapper.selectDailyTemp",toDay);
    }

    @Override
    public List<DiVO> selectDi(String toDay) {
        return sqlSession.selectList("chartsMapper.selectDi",toDay);
    }

    @Override
    public List<DiVO> selectTime(String toDay) {
        return sqlSession.selectList("chartsMapper.selectTime",toDay);
    }

    @Override
    public List<EfhVO> detailEfhList(String selectDay) {
        return sqlSession.selectList("chartsMapper.detailEfhList",selectDay);
    }

    @Override
    public String toDay() {
        return sqlSession.selectOne("chartsMapper.toDay");
    }
    @Override
    public List<DiVO> selectPerDay(String toDay) {
        return sqlSession.selectList("chartsMapper.selectPerDay",toDay);

    }

    @Override
    public List<DiVO> selectTab(String toDay) {
        return sqlSession.selectList("chartsMapper.selectTab",toDay);
    }

    //비디에 저장된 년월 조회 (셀렉트 박스 사용 용도)
    @Override
    public List<TempRegDiAvgVO> getTempRegDiAvg(String month) {
        return sqlSession.selectList("chartsMapper.getTempRegDiAvg",month);
    }

    //비디에 저장된 년월 조회 (셀렉트 박스 사용 용도)
    @Override
    public List<String> getMonthList() {
        return sqlSession.selectList("chartsMapper.getMonthList");
    }

    @Override
    public String maxDay() {
        return sqlSession.selectOne("chartsMapper.maxDay");
    }

    @Override
    public String minDay() {
        return sqlSession.selectOne("chartsMapper.minDay");
    }

    @Override
    public EfhVO mainEfh(String toDay) {
        return sqlSession.selectOne("chartsMapper.mainEfh",toDay);
    }

    @Override
    public TempRegAvgVO mainReh(String toDay) {
        return sqlSession.selectOne("chartsMapper.mainReh",toDay);
    }

    @Override
    public List<TempRegAvgVO> selectReg() {
        return sqlSession.selectList("chartsMapper.selectReh");
    }
}
