import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

type Tab = "Главная" | "Яхты" | "Брони" | "Сервис" | "Финансы";

interface Yacht {
  id: string;
  name: string;
  type: string;
  status: string;
  color: string;
}

interface Booking {
  id: string;
  yacht: string;
  guest: string;
  date: string;
  status: string;
}

interface Task {
  id: string;
  title: string;
  yacht: string;
  date: string;
  priority: string;
}

const tabs: Tab[] = ["Главная", "Яхты", "Брони", "Сервис", "Финансы"];

const initialYachts: Yacht[] = [
  { id: "1", name: "Blue Horizon", type: "Моторная яхта · 18 м", status: "На стоянке", color: "#DDF3EF" },
  { id: "2", name: "Sea Breeze", type: "Парусная яхта · 14 м", status: "В аренде", color: "#E5ECFA" },
  { id: "3", name: "Marina Star", type: "Моторная яхта · 22 м", status: "Обслуживание", color: "#FFF0D9" },
];

const bookings: Booking[] = [
  { id: "b1", yacht: "Sea Breeze", guest: "Александр Петров", date: "Сегодня · 10:00–18:00", status: "Подтверждена" },
  { id: "b2", yacht: "Blue Horizon", guest: "Мария Иванова", date: "12 ноября · 09:00–17:00", status: "Ожидает оплаты" },
  { id: "b3", yacht: "Marina Star", guest: "Дмитрий Волков", date: "15 ноября · 11:00–19:00", status: "Подтверждена" },
];

const tasks: Task[] = [
  { id: "t1", title: "Проверка двигателя", yacht: "Marina Star", date: "Сегодня", priority: "Высокий приоритет" },
  { id: "t2", title: "Обновить страховку", yacht: "Blue Horizon", date: "Через 3 дня", priority: "Запланировано" },
  { id: "t3", title: "Проверка спасательных жилетов", yacht: "Sea Breeze", date: "20 ноября", priority: "Запланировано" },
];

