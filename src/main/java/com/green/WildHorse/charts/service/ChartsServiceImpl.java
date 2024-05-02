package com.green.WildHorse.charts.service;


import com.green.WildHorse.charts.vo.DiVO;

import com.green.WildHorse.charts.vo.EfhVO;

import com.green.WildHorse.charts.vo.TempRegAvgVO;
import com.green.WildHorse.charts.vo.TempVO;
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
