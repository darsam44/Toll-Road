/**
*  Predictor for out_section from model/60f409c95e269e0554013c3d
*  Predictive model by BigML - Machine Learning Made Easy
*/
function predictOut_section(car_type, in_section, hour_in, hour_out, dateDayOfMonth) {
    if (car_type == null) {
        return 4.04;
    }
    else if (car_type=="car") {
        if (hour_in == null) {
            return 2.81818;
        }
        else if (hour_in > 3) {
            if (in_section == null) {
                return 3.25;
            }
            else if (in_section > 3) {
                if (dateDayOfMonth == null) {
                    return 1.5;
                }
                else if (dateDayOfMonth > 17) {
                    return 2;
                }
                else if (dateDayOfMonth <= 17) {
                    return 1;
                }
            }
            else if (in_section <= 3) {
                if (dateDayOfMonth == null) {
                    return 3.83333;
                }
                else if (dateDayOfMonth > 6) {
                    if (dateDayOfMonth > 12) {
                        return 5;
                    }
                    else if (dateDayOfMonth <= 12) {
                        return 4;
                    }
                }
                else if (dateDayOfMonth <= 6) {
                    if (dateDayOfMonth > 1) {
                        if (dateDayOfMonth > 2) {
                            return 3;
                        }
                        else if (dateDayOfMonth <= 2) {
                            return 4;
                        }
                    }
                    else if (dateDayOfMonth <= 1) {
                        return 2;
                    }
                }
            }
        }
        else if (hour_in <= 3) {
            if (dateDayOfMonth == null) {
                return 1.66667;
            }
            else if (dateDayOfMonth > 8) {
                return 2;
            }
            else if (dateDayOfMonth <= 8) {
                return 1;
            }
        }
    }
    else if (car_type!="car") {
        if (car_type=="bus") {
            return 5;
        }
        else if (car_type!="bus") {
            if (hour_out == null) {
                return 4.07692;
            }
            else if (hour_out > 17) {
                if (dateDayOfMonth == null) {
                    return 3.2;
                }
                else if (dateDayOfMonth > 10) {
                    return 3;
                }
                else if (dateDayOfMonth <= 10) {
                    return 4;
                }
            }
            else if (hour_out <= 17) {
                if (car_type=="truck") {
                    return 4;
                }
                else if (car_type!="truck") {
                    return 5;
                }
            }
        }
    }
    return null;
}