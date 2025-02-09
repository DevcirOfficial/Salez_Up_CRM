<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\ManagerController;

Route::post('managers', [ManagerController::class, 'store']); 
Route::get('managers', [ManagerController::class, 'index']);
Route::get('managers/{id}', [ManagerController::class, 'show']); 
Route::put('managers/{id}', [ManagerController::class, 'update']); 
Route::delete('managers/{id}', [ManagerController::class, 'destroy']); 


use App\Http\Controllers\SalesAgentController;

Route::post('sales_agents', [SalesAgentController::class, 'store']); 
Route::get('sales_agents', [SalesAgentController::class, 'index']); 
Route::get('sales_agents/{id}', [SalesAgentController::class, 'show']); 
Route::get('sales_agents/team/{id}', [SalesAgentController::class, 'getByTeamId']);
Route::put('sales_agents/{id}', [SalesAgentController::class, 'update']); 
Route::put('sales_agents_teams', [SalesAgentController::class, 'updateKpiDataTeams']); 
Route::delete('sales_agents/{id}', [SalesAgentController::class, 'destroy']); 



use App\Http\Controllers\TeamController;

Route::post('teams', [TeamController::class, 'store']);     
Route::get('teams', [TeamController::class, 'index']);        
Route::get('teams/{id}', [TeamController::class, 'show']);    
Route::put('teams_update/{id}', [TeamController::class, 'update']);   
Route::delete('teams/{id}', [TeamController::class, 'destroy']); 
Route::put('teams/update-name-from-leader/{team_id}', [TeamController::class, 'updateTeamNameFromLeader']);
Route::delete('team_leader_team_delete/{team_id}', [TeamController::class, 'destroyByTeamLeader']);



use App\Http\Controllers\TeamLeaderController;

Route::post('team_leaders', [TeamLeaderController::class, 'store']);        
Route::get('team_leaders', [TeamLeaderController::class, 'index']);         
Route::get('team_leaders/{id}', [TeamLeaderController::class, 'show']);  
Route::put('team_leaders/{id}', [TeamLeaderController::class, 'update']);   
Route::delete('team_leaders/{id}', [TeamLeaderController::class, 'destroy']); 
Route::put('/team-leaders/kpi-data', [TeamLeaderController::class, 'updateKpiDataByIds']);


use App\Http\Controllers\CampaignController;


Route::get('campaigns', [CampaignController::class, 'index']);            
Route::get('campaigns/{id}', [CampaignController::class, 'show']);      
Route::post('campaigns', [CampaignController::class, 'store']);          
Route::put('campaigns/{id}', [CampaignController::class, 'update']);     
Route::delete('campaigns/{id}', [CampaignController::class, 'destroy']);  
Route::put('/campaigns/update_name/{campaignId}', [CampaignController::class, 'updateCampaignNameByCampaignId']);

use App\Http\Controllers\TeamAndTeamLeaderController;

Route::get('team_and_team_leader', [TeamAndTeamLeaderController::class, 'index']);           
Route::get('team_and_team_leader/{id}', [TeamAndTeamLeaderController::class, 'show']);      
Route::post('team_and_team_leader', [TeamAndTeamLeaderController::class, 'store']);           
Route::put('team_and_team_leader_update/{id}', [TeamAndTeamLeaderController::class, 'update']);      
Route::delete('team_and_team_leader_delete/{id}', [TeamAndTeamLeaderController::class, 'destroy']);  
Route::post('update_team_leader', [TeamAndTeamLeaderController::class, 'updateTeamLeader']);
Route::put('team_leader_update/{id}', [TeamAndTeamLeaderController::class, 'Team_Leader_Id_Update']);
Route::put('kpiUpdate_Leader/{id}', [TeamAndTeamLeaderController::class, 'updateLeaderKpi']);
Route::put('kpiUpdate/{id}', [TeamAndTeamLeaderController::class, 'updateKpi']);

Route::get('team_leader/by_team/{team_id}', [TeamAndTeamLeaderController::class, 'getTeamLeaderByTeamId']);



use App\Http\Controllers\LeaderKpiController;

