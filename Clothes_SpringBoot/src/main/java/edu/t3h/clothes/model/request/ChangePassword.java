package edu.t3h.clothes.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePassword {
    public String oldPassword;
    public String newPassword;
    public String confirmPassword;
}
