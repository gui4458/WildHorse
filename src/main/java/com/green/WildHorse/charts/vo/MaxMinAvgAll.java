package com.green.WildHorse.charts.vo;

import lombok.Data;

@Data
public class MaxMinAvgAll {
    private int no;
    private String month;
    private double temperMax;
    private double temperMin;
    private double temperAvg;
    private double rehMax;
    private double rehMin;
    private double rehAvg;
    private double diMax;
    private double diMin;
    private double diAvg;
}
