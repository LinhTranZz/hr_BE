export enum PermissionEnum {
    IS_ADMIN = "system:is_admin",

    FULL_ACCESS = "system:full_access",

    MANAGE_SYSTEM_SETTINGS = "system:manage_system_settings",
    VIEW_SYSTEM_SETTINGS = "system:view_system_settings",

    MANAGE_SHIFT = "system:manage_shift",
    VIEW_SHIFT = "system:view_shift",

    MANAGE_DETAILS_SHIFT = "system:manage_details_shift",
    VIEW_DETAILS_SHIFT = "system:view_details_shift",

    MANAGE_DEPARTMENT = "system:manage_department",
    VIEW_DEPARTMENT = "system:view_department",

    MANAGE_ROLE = "system:manage_role",
    VIEW_ROLE = "system:view_role",

    MANAGE_ROLE_PERMISSIONS = "system:manage_role_permissions",

    MANAGE_PRIORITY = "system:manage_priority",
    VIEW_PRIORITY = "system:view_priority",

    ASSIGN_PRIORITY = "system:assign_priority",
    UNASSIGN_PRIORITY = "system:unassign_priority",
    VIEW_ASSIGNED_PRIORITY = "system:view_assigned_priority",

    MANAGE_ALLOWANCE = "system:manage_allowance",
    VIEW_ALLOWANCE = "system:view_allowance",

    ASSIGN_ALLOWANCE = "system:assign_allowance",
    UNASSIGN_ALLOWANCE = "system:unassign_allowance",
    VIEW_ASSIGNED_ALLOWANCE = "system:view_assigned_allowance",

    MANAGE_HOLIDAY = "system:manage_holiday",
    VIEW_HOLIDAY = "system:view_holiday",

    MANAGE_BONUS = "system:manage_bonus",
    VIEW_BONUS = "system:view_bonus",

    ASSIGN_BONUS = "system:assign_bonus",
    UNASSIGN_BONUS = "system:unassign",
    VIEW_ASSIGNED_BONUS = "system:view_assigned_bonus",

    MANAGE_PUNISHMENT = "system:manage_punishment",
    VIEW_PUNISHMENT = "system:view_punishment",

    ASSIGN_PUNISHMENT = "system:assign_punishment",
    UNASSIGN_PUNISHMENT = "system:unassign_punishment",
    VIEW_ASSIGNED_PUNISHMENT = "system:view_assigned_punishment",

    MANAGE_ACCOUNT = "system:manage_account",
    VIEW_ACCOUNT = "system:view_account",

    VIEW_DEPARTMENT_HISTORY = "system:view_department_history",
    DELETE_DEPARTMENT_HISTORY = "system:delete_department_history",

    VIEW_SALARY_HISTORY = "system:view_salary_history",
    DELETE_SALARY_HISTORY = "system:delete_salary_history",

    MANAGE_EMPLOYEE = "profile:manage_employee",
    VIEW_EMPLOYEE = "profile:view_employee",

    CREATE_LEAVE_REQUEST = "profile:create_leave_request",
    UPDATE_LEAVE_REQUEST = "profile:update_leave_request",
    DELETE_LEAVE_REQUEST = "profile:delete_leave_request",
    VIEW_LEAVE_REQUEST = "profile:view_leave_request",

    MANAGE_OVERTIME = "attendance:manage_overtime",
    VIEW_OVERTIME = "attendance:view_overtime",

    VIEW_ATTENDANCE = "attendance:view_attendance",
    VIEW_DETAILS_ATTENDANCE = "attendance:view_details_attendance",
    EXPORT_ATTENDANCE = "attendance:export_attendance",

    VIEW_TIMEKEEPER = "attendance:view_timekeeper",
    MANAGE_TIMEKEEPER = "attendance:manage_timekeeper",

    MANAGE_SALARY = "payroll:manage_salary",
    VIEW_SALARY = "payroll:view_salary",
    EXPORT_SALARY = "payroll:export_salary",
}