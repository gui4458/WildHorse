package com.green.WildHorse.charts.service;

import com.green.WildHorse.charts.vo.TempVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("chartsService")
public class ChartsServiceImpl implements ChartsService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<TempVO> selectDailyTemp() {
        return sqlSession.selectList("chartsMapper.selectDailyTemp");
    }
}