Route::get('leader-kpi', [LeaderKpiController::class, 'index']);
Route::post('leader-kpi', [LeaderKpiController::class, 'store']);
Route::get('leader-kpi/{id}', [LeaderKpiController::class, 'show']);
Route::put('leader-kpi/{id}', [LeaderKpiController::class, 'update']);
Route::put('leader-kpi-Update/{id}', [LeaderKpiController::class, 'updateWithTeamId']);
Route::delete('leader-kpi/{id}', [LeaderKpiController::class, 'destroy']);



use App\Http\Controllers\CampaignsAndTeamsController;

Route::get('campaigns_and_teams', [CampaignsAndTeamsController::class, 'index']);
Route::get('campaigns_and_teams/{id}', [CampaignsAndTeamsController::class, 'show']);
Route::post('campaigns_and_teams', [CampaignsAndTeamsController::class, 'store']);
Route::put('campaigns_and_teams_update/{id}', [CampaignsAndTeamsController::class, 'update']);
Route::delete('campaigns_and_teams/{id}', [CampaignsAndTeamsController::class, 'destroy']);
Route::put('remove-dept-head/{Dept_Head_id}', [CampaignsAndTeamsController::class, 'removeDeptHeadId']);
Route::put('remove-Junior-dept-head/{Junior_Head_id}', [CampaignsAndTeamsController::class, 'removeJuniorDeptHeadId']);
Route::put('/campaigns_and_teams_update-team/{campaign_id}', [CampaignsAndTeamsController::class, 'updateTeamByCampaignId']);


use App\Http\Controllers\KpiInfoController;

Route::get('/kpi_info', [KpiInfoController::class, 'index']);
Route::post('/kpi_info', [KpiInfoController::class, 'store']);
Route::get('/kpi_info/{id}', [KpiInfoController::class, 'show']);
Route::put('/kpi_info/{id}', [KpiInfoController::class, 'update']);
Route::put('/kpi_info_update/{kpi_name}', [KpiInfoController::class, 'updateByName']);
Route::delete('/kpi_info/{id}', [KpiInfoController::class, 'destroy']);


use App\Http\Controllers\VoucherController;

Route::get('vouchers', [VoucherController::class, 'index']);
Route::get('vouchers/{id}', [VoucherController::class, 'show']);
Route::post('vouchers', [VoucherController::class, 'store']);
Route::put('vouchers/{id}', [VoucherController::class, 'update']);
Route::delete('vouchers/{id}', [VoucherController::class, 'destroy']);
Route::put('vouchers', [VoucherController::class, 'updateAll']);


use App\Http\Controllers\FoodController;

Route::get('foods', [FoodController::class, 'index']);
Route::get('foods/{id}', [FoodController::class, 'show']);
Route::post('foods', [FoodController::class, 'store']);
Route::put('foods/{id}', [FoodController::class, 'update']);
Route::delete('foods/{id}', [FoodController::class, 'destroy']);
Route::put('foods', [FoodController::class, 'updateAll']);


use App\Http\Controllers\ExperienceController;

Route::get('experiences', [ExperienceController::class, 'index']);
Route::post('experiences', [ExperienceController::class, 'store']);
Route::get('experiences/{id}', [ExperienceController::class, 'show']);
Route::put('experiences/{id}', [ExperienceController::class, 'update']);
Route::delete('experiences/{id}', [ExperienceController::class, 'destroy']);
Route::put('experiences', [ExperienceController::class, 'updateAll']);


use App\Http\Controllers\TvScreenController;

Route::get('tv_screens', [TvScreenController::class, 'index']);
Route::get('tv_screens/{id}', [TvScreenController::class, 'show']);
Route::post('tv_screens', [TvScreenController::class, 'store']);
Route::put('tv_screens/{id}', [TvScreenController::class, 'update']);
Route::put('tv_screens', [TvScreenController::class, 'updateAll']);
Route::delete('tv_screens/{id}', [TvScreenController::class, 'destroy']);



use App\Http\Controllers\OtpController;

