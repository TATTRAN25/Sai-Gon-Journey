<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Đăng ký bất kỳ dịch vụ ứng dụng nào.
     */
    public function register(): void
    {
        //
    }

    /**
     * Cấu hình giới hạn tốc độ cho ứng dụng.
     */
    protected function configureRateLimiting(): void
    {
        // Định nghĩa logic giới hạn tốc độ của bạn ở đây
    }

    /**
     * Khởi động bất kỳ dịch vụ ứng dụng nào.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();
    
        // Đăng ký routes API với middleware "api"
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));
    
        // Đăng ký routes web
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}