function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function StatusBadge({ children }: { children: string }) {
  const isGreen = children === "Подтверждена" || children === "На стоянке";
  return (
    <View style={[styles.badge, isGreen ? styles.badgeGreen : styles.badgeAmber]}>
      <Text style={[styles.badgeText, isGreen ? styles.textGreen : styles.textAmber]}>
        {children}
      </Text>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Главная");
  const [yachtList, setYachtList] = useState<Yacht[]>(initialYachts);

  const addYacht = () => {
    const newYacht: Yacht = {
      id: Date.now().toString(),
      name: `Новая яхта ${yachtList.length + 1}`,
      type: "Моторная яхта · не указано",
      status: "На стоянке",
      color: "#DDF3EF",
    };
    setYachtList((current) => [...current, newYacht]);
    Alert.alert("Готово", "Демонстрационная яхта добавлена во флот.");
  };

  const renderDashboard = () => (
    <>
      <View style={styles.welcome}>
        <Text style={styles.eyebrow}>ПОНЕДЕЛЬНИК, 9 НОЯБРЯ</Text>
        <Text style={styles.heading}>Добро пожаловать</Text>
        <Text style={styles.subheading}>Вот что происходит с вашим флотом.</Text>
      </View>

      <View style={styles.statsGrid}>
        <Card style={styles.statsGridCard}>
          <Text style={styles.statNumber}>{yachtList.length}</Text>
          <Text style={styles.statLabel}>Яхты во флоте</Text>
        </Card>
        <Card style={styles.statsGridCard}>
          <Text style={styles.statNumber}>08</Text>
          <Text style={styles.statLabel}>Брони в этом месяце</Text>
        </Card>
        <Card style={styles.statsGridCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Задачи обслуживания</Text>
        </Card>
        <Card style={styles.statsGridCard}>
          <Text style={styles.statNumber}>₽ 420k</Text>
          <Text style={styles.statLabel}>Доход за месяц</Text>
        </Card>
      </View>

      <SectionTitle>Ближайшие бронирования</SectionTitle>
      {bookings.slice(0, 2).map((booking) => (
        <Card key={booking.id}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>{booking.yacht}</Text>
            <StatusBadge>{booking.status}</StatusBadge>
          </View>
          <Text style={styles.bodyText}>{booking.guest}</Text>
          <Text style={styles.mutedText}>{booking.date}</Text>
        </Card>
      ))}

      <SectionTitle>Требуют внимания</SectionTitle>
      <Card>
        <Text style={styles.cardTitle}>Проверка двигателя</Text>
        <Text style={styles.bodyText}>Marina Star · сегодня</Text>
        <Text style={styles.alertText}>Высокий приоритет</Text>
      </Card>
    </>
  );

  const renderFleet = () => (
    <>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.heading}>Мой флот</Text>
          <Text style={styles.subheading}>{yachtList.length} яхты</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addYacht}>
          <Text style={styles.addButtonText}>＋ Добавить</Text>
        </TouchableOpacity>
      </View>
      {yachtList.map((yacht) => (
        <Card key={yacht.id}>
          <View style={[styles.yachtArt, { backgroundColor: yacht.color }]}>
            <Text style={styles.boatEmoji}>⛵</Text>
          </View>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.cardTitle}>{yacht.name}</Text>
              <Text style={styles.mutedText}>{yacht.type}</Text>
            </View>
            <StatusBadge>{yacht.status}</StatusBadge>
          </View>
        </Card>
      ))}
    </>
  );

  const renderBookings = () => (
    <>
      <Text style={styles.heading}>Бронирования</Text>
      <Text style={styles.subheading}>Предстоящие выходы и аренда</Text>
      <Card>
        <Text style={styles.cardTitle}>Ноябрь 2026</Text>
        <View style={styles.calendarRow}>
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <Text key={day} style={styles.calendarHeaderCell}>{day}</Text>
          ))}
        </View>
        <View style={styles.calendarRow}>
          {[9, 10, 11, 12, 13, 14, 15].map((day) => (
            <Text key={day} style={styles.calendarDayCell}>{day}</Text>
          ))}
        </View>
      </Card>
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>{booking.yacht}</Text>
            <StatusBadge>{booking.status}</StatusBadge>
          </View>
          <Text style={styles.bodyText}>{booking.guest}</Text>
          <Text style={styles.mutedText}>{booking.date}</Text>
        </Card>
      ))}
    </>
  );

  const renderMaintenance = () => (
    <>
      <Text style={styles.heading}>Обслуживание</Text>
      <Text style={styles.subheading}>Задачи, проверки и документы</Text>
      {tasks.map((task) => (
        <Card key={task.id}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>{task.title}</Text>
            <Text style={task.priority === "Высокий приоритет" ? styles.alertText : styles.taskTag}>
              {task.priority}
            </Text>
          </View>
          <Text style={styles.bodyText}>{task.yacht}</Text>
          <Text style={styles.mutedText}>{task.date}</Text>
        </Card>
      ))}
    </>
  );

  const renderFinance = () => (
    <>
      <Text style={styles.heading}>Финансы</Text>
      <Text style={styles.subheading}>Сводка по флоту · ноябрь</Text>
      <Card>
        <Text style={styles.mutedText}>ДОХОД</Text>
        <Text style={styles.financeNumber}>₽ 420 000</Text>
        <Text style={styles.positiveText}>↑ 12% к прошлому месяцу</Text>
      </Card>
      <Card>
        <Text style={styles.mutedText}>РАСХОДЫ</Text>
        <Text style={styles.financeNumber}>₽ 186 500</Text>
        <Text style={styles.bodyText}>Обслуживание · топливо · экипаж</Text>
      </Card>
      <Card>
        <Text style={styles.mutedText}>ПРИБЫЛЬ</Text>
        <Text style={styles.financeNumber}>₽ 233 500</Text>
        <Text style={styles.bodyText}>По всем яхтам за текущий месяц</Text>
      </Card>
    </>
  );

  const screens: Record<Tab, () => React.ReactNode> = {
    Главная: renderDashboard,
    Яхты: renderFleet,
    Брони: renderBookings,
    Сервис: renderMaintenance,
    Финансы: renderFinance,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar}>
        <View style={styles.logoMark}><Text style={styles.logoText}>Я</Text></View>
        <Text style={styles.brand}>ЯХТ-МЕНЕДЖЕР</Text>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => Alert.alert("Профиль", "Раздел профиля можно подключить следующим этапом.")}
        >
          <Text style={styles.avatarText}>А</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {screens[activeTab]()}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
            accessibilityRole="button"
            accessibilityState={{ selected: activeTab === tab }}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F7FA" },
  topBar: {
    height: 58, paddingHorizontal: 20, flexDirection: "row",
    alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#E8EDF2",
  },
  logoMark: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: "#123C4A",
    alignItems: "center", justifyContent: "center",
  },
  logoText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  brand: { marginLeft: 9, color: "#173B49", fontSize: 12, fontWeight: "800", letterSpacing: 1.2 },
  avatar: {
    marginLeft: "auto", width: 34, height: 34, borderRadius: 17,
    backgroundColor: "#DDE9EC", alignItems: "center", justifyContent: "center",
  },
  avatarText: { color: "#173B49", fontWeight: "700" },
  content: { padding: 20, paddingBottom: 32 },
  welcome: { marginBottom: 18 },
  eyebrow: { color: "#82919A", fontSize: 10, fontWeight: "700", letterSpacing: 1.1 },
  heading: { color: "#173B49", fontSize: 26, fontWeight: "800", marginTop: 6 },
  subheading: { color: "#7A8992", fontSize: 14, marginTop: 5, marginBottom: 16 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: "#EDF0F3",
  },
  statsGridCard: { width: "48%" },
  statNumber: { color: "#173B49", fontSize: 22, fontWeight: "800" },
  statLabel: { color: "#7A8992", fontSize: 12, marginTop: 5 },
  sectionTitle: { color: "#173B49", fontSize: 17, fontWeight: "700", marginTop: 12, marginBottom: 10 },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { color: "#173B49", fontSize: 15, fontWeight: "700" },
  bodyText: { color: "#596A73", fontSize: 13, marginTop: 7 },
  mutedText: { color: "#8B989F", fontSize: 12, marginTop: 6 },
  badge: { borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5 },
  badgeGreen: { backgroundColor: "#E4F4EF" },
  badgeAmber: { backgroundColor: "#FFF1D8" },
  badgeText: { fontSize: 10, fontWeight: "700" },
  textGreen: { color: "#28765F" },
  textAmber: { color: "#9B6A16" },
  alertText: { color: "#C4772D", fontSize: 11, fontWeight: "700", marginTop: 8 },
  taskTag: { color: "#68808A", fontSize: 10, fontWeight: "600" },
  addButton: { backgroundColor: "#123C4A", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  addButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  yachtArt: {
    height: 100, borderRadius: 12, marginBottom: 14,
    alignItems: "center", justifyContent: "center",
  },
  boatEmoji: { fontSize: 42 },
  calendarRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  calendarHeaderCell: { color: "#8B989F", fontSize: 12, textAlign: "center", flex: 1 },
  calendarDayCell: { color: "#28765F", fontWeight: "700", fontSize: 13, textAlign: "center", flex: 1 },
  financeNumber: { color: "#173B49", fontSize: 27, fontWeight: "800", marginTop: 8 },
  positiveText: { color: "#28765F", fontSize: 12, marginTop: 6 },
  tabBar: {
    minHeight: 62, paddingHorizontal: 4, paddingTop: 9, paddingBottom: 5,
    flexDirection: "row", backgroundColor: "#FFFFFF",
    borderTopWidth: 1, borderTopColor: "#E8EDF2",
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabLabel: { color: "#8B989F", fontSize: 10, fontWeight: "600" },
  activeTabLabel: { color: "#123C4A", fontWeight: "800" },
  activeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#2D9B7A", marginTop: 4 },
});