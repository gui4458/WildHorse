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
    public List<TempVO> selectDailyTemp() {
        return sqlSession.selectList("chartsMapper.selectDailyTemp");
    }

    @Override
    public List<DiVO> selectDi() {
        return sqlSession.selectList("chartsMapper.selectDi");
    }

    @Override
    public List<DiVO> selectTime() {
        return sqlSession.selectList("chartsMapper.selectTime");
    }

    @Override
    public List<EfhVO> selectEfh() {
        return sqlSession.selectList("chartsMapper.selectEfh");
    }

    @Override
    public List<TempRegAvgVO> selectReg() {
        return sqlSession.selectList("chartsMapper.selectReh");
    }
}
