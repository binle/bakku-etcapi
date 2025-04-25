## Auto generate schema from class which already define schema for it's properties

`@DataProperty(option: IDataPropertyInjectedParams)` - property is required
`@DataPropertyOptional(option: IDataPropertyInjectedParams)` - property which is optional (can be undefined or null)

`@DataEnumProperty(option: IEnumPropertyInjectedParams)` - property is enum and required
`@DataEnumPropertyOptional(option: IEnumPropertyInjectedParams)` - property is enum and required and it can be optional

`@DataArrayProperty(option: IArrayPropertyInjectedParams)` - property is array and required
`@DataArrayPropertyOptional(option: IArrayPropertyInjectedParams)`- property is array and required and it can be

`@DataFileProperty(option: IFilePropertyInjectedParams)`- property is file and required
`@DataFilePropertyOptional(option: IFilePropertyInjectedParams)`- property is file and required and it can be

EX:

```
class Profile {
  @DataProperty()
  fullname: string;

  @DataProperty()
  birday: Date;

  @DataProperty()
  phone: string;

  @DataEnumProperty({enumData: getEnumData(GenerEnum)})
  gender: GenderEnum;
}

class SaveUserRequestBody {
  @DataProperty()
  name: string;
  @DataProperty()
  email: string;
  @DataPropertyOptional()
  description?: string;


  @DataPropertyOptional({propertyType: Profile})
  profile?: Profile;

  @DataArrayPropertyOptional({itemSchema: {propertyType: SaveUserRequestBody}})
  relatedUsers?: SaveUserRequestBody[];
}
```
