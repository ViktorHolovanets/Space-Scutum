
composer install

php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"

php artisan jwt:secret

php artisan migrate

php artisan db:seed

php artisan serve --host=0.0.0.0