Route::post('/send-otp', [OtpController::class, 'sendOtp']);
Route::post('/verify-otp', [OtpController::class, 'verifyOtp']);
Route::post('/send-link', [OtpController::class, 'sendLink']);
Route::post('/manager-link', [OtpController::class, 'sendManagerLink']);
Route::post('/send-link2', [OtpController::class, 'sendLink2']);
Route::post('/send-link3', [OtpController::class, 'sendLink3']);
Route::post('/sendloginMessage', [OtpController::class, 'sendLoginMessage']);
Route::post('/sendPassReset', [OtpController::class, 'sendResetLink']);



use App\Http\Controllers\DepartmentHeadController;

Route::get('department-heads', [DepartmentHeadController::class, 'index']); 
Route::get('department-heads/{id}', [DepartmentHeadController::class, 'show']); 
Route::post('department-heads', [DepartmentHeadController::class, 'store']); 
Route::put('department-heads/{id}', [DepartmentHeadController::class, 'update']); 
Route::delete('department-heads/{id}', [DepartmentHeadController::class, 'destroy']); 


use App\Http\Controllers\JuniorDepartmentHeadController;

Route::get('junior-department-heads', [JuniorDepartmentHeadController::class, 'index']);
Route::post('junior-department-heads', [JuniorDepartmentHeadController::class, 'store']);
Route::get('junior-department-heads/{id}', [JuniorDepartmentHeadController::class, 'show']);
Route::put('junior-department-heads/{id}', [JuniorDepartmentHeadController::class, 'update']);
Route::delete('junior-department-heads/{id}', [JuniorDepartmentHeadController::class, 'destroy']);



use App\Http\Controllers\SeniorOpsManagerController;

Route::get('/senior-ops-managers', [SeniorOpsManagerController::class, 'getAll']);
Route::get('/senior-ops-managers/{id}', [SeniorOpsManagerController::class, 'getById']);
Route::post('/senior-ops-managers', [SeniorOpsManagerController::class, 'store']);
// Route::put('/senior-ops-managers/{id}', [SeniorOpsManagerController::class, 'updateAll']);
Route::put('/senior-ops-managers/{id}', [SeniorOpsManagerController::class, 'updateById']);
Route::delete('/senior-ops-managers/{id}', [SeniorOpsManagerController::class, 'delete']);


use App\Http\Controllers\HeadOfSalesController;

Route::post('/head_of_sales', [HeadOfSalesController::class, 'store']);
Route::get('/head_of_sales', [HeadOfSalesController::class, 'index']);
Route::get('/head_of_sales/{id}', [HeadOfSalesController::class, 'show']);
Route::put('/head_of_sales/{id}', [HeadOfSalesController::class, 'update']);
Route::delete('/head_of_sales/{id}', [HeadOfSalesController::class, 'destroy']);


use App\Http\Controllers\ManagerDetailController;

Route::prefix('manager_details')->group(function () {
    Route::get('/', [ManagerDetailController::class, 'index']);               // GET /api/manager_details
    Route::post('/', [ManagerDetailController::class, 'store']);              // POST /api/manager_details
    Route::get('/{id}', [ManagerDetailController::class, 'show']);            // GET /api/manager_details/{id}
    Route::put('/{id}', [ManagerDetailController::class, 'update']);          // PUT /api/manager_details/{id}
    Route::delete('/{id}', [ManagerDetailController::class, 'destroy']);      // DELETE /api/manager_details/{id}
});


use App\Http\Controllers\AdminPortalDataController;

Route::post('/admin_portal_login', [AdminPortalDataController::class, 'store']);    
Route::get('/admin_portal_login', [AdminPortalDataController::class, 'index']);   
Route::get('/admin_portal_login/email/{admin_email}', [AdminPortalDataController::class, 'showByEmail']);
Route::get('/admin_portal_login/{id}', [AdminPortalDataController::class, 'show']);   
Route::put('/admin_portal_login/{id}', [AdminPortalDataController::class, 'update']); 
Route::delete('/admin_portal_login/{id}', [AdminPortalDataController::class, 'destroy']);







/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
   return $request->user();
    
});


// g20493
// $2y$10$9wO4XozA3VgOWXhvqYVf8uHL6ZXMcuM4JSWN6xAzWQIk1z1yfxWYy
// 694913