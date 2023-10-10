*** Instructions for updating the trial period in Commerce Tools

- создать новый аккаунт в комерс тулс на новую почту.
- создать ApiClient по предварительному шаблону mobile and spa client и дополнительно добавить manage_customers , view_project_settings, в итоге будет общий скоуп : manage_my_shopping_lists:ecommerce-app-pet-project view_published_products:ecommerce-app-pet-project manage_my_orders:ecommerce-app-pet-project create_anonymous_token:ecommerce-app-pet-project manage_my_profile:ecommerce-app-pet-project view_categories:ecommerce-app-pet-project manage_my_payments:ecommerce-app-pet-project manage_customers:ecommerce-app-pet-project manage_my_quote_requests:ecommerce-app-pet-project manage_my_quotes:ecommerce-app-pet-project view_project_settings:ecommerce-app-pet-project manage_my_business_units:ecommerce-app-pet-project

- Заменить данные api client старого  аккаунта (scopes, clientid,secretid, host - обрати внимание, что host где-то начинается с 'auth' а где то с 'api') на новые в 3 файлах: constants.ts в папке LoginClientApi, в папке registration в файлах constants.ts и registration.ts
- Логин и регистрация уже готовы.
- создать категории(достаточно полей имя (должно быть одним словом без пробелов) и order category)
- создать один product type електроник для всех продуктов(в поле атрибутов указывать только первый атрибут поиска, название атриута с маленкоф буквы color brand)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/21e3b232-7537-494e-8d1c-379f59587425)
![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/16208094-b38d-4458-9529-9c121f66d585)
![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/d62b30f6-a793-4c51-ae91-936863e376a3)
![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/5593bb18-8f7a-46b0-abc0-7e8240f99711)
![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/730a6b50-3f66-41a7-bb95-17f21915fce4)


- создать один дискаунт для продуктов со скидкой и в нем указать к каким продуктам применяется (если выполнено любое из условий вариант "или")
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/990b3047-4e7d-4c06-bbd4-20355eed663d)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/bb31ef38-788f-41fb-b94f-e927eb14cffa)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/ea1be542-8bba-41e2-9f28-9e7f1a4eeff2)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/e13dda30-6597-476e-9d20-4e5b74a76bc0)





- создать discount cart 
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/547164d8-4ef2-4aa4-a7a9-9e99ed298ae6)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/fd43cbf2-cd49-4041-a9e3-fbc866b3374e)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/fdc25e29-8118-47ab-9369-1ed3f3298536)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/0ced97ed-93da-4a81-ab95-504317c66f9a)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/b3705c25-df5c-4f20-b5ea-af1b1d6ae873)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/bef5a8c9-5a7b-474a-a019-82c4d7dbb64a)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/d36a27dc-efe8-4e0d-ac88-d2891c37d7fd)



  
- применить discount code к discount cart 
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/4c29de0a-2f1d-4eca-8143-92b80486d570)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/de0f8d8a-b4ef-4ee2-8f85-90abfa495b49)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/2070c207-d705-4a6f-bfec-3a932a2ab30b)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/251f5dd4-328c-4fdc-a6d1-110595a5c806)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/f8e151dc-ad9b-428a-8657-261a37e8626b)




- создать продукты(ссылка в корзине на отдельную страницу продукта указывается полностью но не через / а через _ , создать один ваиант продукта, картинки указывал через юрл)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/34b86e7b-6159-4c04-812f-4a7609586661)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/09e05f0b-5dee-4141-9bcb-3a948eacc655)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/a45e6f19-c251-45e1-a744-563620330d64)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/2620078a-eb43-42eb-a380-0ed187bb299d)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/c40840fd-0081-4007-a58c-dc3f31554712)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/b1b871b4-69d9-4309-b3b3-d6682c520b75)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/4d1c1aca-6b45-49b7-993c-82a5c43baf2c)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/614068f9-9e83-46ac-b594-eaf572e95216)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/f1eb0a57-225d-415b-b6e1-9e634c1161bf)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/e660397c-5835-493a-bdd4-e3eecdbcd797)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/a686e9b3-93be-483b-b2b9-b3e251ec93ca)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/d086bf66-8142-4603-9a94-99f42f8d7889)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/0f008135-0846-41a6-9f73-3b09b81d1a6d)
  ![image](https://github.com/Andrei-Kochetov/eCommerce-App/assets/118794264/06bf6b6e-ef2c-4b29-944a-bdf82f766650)

