import cpuid

#cpus = cpuid.get.cpuid()
a = cpuid._intel(family, model)
print(a)
# for cpu in cpus:
#     print(f"CPU {cpu['number']}: {cpu['brand']} (família: {cpu['family']}, modelo: {cpu['model']})")
#     print(f"  Recursos: {', '.join(cpu['flags'])}")

#https://www.techpowerup.com/cpu-specs/

# create table processadores (
# id int not null primary key auto_increment,
# name varchar(100),
# codename varchar(100),
# cores varchar(100),
# clock varchar(100),
# socket varchar(100),
# process varchar(100),
# l3 varchar(100),
# tdp varchar(100),
# released varchar(100));