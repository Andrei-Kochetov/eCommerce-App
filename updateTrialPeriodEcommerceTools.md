*** Instructions for updating the trial period in Commerce Tools

- создать новый аккаунт в комерс тулс на новую почту.
- создать ApiClient по предварительному шаблону mobile and spa client и дополнительно добавить manage_customers , view_project_settings, в итоге будет общий скоуп : manage_my_shopping_lists:ecommerce-app-pet-project view_published_products:ecommerce-app-pet-project manage_my_orders:ecommerce-app-pet-project create_anonymous_token:ecommerce-app-pet-project manage_my_profile:ecommerce-app-pet-project view_categories:ecommerce-app-pet-project manage_my_payments:ecommerce-app-pet-project manage_customers:ecommerce-app-pet-project manage_my_quote_requests:ecommerce-app-pet-project manage_my_quotes:ecommerce-app-pet-project view_project_settings:ecommerce-app-pet-project manage_my_business_units:ecommerce-app-pet-project

- Заменить данные api client старого  аккаунта (scopes, clientid,secretid, host - обрати внимание, что host где-то начинается с 'auth' а где то с 'api') на новые в 3 файлах: constants.ts в папке LoginClientApi, в папке registration в файлах constants.ts и registration.ts
- Логин и регистрация уже готовы.
- создать категории(достаточно полей имя (должно быть одним словом без пробелов) и order category)
- создать один product type електроник для всех продуктов(в поле атрибутов указывать только первый атрибут поиска, название атриута с маленкоф буквы color brand)
- создать один дискаунт для проуктов со скидкой и в нем указать к каким продуктам применяется (если выполнены все условия пункт)
- создать discount card и применить к нему созданный discount code
- создать продукты(ссылка в корзине на отдельную страницу продукта указывается полностью но не через / а через _)